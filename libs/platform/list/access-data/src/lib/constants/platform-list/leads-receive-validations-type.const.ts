import { CampaignFieldValidationTypeEnum, LeadsReceiveValidationsTypeTranslateEnum } from '../../enums/platform-list';

export const LEADS_RECEIVE_VALIDATIONS_TYPE_TRANSLATE_MAP = Object.freeze({
    [CampaignFieldValidationTypeEnum.Format]: LeadsReceiveValidationsTypeTranslateEnum.Format,
    [CampaignFieldValidationTypeEnum.Duplicate]: LeadsReceiveValidationsTypeTranslateEnum.Duplicate,
    [CampaignFieldValidationTypeEnum.DuplicateAll]: LeadsReceiveValidationsTypeTranslateEnum.DuplicateAll,
    [CampaignFieldValidationTypeEnum.RegExp]: LeadsReceiveValidationsTypeTranslateEnum.RegExp
});
