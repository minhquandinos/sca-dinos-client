import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface TrendsWidgetModel {
    template: TemplateRef<any>;
    label: Observable<string>;
}
