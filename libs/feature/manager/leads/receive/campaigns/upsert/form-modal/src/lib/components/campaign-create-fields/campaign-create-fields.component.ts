import { Component, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, pluck, share } from 'rxjs/operators';

import { CampaignFieldTypeEnum } from '@scaleo/feature/manager/leads/receive/common';
import { PlatformListsFormatModel, PlatformListsService } from '@scaleo/platform/list/access-data';

interface CampaignCreateFieldsGroupsModel {
    title: string;
    type: CampaignFieldTypeEnum;
}

@Component({
    selector: 'app-campaign-create-fields',
    templateUrl: './campaign-create-fields.component.html',
    viewProviders: [
        {
            provide: ControlContainer,
            useFactory: (container: ControlContainer) => container,
            deps: [[new SkipSelf(), ControlContainer]]
        }
    ]
})
export class CampaignCreateFieldsComponent {
    public readonly groups: CampaignCreateFieldsGroupsModel[] = [
        {
            title: 'leads_ui_page.receive.campaigns.fields.title.required_fields',
            type: CampaignFieldTypeEnum.Required
        },
        {
            title: 'leads_ui_page.receive.campaigns.fields.title.optional_fields',
            type: CampaignFieldTypeEnum.Optional
        }
    ];

    public readonly leadsReceiveFields$: Observable<PlatformListsFormatModel[]> = this.platformListsService
        .platformListsNew('leads_receive_fields')
        .pipe(
            pluck('leads_receive_fields'),
            map((fields: PlatformListsFormatModel[]) =>
                fields.map((field) => ({
                    ...field,
                    title: field.id as string
                }))
            ),
            share()
        );

    constructor(private platformListsService: PlatformListsService) {}
}
