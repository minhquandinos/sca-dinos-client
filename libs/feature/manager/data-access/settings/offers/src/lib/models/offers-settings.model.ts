import { PlatformSettingsModel } from '@scaleo/platform/settings/access-data';

export type OffersSettingsModel = Pick<PlatformSettingsModel, 'approval_questions_for_affiliate' | 'ask_approval_questions_by_default'>;
