import { ApiErrorModel } from '@scaleo/core/rest-api/service';

export interface ResolveErrorModel extends Pick<ApiErrorModel, 'code'> {
    error: Error;
}
