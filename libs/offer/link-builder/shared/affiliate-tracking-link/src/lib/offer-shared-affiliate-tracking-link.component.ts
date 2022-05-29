import { Component, Input, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { LinkGenerator } from '@scaleo/offer/link-builder/common';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';

@Component({
    selector: 'scaleo-offer-shared-affiliate-tracking-link',
    templateUrl: './offer-shared-affiliate-tracking-link.component.html',
    providers: [LinkGenerator, FormGroupDirective]
})
export class OfferSharedAffiliateTrackingLinkComponent {
    link: BehaviorSubject<string> = new BehaviorSubject<string>('');

    form: FormGroup;

    @Input() infoTemplate: TemplateRef<HTMLElement>;

    @Input() set trackingDomain(trackingDomain: string) {
        this.trackingDomainUrl = trackingDomain;
        this.updateTrackingDomain();
    }

    @Input() set affiliateId(id: number | string) {
        if (id) {
            if (id !== '{affiliate_id}') {
                this.form.get('a').setValue(+id);
            }
        }
    }

    @Input() set offerId(id: number) {
        if (id) {
            this.form.get('o').setValue(id);
        }
    }

    @Input() className: string;

    @Input() trackingTypeFor: 'affiliate' | 'default' = 'default';

    private trackingDomainUrl: string;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private modal3Service: Modal3Service,
        private translate: TranslateService,
        private formBuilder: FormBuilder,
        private linkGeneratorClass: LinkGenerator
    ) {
        this.initForm();
    }

    initForm() {
        this.form = this.formBuilder.group({
            o: [1],
            a: [null]
        });

        this.form.valueChanges.pipe(delay(300), takeUntil(this.unsubscribe)).subscribe(() => {
            this.updateTrackingDomain();
        });
    }

    private updateTrackingDomain() {
        this.link.next(this.linkGeneratorClass.generateLink(this.form, this.trackingDomainUrl));
    }

    public showInfo() {
        this.modal3Service.info(this.infoTemplate, {
            title: this.translate.instant('offers_page.tracking.form.additional_parameters')
        });
    }
}
