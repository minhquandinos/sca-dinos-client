import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { AffiliateAccessOfferDetailService, AffiliateAccessOfferViewModel } from '@scaleo/feature/affiliate/offer/detail/data-access';
import { OfferUrlsInterface, OfferUrlsTypesEnum } from '@scaleo/offer/common';
import { DateFormatService } from '@scaleo/platform/format/service';
import { Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ArrayUtil, Util } from '@scaleo/utils';

@Component({
    selector: 'scaleo-affiliate-access-offer-detail-info-widget',
    templateUrl: './affiliate-access-offer-detail-info-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateAccessOfferDetailInfoWidgetComponent implements OnChanges {
    @Input() offerData: AffiliateAccessOfferViewModel;

    @Input() visibilityLabel: string;

    @Input() visibilityColor: string;

    @Input() showRequestButton: boolean;

    readonly textLimit = 190;

    previewLink: string;

    askQuestionForm: FormGroup;

    @ViewChild('offerRequestAnswerQuestionModalTpl')
    private _offerRequestAnswerQuestionModalTpl: TemplateRef<any>;

    constructor(
        private readonly _profileQuery: ProfileQuery,
        private readonly _modal3: Modal3Service,
        private readonly _translate: TranslateService,
        private readonly _fb: FormBuilder,
        private readonly _dateFormatService: DateFormatService,
        private readonly _affiliateAccessOfferDetailService: AffiliateAccessOfferDetailService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        const { offerData } = changes;

        if (offerData?.currentValue) {
            this.findPreviewLink(offerData.currentValue?.links);
        }
    }

    requestOffer(): void {
        const { ask_approval_questions } = this.offerData;
        if (Util.numToBoolean(ask_approval_questions)) {
            this._askApprovalQuestions();
        } else {
            this._sendOfferRequest().pipe(take(1)).subscribe();
        }
    }

    findPreviewLink(links: OfferUrlsInterface[]): void {
        if (links.length > 0) {
            const { url, preview } = ArrayUtil.findByKey(links, 'type', OfferUrlsTypesEnum.Default);
            this.previewLink = preview || url;
        }
    }

    preview(): void {
        if (this.previewLink) {
            window.open(this.previewLink, '_blank');
        }
    }

    private _askApprovalQuestions(): void {
        const translateSchema = 'shared.dictionary';
        this._initAskQuestionForm();
        const SUBMIT_EVENT = 'submit';
        const CANCEL_EVENT = 'cancel';
        const ref$ = this._modal3.info(this._offerRequestAnswerQuestionModalTpl, {
            title: this._translate.instant('offers_requests_page.ask_questions_affiliate'),
            footer: {
                controls: [
                    {
                        buttonType: 'simple',
                        label: this._translate.instant(`${translateSchema}.cancel`),
                        eventName: CANCEL_EVENT
                    },
                    {
                        buttonType: 'main',
                        label: this._translate.instant(`${translateSchema}.submit`),
                        eventName: SUBMIT_EVENT,
                        callback: (context): any => {
                            if (this.askQuestionForm.valid) {
                                const data = this.askQuestionForm.get('additional_info').value;
                                return context.close(data, SUBMIT_EVENT);
                            }
                            this.askQuestionForm.markAllAsTouched();
                            return undefined;
                        }
                    }
                ],
                borderTop: true
            }
        });

        ref$.afterClosed$
            .pipe(
                filter(({ type }) => type === SUBMIT_EVENT),
                switchMap(({ data }) => this._sendOfferRequest(data)),
                take(1)
            )
            .subscribe();
    }

    private _sendOfferRequest(answer: string = undefined): Observable<void> {
        return this._affiliateAccessOfferDetailService.offerRequest(this.offerData.id, answer).pipe(
            tap(() => {
                this._affiliateAccessOfferDetailService.reload();
                this.showRequestButton = false;
            })
        );
    }

    // private initVisibility(visibility: OfferVisibilityModel | OfferVisibilityModel[]): void {
    //     const { label$, showRequestButton, color, showHideCard } = new OfferVisibilityAffiliateAccessView(
    //         visibility,
    //         this.translate,
    //         this.dateFormatService
    //     );
    //     this.visibilityLabel$ = label$;
    //     this.visibilityColor = color;
    //     this.showRequestButton = showRequestButton;
    //     this.hideCard = showHideCard;
    // }

    private _initAskQuestionForm(): void {
        this.askQuestionForm = this._fb.group({
            additional_info: ['', Validators.required]
        });
    }
}
