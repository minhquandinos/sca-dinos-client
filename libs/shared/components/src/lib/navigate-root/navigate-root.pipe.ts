import { Pipe, PipeTransform } from '@angular/core';

import { NavigateRootService } from './navigate-root.service';

@Pipe({
    name: 'navigateRoot'
})
export class NavigateRootPipe implements PipeTransform {
    constructor(private navigateRootService: NavigateRootService) {}

    transform(value: string, absolutePath: boolean = true): string {
        return this.navigateRootService.path(value, absolutePath);
    }
}
