import { Pipe, PipeTransform } from '@angular/core';

import { ShortManagerModel } from '@scaleo/shared/data-access/short-entity-list';

@Pipe({
    name: 'managerListTooltip'
})
export class ManagerListTooltipPipe implements PipeTransform {
    transform(managers: ShortManagerModel[]): string {
        return managers.map((manager) => `${manager.firstname} ${manager.lastname}`).join(', ');
    }
}
