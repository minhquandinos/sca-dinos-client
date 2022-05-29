import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { EnvService } from '@scaleo/core/services/env';

import { CustomFieldsRoleType, FieldsInterface } from './custom.fields.interface';

@Injectable({
    providedIn: 'root'
})
export class CustomFieldsApi {
    private url = `${this.env.serverUrl}`;

    constructor(private readonly http: HttpClient, private readonly env: EnvService) {}

    fields(role: CustomFieldsRoleType): Observable<FieldsInterface> {
        return this.http.post<any>(`${this.url}/signup-fields/${role}`, null).pipe(pluck('info'));
    }
}
