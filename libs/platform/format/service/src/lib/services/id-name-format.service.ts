import { Injectable } from '@angular/core';

import { BaseFormat } from '../formats/base-format';
import { IdNameFormat } from '../formats/id-name-format';

@Injectable({
    providedIn: 'root'
})
export class IdNameFormatService extends BaseFormat<string> {
    format(value: string, id: number): string {
        const idNameFormat = new IdNameFormat(value, id);
        return idNameFormat.format();
    }
}
