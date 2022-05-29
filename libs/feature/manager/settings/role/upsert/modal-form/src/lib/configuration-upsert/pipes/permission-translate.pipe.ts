import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Pipe({
    name: 'permissionTranslate'
})
export class PermissionTranslatePipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(key: string): Observable<string> {
        const translate = `settings.roles_permissions.permissions.${key}`;
        return this.translate.stream(translate);
    }
}
