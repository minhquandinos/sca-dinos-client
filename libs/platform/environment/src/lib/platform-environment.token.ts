import { InjectionToken } from '@angular/core';

import { PlatformEnvironmentModel } from './platform-environment.model';

export const PLATFORM_ENVIRONMENT_TOKEN = new InjectionToken<PlatformEnvironmentModel>('PlatformEnvironmentToken');
