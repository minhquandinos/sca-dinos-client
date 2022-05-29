import { ConfigFormatMoneyModel, ConfigFormatNumberModel } from './format.model';
import { ConfigFormatDateType } from './format-date-config.type';

export type ConfigFormatType = ConfigFormatDateType | ConfigFormatNumberModel | ConfigFormatMoneyModel;
