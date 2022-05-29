import { Pipe, PipeTransform } from '@angular/core';

import { PathFileService, PathType } from '@scaleo/shared/services/path-file';

@Pipe({
    name: 'pathFile'
})
export class PathFilePipe implements PipeTransform {
    constructor(private readonly pathFileService: PathFileService) {}

    transform(value: string, path: PathType | 'country' | 'adjustments'): string {
        if (path === 'country') {
            return this.pathFileService.countryIcon(value);
        }

        if (path === 'adjustments') {
            return this.pathFileService.getLinkToFile(value, path);
        }

        return this.pathFileService.platformImage(value, path);
    }
}
