import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, startWith, Subject, switchMap, take } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';

import { EmailTemplatesListInterface } from '../../email-templates.interface';
import { EmailTemplatesService } from '../../email-templates.service';
import { EmailTemplatesEditComponent } from '../email-templates-edit/email-templates-edit.component';

@Component({
    selector: 'app-email-templates-list',
    templateUrl: './email-templates-list.component.html',
    providers: [EmailTemplatesService, UnsubscribeService]
})
export class EmailTemplatesListComponent implements OnInit {
    typeEmailTemplate = 'general';

    emails$: Observable<EmailTemplatesListInterface[]>;

    isLoad: boolean;

    countRowForSkeleton = 1;

    constructor(
        private emailTemplatesService: EmailTemplatesService,
        private modal3Service: Modal3Service,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private unsubscribe: UnsubscribeService
    ) {
        this.activatedRoute.data.pipe(takeUntil(this.unsubscribe)).subscribe((data) => {
            this.typeEmailTemplate = data.emailType;
        });
    }

    ngOnInit(): void {
        this.emailTemplatesService.list().pipe(takeUntil(this.unsubscribe)).subscribe();
        if (this.typeEmailTemplate === 'signup') {
            this.countRowForSkeleton = 6;
        } else if (this.typeEmailTemplate === 'offers') {
            this.countRowForSkeleton = 3;
        }
        this.getEmails();
    }

    private getEmails() {
        this.isLoad = false;
        this.emails$ = this.emailTemplatesService.emailTemplateList.pipe(
            tap(() => {
                this.isLoad = false;
            }),
            map((res: EmailTemplatesListInterface[]) =>
                res?.filter((template: EmailTemplatesListInterface) => template.category === this.typeEmailTemplate)
            ),
            tap(() => {
                this.isLoad = true;
            })
        );
        this.cdr.detectChanges();
    }

    public openModal(id: number) {
        this.modal3Service.editForm(EmailTemplatesEditComponent, {
            data: {
                editId: id
            }
        });
    }
}
