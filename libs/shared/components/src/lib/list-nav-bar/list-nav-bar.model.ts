import { TemplateRef } from '@angular/core';

import { BaseNavModel } from '@scaleo/shared/data';

export interface ListNavBarModel extends BaseNavModel {
    count: number;
    budges?: {
        enabled: boolean;
        color?: string;
    };
    divider?: boolean;
    tooltip?: {
        icon?: string;
        text?: string | TemplateRef<any>;
        customTemplate?: TemplateRef<any>;
    };
}
