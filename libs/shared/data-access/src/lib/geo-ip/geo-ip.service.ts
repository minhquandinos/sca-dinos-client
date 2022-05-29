import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, ApiResponseWithPagination, ResponseUtil } from '@scaleo/core/rest-api/service';
import { EnvService } from '@scaleo/core/services/env';
import { PathFileService } from '@scaleo/shared/services/path-file';

import { GeoIpModel, GeoIpParamsModel } from './geo.ip.model';

@Injectable({ providedIn: 'root' })
export class GeoIpService {
    private url = `${this.env.serverUrl}/geoip`;

    constructor(
        private http: HttpClient,
        private pathFileService: PathFileService,
        private translate: TranslateService,
        private env: EnvService
    ) {}

    public getCountries(queryParams: GeoIpParamsModel): Observable<ApiResponseWithPagination<GeoIpModel[]>> {
        let params = new HttpParams();
        if (queryParams) {
            params = !queryParams['search'] ? params : params.append('search', queryParams['search']);
            params = params.append('lang', this.translate.currentLang);
            params = !queryParams['perPage'] ? params : params.append('perPage', String(queryParams['perPage']));
            params = !queryParams['page'] ? params : params.append('page', String(queryParams['page']));
            params = !queryParams['country'] ? params : params.append('country', queryParams['country']);
        }

        return this.http
            .get<ApiResponse<GeoIpModel[]>>(`${this.url}/default/get-countries`, {
                params,
                observe: 'response'
            })
            .pipe(
                map((countries) => {
                    const newCountry: GeoIpModel[] = (countries.body.info.countries as GeoIpModel[]).map((country) => ({
                        ...country,
                        id: +country.id,
                        image: this.pathFileService.countryIcon(country.country_code.toLowerCase())
                    }));

                    return ResponseUtil.pagination<GeoIpModel>(countries.headers, newCountry);
                })
            );
    }

    public getRegions(queryParams: GeoIpParamsModel): Observable<GeoIpModel[]> {
        let params = new HttpParams();
        if (queryParams) {
            params = !queryParams['search'] ? params : params.append('search', queryParams['search']);
            params = params.append('lang', this.translate.currentLang);
            params = !queryParams['perPage'] ? params : params.append('perPage', String(queryParams['perPage']));
            params = !queryParams['country'] ? params : params.append('country', queryParams['country']);
        }

        return this.http.get<ApiResponse<GeoIpModel[]>>(`${this.url}/default/get-regions`, { params }).pipe(pluck('info', 'regions'));
    }

    public getCities(queryParams: GeoIpParamsModel): Observable<GeoIpModel[]> {
        let params = new HttpParams();
        if (params) {
            params = !queryParams['search'] ? params : params.append('search', queryParams['search']);
            params = !queryParams['lang'] ? params : params.append('lang', queryParams['lang']);
            params = !queryParams['perPage'] ? params : params.append('perPage', String(queryParams['perPage']));
            params = !queryParams['country'] ? params : params.append('country', queryParams['country']);
            params = !queryParams['region'] ? params : params.append('region', queryParams['region']);
        }

        return this.http.get<ApiResponse<GeoIpModel[]>>(`${this.url}/default/get-cities`, { params }).pipe(pluck('info', 'cities'));
    }

    public getGeoInfo(queryParams: GeoIpParamsModel): Observable<GeoIpModel> {
        let params = new HttpParams();
        if (params) {
            params = !queryParams['lang'] ? params : params.append('lang', queryParams['lang']);
            params = !queryParams['geoname_id'] ? params : params.append('geoname_id', String(queryParams['geoname_id']));
        }
        if (queryParams['geoname_id'] === null) {
            params = params.append('geoname_id', null);
        }
        return this.http.get<ApiResponse<GeoIpModel>>(`${this.url}/default/get-info-by-geoname-id`, { params }).pipe(
            map((response) => {
                const copyGeo = { ...response['info']['GeoName'] };

                if (copyGeo.country_code) {
                    copyGeo.image = this.pathFileService.countryIcon(copyGeo.country_code.toLowerCase());
                }

                return copyGeo;
            })
        );
    }

    public getGeoNames(search?: string): Observable<GeoIpModel[]> {
        let params = new HttpParams();
        params = params.append('lang', this.translate.currentLang);
        params = !search ? params : params.append('search', search);

        return this.http.get<ApiResponse<GeoIpModel[]>>(`${this.url}/default/get-geonames`, { params }).pipe(
            pluck('info', 'GeoNames'),
            map((response: GeoIpModel[]) =>
                response.map((geo) => ({
                    ...geo,
                    id: +geo.id
                }))
            )
        );
    }
}
