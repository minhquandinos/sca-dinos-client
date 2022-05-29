import { Provider } from '@angular/core';

import { ShortcutWidgetApi } from './shortcut-widget.api';
import { ShortcutWidgetService } from './shortcut-widget.service';

export const SHORTCUT_WIDGET_PROVIDER: Provider[] = [ShortcutWidgetApi, ShortcutWidgetService];
