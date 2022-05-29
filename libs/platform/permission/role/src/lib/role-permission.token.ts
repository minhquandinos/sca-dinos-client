import { InjectionToken } from '@angular/core';

import { PlatformPermissionsType } from './platform-permission.model';

export const PLATFORM_PERMISSION_TOKEN = new InjectionToken<PlatformPermissionsType>('PlatformPermission');
