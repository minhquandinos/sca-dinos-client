import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

import { DayPresetsType } from '@scaleo/shared/components';

export interface DetailWidgetWrapperInterface {
    updateDate: (rangeFrom: string, rangeTo: string, selectedRange: DayPresetsType) => void;
    footerTemplate$: Observable<TemplateRef<any>>;
}
