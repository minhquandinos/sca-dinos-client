import { Observable, of } from 'rxjs';

import { ProfileQuery } from '@scaleo/account/data-access';
import { StatisticDefaultRowModel } from '@scaleo/reports/common';

import { ReportLinkFieldModel } from '../model/report-format-field.model';

export class ReportFieldLink {
    constructor(private profile: ProfileQuery) {}

    link(type: string, field: StatisticDefaultRowModel): Observable<ReportLinkFieldModel> {
        return of({
            link: this.url(type, field.id),
            title: field.value as string,
            id: field.id
        });
    }

    private url(type: string, id: number): string {
        switch (type) {
            case 'affiliate':
                return `/${this.profile.slug}/affiliates/${id}`;
            case 'offer':
                return `/${this.profile.slug}/offers/${id}`;
            case 'advertiser':
                return `/${this.profile.slug}/advertisers/${id}`;
            case 'link':
                return `/${this.profile.slug}/offers/${id}`;
            case 'goal':
                return `/${this.profile.slug}/offers/${id}`;
            case 'creative':
                return `/${this.profile.slug}/offers/${id}`;
            default:
                return undefined;
        }
    }
}
