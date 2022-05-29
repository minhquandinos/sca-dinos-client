import { Inject, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { BaseObjectModel } from '@scaleo/core/data';
import { ArrayUtil, objectUtil } from '@scaleo/utils';

import { ToastrBarEventEnum } from './toastr-bar.enum';

type ResponseWithInterpolationType =
    | ToastrBarEventEnum.Created
    | ToastrBarEventEnum.Updated
    | ToastrBarEventEnum.Deleted
    | ToastrBarEventEnum.ExceptionCreated
    | ToastrBarEventEnum.ExceptionUpdated
    | ToastrBarEventEnum.ExceptionDeleted
    | ToastrBarEventEnum.NotFound;

type ResponseType =
    | ToastrBarEventEnum.DeletedFile
    | ToastrBarEventEnum.DeletedFileException
    | ToastrBarEventEnum.DownloadFileException
    | ToastrBarEventEnum.UploadFileException
    | ToastrBarEventEnum.UploadFile
    | ToastrBarEventEnum.Custom;

type ToastrType = 'success' | 'error' | 'info';

type ResponseBaseType = ResponseWithInterpolationType | ResponseType;

@Injectable({
    providedIn: 'root'
})
export class ToastrBarService {
    constructor(@Inject(Injector) private injector: Injector, private translate: TranslateService) {}

    private get toastr(): ToastrService {
        return this.injector.get(ToastrService);
    }

    public displayValidationMessages(errors: BaseObjectModel<string, string[]> | string): void {
        if (typeof errors === 'object') {
            const firstError = objectUtil.first(errors);
            const [firstKey] = Object.keys(firstError);
            const error = ArrayUtil.first(firstError[firstKey]);
            if (error) {
                this.showToast(error, 'error');
            }
        }

        if (typeof errors === 'string') {
            this.showToast(errors, 'error');
        }
    }

    successes(message: string): void {
        this.showToast(message, 'success');
    }

    info(message: string): void {
        this.showToast(message, 'info');
    }

    error(message: string): void {
        this.showToast(message, 'error');
    }

    showToast(message: string, type: ToastrType): void {
        this.toastr.show(
            message,
            null,
            {
                timeOut: 5000,
                extendedTimeOut: 5000,
                positionClass: 'toast-top-center',
                closeButton: false
            },
            type
        );
    }

    successResponse(translateSchema: string = 'response_message.default_success'): void {
        if (translateSchema) {
            this.response(ToastrBarEventEnum.Custom, translateSchema, 'success');
        }
    }

    exception(translateSchema: string = 'response_message.default_exception'): void {
        if (translateSchema) {
            this.response(ToastrBarEventEnum.Custom, translateSchema, 'error');
        }
    }

    response(type: ResponseType): void;
    response(type: ResponseWithInterpolationType, translateSchema: string): void;
    response(type: ToastrBarEventEnum.Custom, translateSchema: string, toastrType: ToastrType): void;
    response(type: ResponseBaseType, translateSchema?: string, toastrType?: any): void {
        if (type === 'custom' && translateSchema) {
            const msg = this.translate.instant(translateSchema);
            if (msg) {
                this.showToast(msg, toastrType);
            } else {
                console.error('Repair translate message for custom toastr');
            }
        }

        if (type !== 'custom') {
            const isExceptionTypes = [
                ToastrBarEventEnum.ExceptionCreated,
                ToastrBarEventEnum.ExceptionUpdated,
                ToastrBarEventEnum.ExceptionDeleted,
                ToastrBarEventEnum.DeletedFileException,
                ToastrBarEventEnum.DownloadFileException,
                ToastrBarEventEnum.UploadFileException,
                ToastrBarEventEnum.NotFound
            ].includes(type);

            const typeTpl = {
                [ToastrBarEventEnum.Created]: 'response_message.created',
                [ToastrBarEventEnum.Updated]: 'response_message.updated',
                [ToastrBarEventEnum.Deleted]: 'response_message.deleted',
                [ToastrBarEventEnum.ExceptionCreated]: 'response_message.exception_created',
                [ToastrBarEventEnum.ExceptionUpdated]: 'response_message.exception_updated',
                [ToastrBarEventEnum.ExceptionDeleted]: 'response_message.exception_deleted',
                [ToastrBarEventEnum.DeletedFile]: 'response_message.deleted_file',
                [ToastrBarEventEnum.DeletedFileException]: 'response_message.deleted_file_exception',
                [ToastrBarEventEnum.DownloadFileException]: 'response_message.download_file_exception',
                [ToastrBarEventEnum.UploadFileException]: 'response_message.upload_file_exception',
                [ToastrBarEventEnum.UploadFile]: 'response_message.upload_file',
                [ToastrBarEventEnum.NotFound]: 'response_message.not_found'
            };

            const title = translateSchema ? this.translate.instant(translateSchema) : undefined;

            const message = this.translate.instant(typeTpl[type], { title });
            if (isExceptionTypes) {
                this.error(message);
            } else {
                this.successes(message);
            }
        }
    }
}
