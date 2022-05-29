import { AdjustmentsActionsIdEnum, AdjustmentsActionsTranslateEnum } from '../../enums/platform-list/adjustments-actions.enum';

export const ADJUSTMENTS_ACTIONS_TRANSLATE_MAP = Object.freeze({
    [AdjustmentsActionsIdEnum.ChangeStatus]: AdjustmentsActionsTranslateEnum.ChangeStatus,
    [AdjustmentsActionsIdEnum.InsertConversions]: AdjustmentsActionsTranslateEnum.InsertConversions,
    [AdjustmentsActionsIdEnum.InsertConversionsViaCsv]: AdjustmentsActionsTranslateEnum.InsertConversionsViaCsv,
    [AdjustmentsActionsIdEnum.ChangePayouts]: AdjustmentsActionsTranslateEnum.ChangePayouts
});
