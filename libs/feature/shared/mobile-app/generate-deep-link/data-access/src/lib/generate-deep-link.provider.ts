import { Provider } from '@angular/core';

import { GenerateDeepLinkApi } from './generate-deep-link.api';
import { GenerateDeepLinkService } from './generate-deep-link.service';

export const GENERATE_DEEP_LINK_PROVIDER: Provider[] = [GenerateDeepLinkApi, GenerateDeepLinkService];
