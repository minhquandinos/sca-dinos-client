import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CustomFieldsRoleType, FieldsInterface } from './custom.fields.interface';
import { CustomFieldsApi } from './custom-fields.api';

@Injectable({
    providedIn: 'root'
})
export class FetchCustomFieldsService {
    constructor(private readonly api: CustomFieldsApi) {}

    fields(role: CustomFieldsRoleType): Observable<FieldsInterface> {
        return this.api.fields(role);
    }
}
