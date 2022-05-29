import { Provider } from '@angular/core';

import { MgcomTopApi } from './api/mgcom-top.api';
import { MgcomTopFacade } from './facade/mgcom-top.facade';
import { MgcomTopState } from './state/mgcom-top.state';

export const MGCOM_WIDGET_TOP_PROVIDER: Provider[] = [MgcomTopApi, MgcomTopFacade, MgcomTopState];
