import { PaymentFrequencyIdEnum, PaymentsFrequenciesNameEnum, PaymentsFrequenciesTranslateEnum } from '../../enums/platform-list';

export const PAYMENTS_FREQUENCIES_TRANSLATE_MAP = Object.freeze({
    [PaymentFrequencyIdEnum.Weekly]: PaymentsFrequenciesTranslateEnum.Weekly,
    [PaymentFrequencyIdEnum.Monthly]: PaymentsFrequenciesTranslateEnum.Monthly,
    [PaymentFrequencyIdEnum.BiMonthly]: PaymentsFrequenciesTranslateEnum.BiMonthly,
    [PaymentFrequencyIdEnum.MonthlyQuarterly]: PaymentsFrequenciesTranslateEnum.MonthlyQuarterly
});

export const PAYMENTS_FREQUENCIES_NAME_TRANSLATE_MAP = Object.freeze({
    [PaymentsFrequenciesNameEnum.Weekly]: PaymentsFrequenciesTranslateEnum.Weekly,
    [PaymentsFrequenciesNameEnum.Monthly]: PaymentsFrequenciesTranslateEnum.Monthly,
    [PaymentsFrequenciesNameEnum.BiMonthly]: PaymentsFrequenciesTranslateEnum.BiMonthly,
    [PaymentsFrequenciesNameEnum.MonthlyQuarterly]: PaymentsFrequenciesTranslateEnum.MonthlyQuarterly
});
