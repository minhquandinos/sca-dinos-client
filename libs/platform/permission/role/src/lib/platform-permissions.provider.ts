import { Provider } from '@angular/core';

import { PLATFORM_PERMISSIONS } from './platform-permission.model';
import { PLATFORM_PERMISSION_TOKEN } from './role-permission.token';

export const PLATFORM_PERMISSIONS_PROVIDER: Provider = {
    provide: PLATFORM_PERMISSION_TOKEN,
    useValue: PLATFORM_PERMISSIONS
};
