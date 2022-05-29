import { Pipe, PipeTransform } from '@angular/core';

import { CampaignFieldValidationTypeEnum } from '@scaleo/platform/list/access-data';

@Pipe({
    name: 'campaignFieldValidationSelectPlatformTranslateKey'
})
export class CampaignFieldValidationSelectPlatformTranslateKeyPipe implements PipeTransform {
    transform(validationType: CampaignFieldValidationTypeEnum): string {
        if (validationType) {
            switch (validationType) {
                case CampaignFieldValidationTypeEnum.Format:
                    return 'leads_ui_page.receive.campaigns.validations.selects.format';
                case CampaignFieldValidationTypeEnum.Duplicate:
                case CampaignFieldValidationTypeEnum.DuplicateAll:
                default:
                    return 'leads_ui_page.receive.campaigns.validations.selects.duplicate';
            }
        }
        return null;
    }
}
