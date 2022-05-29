import { Pipe, PipeTransform } from '@angular/core';

import { CampaignFieldValidationTypeEnum } from '@scaleo/platform/list/access-data';

import { FindPlatformListModel } from '../../../../../../../../../../../../../shared/components/find/src/lib/components/find-platform-list/models/find-platform-list.model';

@Pipe({
    name: 'campaignFieldValidationSelectPlatformList'
})
export class CampaignFieldValidationSelectPlatformListPipe implements PipeTransform {
    transform(validationType: CampaignFieldValidationTypeEnum): keyof FindPlatformListModel {
        if (validationType) {
            switch (validationType) {
                case CampaignFieldValidationTypeEnum.Format:
                    return 'leads_receive_validations_type_format';
                case CampaignFieldValidationTypeEnum.Duplicate:
                    return 'leads_receive_validations_type_duplicate_offer';
                case CampaignFieldValidationTypeEnum.DuplicateAll:
                default:
                    return 'leads_receive_validations_type_duplicate_all_offer';
            }
        }
        return null;
    }
}
