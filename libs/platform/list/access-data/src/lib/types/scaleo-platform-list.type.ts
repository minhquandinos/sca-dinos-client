import { ScaleoStatusEnum } from '../enums/statusses/scaleo-status.enum';
import { PlatformListModel } from '../models/platform-list.model';

export type ScaleoPlatformListType = Omit<PlatformListModel, keyof Record<ScaleoStatusEnum, string>>;
