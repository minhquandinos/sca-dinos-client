import { HttpParams } from '@angular/common/http';

import { BaseObjectModel } from '@scaleo/core/data';

export class RequestUtil {
    static queryParams(params: BaseObjectModel): HttpParams {
        let httpParams = new HttpParams();

        Object.keys(params).forEach((param) => {
            const value = params[param];
            if (value) {
                httpParams = httpParams.append(param, value);
            }
        });

        return httpParams;
    }

    // TODO complete
    static payloadParams(params: BaseObjectModel): BaseObjectModel {
        return params;
    }

    static prepareFormData<T>(data: T): FormData {
        const formData = new FormData();
        Object.keys(data).forEach((key: string) => {
            if ((data as any)?.[key]) {
                formData.append(key, (data as any)?.[key]);
            }
        });

        return formData as FormData;
    }
}
