import { BaseObjectModel } from '@scaleo/core/data';

import { SelectThemeEnum } from '../enums/select.enum';

const themeParentNodeClass = 'ng-select-theme';

export const selectThemeClassName: BaseObjectModel = Object.freeze({
    [SelectThemeEnum.InlineBottomLine]: `${themeParentNodeClass}--inline-bottom-line`
});
