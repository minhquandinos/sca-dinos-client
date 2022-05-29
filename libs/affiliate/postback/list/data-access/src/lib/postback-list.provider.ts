import { Provider } from '@angular/core';

import { PostbackListApi } from './postback-list.api';
import { PostbackListService } from './postback-list.service';

export const PostbackListProvider: Provider[] = [PostbackListApi, PostbackListService];
