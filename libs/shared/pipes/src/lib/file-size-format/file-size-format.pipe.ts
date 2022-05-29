import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { FileSizeFormat } from '@scaleo/shared/common';

type FileFormatType = 'BT' | 'KB' | 'MB' | 'GB' | 'TB' | 'auto';

@Pipe({
    name: 'fileSizeFormat'
})
export class FileSizeFormatPipe implements PipeTransform {
    constructor(private translate: TranslateService) {}

    transform(bytes: number, returnFormat: FileFormatType = 'auto'): Observable<string> {
        const fileSize = new FileSizeFormat(bytes, returnFormat);
        const { size, sizeFormat } = fileSize;
        return of(sizeFormat).pipe(
            filter((format) => !!format),
            switchMap((format) => this.translate.stream(format)),
            map((translateFormat) => `${size}${translateFormat} `)
        );
    }
}
