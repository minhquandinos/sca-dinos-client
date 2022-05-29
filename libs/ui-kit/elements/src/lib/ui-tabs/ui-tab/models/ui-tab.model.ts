import { TemplateRef } from '@angular/core';

import { BaseObjectModel } from '@scaleo/core/data';

export interface UiTabModel extends BaseObjectModel {
    id?: string | number;
    title: string;
    route: string;
    isActive?: boolean;
    tooltip?: string | TemplateRef<any>;
}

export interface UiTabChangeTabEventModel {
    index: number;
    name?: string;
}
