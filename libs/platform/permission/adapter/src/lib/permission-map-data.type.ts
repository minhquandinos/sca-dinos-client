import { BaseObjectModel } from '@scaleo/core/data';

import { PermissionDataModel } from './index';

export type PermissionMapDataType<K = string, V = PermissionDataModel> = Map<K, V>;

export type PermissionsDataType<P> = BaseObjectModel<string, P>;
