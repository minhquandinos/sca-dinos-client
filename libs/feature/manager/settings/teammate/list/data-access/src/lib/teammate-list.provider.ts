import { Provider } from '@angular/core';

import { TeammateListApi } from './api/teammate-list.api';
import { TeammateListQuery } from './state/teammate-list.query';
import { TeammateListService } from './state/teammate-list.service';
import { TeammateListStore } from './state/teammate-list.store';

export const TEAMMATE_LIST_PROVIDER: Provider[] = [TeammateListApi, TeammateListStore, TeammateListService, TeammateListQuery];
