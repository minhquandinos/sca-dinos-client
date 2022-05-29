import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';

import { DefaultRoleEnum } from '@scaleo/platform/role/models';
import { DefaultRoleUtil } from '@scaleo/platform/role/util';

@Pipe({
    name: 'roleDefault'
})
export class RoleDefaultPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(value: DefaultRoleEnum): Observable<string> {
        const isDefault = DefaultRoleUtil.isDefaultManagers(value);
        return isDefault ? this.translate.stream('interface.basic.default') : EMPTY;
    }
}
