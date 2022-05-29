import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { FileExtensionEnum } from '@scaleo/platform/data';

@Pipe({
    name: 'modalExportFileFormatLabel'
})
export class ModalExportFileFormatLabelPipe implements PipeTransform {
    constructor(private readonly translate: TranslateService) {}

    transform(format: FileExtensionEnum): Observable<string> {
        const EXPORT_FILE_FORMATS_TRANSLATE_SCHEMA = 'interface.export_items.file_format';
        const formatTranslateMap = {
            [FileExtensionEnum.XLSX]: `${EXPORT_FILE_FORMATS_TRANSLATE_SCHEMA}.xls`,
            [FileExtensionEnum.CSV]: `${EXPORT_FILE_FORMATS_TRANSLATE_SCHEMA}.csv`
        };
        return this.translate.stream(formatTranslateMap[format]);
    }
}
