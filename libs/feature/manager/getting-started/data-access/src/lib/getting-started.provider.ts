import { Provider } from '@angular/core';

import { GettingStartedApi } from './getting-started.api';
import { GettingStartedService } from './getting-started.service';

export const GETTING_STARTED_PROVIDER: Provider[] = [GettingStartedApi, GettingStartedService];
