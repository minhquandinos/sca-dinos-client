import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ApiResponse, RestApiService } from '@scaleo/core/rest-api/service';

import { EmailTemplatesInterface, EmailTemplatesListInterface } from './email-templates.interface';

@Injectable()
export class EmailTemplatesService {
    constructor(private rest: RestApiService) {}

    private emailTemplatesListAsSubject: BehaviorSubject<EmailTemplatesListInterface[]> = new BehaviorSubject(null);

    public readonly emailTemplateList = this.emailTemplatesListAsSubject.asObservable();

    public list(): Observable<EmailTemplatesListInterface[]> {
        return this.rest.get<ApiResponse<EmailTemplatesListInterface[]>>('email-templates-list').pipe(
            pluck('info', 'email-templates'),
            map((response) => {
                const emailTemplates = response.map((template: EmailTemplatesListInterface) => {
                    template = this.formatTemplate(template);
                    template.translatePathForTitle = `administration_settings.email_templates.${template.category}.types_email.${template.title}`;
                    return template;
                });
                this.emailTemplatesListAsSubject.next(emailTemplates);
                return emailTemplates;
            })
        );
    }

    public view(editId: number): Observable<EmailTemplatesInterface> {
        return this.rest.get<EmailTemplatesInterface>('email-templates-view', { urlParameters: { editId } }).pipe(
            pluck('info', 'email-template'),
            map((response) => {
                response = this.formatTemplate(response);
                response.translatePathForDescription = `administration_settings.email_templates.${response.category}.description.${response.title}`;
                return response;
            })
        );
    }

    public update(id: number, post: EmailTemplatesInterface): Observable<EmailTemplatesInterface> {
        return this.rest.put<EmailTemplatesInterface>('email-templates-update', post, { urlParameters: { id } });
    }

    public restoreToDefault(): Observable<any> {
        return this.rest.post<ApiResponse<any>>('email-templates-restore-default');
    }

    private formatTemplate(
        template: EmailTemplatesInterface | EmailTemplatesListInterface
    ): EmailTemplatesInterface | EmailTemplatesListInterface {
        const replaceSpace = (str: string) => str.toLowerCase().replace(/ /g, '_');
        const { title, category } = template;
        return {
            ...template,
            title: replaceSpace(title),
            category: replaceSpace(category)
        };
    }
}
