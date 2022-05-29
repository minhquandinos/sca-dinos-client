import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, pluck, startWith } from 'rxjs/operators';

import { BaseObjectModel, BooleanEnum } from '@scaleo/core/data';
import { OfferTrackingSettingsUtil } from '@scaleo/feature/manager/offer/tracking/common';
import {
    OFFER_TRACKING_SETTINGS_UPSERT_PROVIDER,
    OfferTrackingSettingsEditService,
    OfferTrackingSettingsPayloadDto,
    UniqueIpsTimeSpanEnum
} from '@scaleo/feature/manager/offer/tracking/settings/upsert/data-access';
import {
    InvalidTrafficForwardingEnum,
    OfferTrackingSettingsInputDataModel,
    OfferTrackingSettingsModel
} from '@scaleo/feature/manager/offer/tracking/settings/view-info/data-access';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { CustomValidators } from '@scaleo/shared/validators';
import { Modal3EditFormRef } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';
import { ArrayUtil } from '@scaleo/utils';

@Component({
    selector: 'app-offer-tracking-settings-edit',
    templateUrl: './offer-tracking-settings-edit.component.html',
    changeDetection: ChangeDetectionStrategy.Default,
    providers: [OFFER_TRACKING_SETTINGS_UPSERT_PROVIDER]
})
export class OfferTrackingSettingsEditComponent implements OnInit {
    readonly settings: OfferTrackingSettingsModel;

    readonly id: number;

    readonly invalidTrafficForwardingEnum = InvalidTrafficForwardingEnum;

    readonly uniqueTimeMap = this.getUniqueTimeMap;

    failTrafficForwardingTypes: PlatformListsFormatInterface[];

    form: FormGroup;

    domain$: Observable<string>;

    globalPostbackLink$: Observable<string>;

    showAdvertiserTokenPostback$ = this.platformSettingsQuery.settings$.pipe(pluck('advertiser_token_for_postback'));

    constructor(
        private readonly service: OfferTrackingSettingsEditService,
        private readonly modal3Ref: Modal3EditFormRef<OfferTrackingSettingsModel, OfferTrackingSettingsInputDataModel>,
        private readonly formBuilder: FormBuilder,
        private readonly toastr: ToastrBarService,
        private readonly platformSettingsQuery: PlatformSettingsQuery
    ) {
        const { settings, id } = this.modal3Ref.config.data;
        this.settings = settings;
        this.id = id;
    }

    ngOnInit(): void {
        this.initForm();
        this.domain$ = this.getDomain$;
        this.globalPostbackLink$ = this.getGlobalPostbackLink$;
        this.failTrafficForwardingTypes = this.getFailTrafficForwardingTypes;
        this.setDataToForm();
    }

    update(): void {
        if (this.form.valid) {
            const { offers_to_forward, ...offerValue } = this.form.value;
            const data: OfferTrackingSettingsPayloadDto = {
                ...offerValue,
                offers_to_forward: offers_to_forward || 0
            };

            this.service.update(this.id, data).then(
                (res) => {
                    this.toastr.successResponse('offers_page.profile.tracking.updated');
                    this.modal3Ref.close(res);
                },
                () => {
                    this.toastr.response(ToastrBarEventEnum.ExceptionUpdated, 'offers_page.profile.tracking.tracking_setting');
                }
            );
        } else {
            this.form.markAllAsTouched();
        }
    }

    changeFailTrafficForwarding(): void {
        const trafficForwarding: InvalidTrafficForwardingEnum = this.form.get('fail_traffic_forwarding').value;

        const trafficForwardingControlMap: BaseObjectModel = {
            [InvalidTrafficForwardingEnum.CustomTrafficbackUrl]: 'custom_trafficback_url',
            [InvalidTrafficForwardingEnum.Offer]: 'offers_to_forward'
        };

        const trafficForwardingControl = trafficForwardingControlMap[trafficForwarding];

        const trafficForwardingValidatorsMap: BaseObjectModel = {
            [InvalidTrafficForwardingEnum.Offer]: Validators.required,
            [InvalidTrafficForwardingEnum.CustomTrafficbackUrl]: [Validators.required, CustomValidators.checkUrl]
        };

        Object.values(trafficForwardingControlMap).forEach((controlName) => {
            const control = this.form.get(controlName);
            control.clearValidators();
            control.updateValueAndValidity();
        });

        if (trafficForwardingControl) {
            this.form.get(trafficForwardingControl).setValidators(trafficForwardingValidatorsMap[trafficForwarding]);
        }
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            tracking_domain_id: undefined,
            fail_traffic_forwarding: undefined,
            deep_linking: BooleanEnum.False,
            double_meta_redirect: BooleanEnum.False,
            cookie_lifetime: '',
            hide_referer_url: BooleanEnum.False,
            unique_ips: BooleanEnum.False,
            unique_ips_time_span: UniqueIpsTimeSpanEnum.FifteenSeconds,
            postback_whitelist_ips: '',
            postback_blacklist_ips: '',
            impressions_url: ['', CustomValidators.checkUrl],
            show_sales_amount: BooleanEnum.False,
            change_conversion_status_via_postback: BooleanEnum.False,
            offers_to_forward: 0,
            custom_trafficback_url: ''
        });
    }

    private setDataToForm(): void {
        this.form.patchValue({
            ...this.settings,
            offers_to_forward: this.settings.offers_to_forward || undefined
        });
        this.changeFailTrafficForwarding();
    }

    private get getUniqueTimeMap(): PlatformListsFormatInterface[] {
        return [
            { id: UniqueIpsTimeSpanEnum.FifteenSeconds, title: 'fifteen_seconds' },
            { id: UniqueIpsTimeSpanEnum.ThirtySeconds, title: 'thirty_seconds' },
            { id: UniqueIpsTimeSpanEnum.OneMinute, title: 'one_minute' },
            { id: UniqueIpsTimeSpanEnum.OneHour, title: 'one_hour' },
            { id: UniqueIpsTimeSpanEnum.OneDay, title: 'one_day' }
        ];
    }

    private get getDomain$(): Observable<string> {
        return this.form.get('tracking_domain_id').valueChanges.pipe(
            startWith(this.settings.tracking_domain_id),
            map((domainId: number) => {
                const { tracking_domains } = this.settings;
                return ArrayUtil.findByKey(tracking_domains, 'id', domainId).name;
            })
        );
    }

    private get getGlobalPostbackLink$(): Observable<string> {
        return this.domain$.pipe(map((domain: string) => OfferTrackingSettingsUtil.postback(domain, this.settings.postback_token)));
    }

    private get getFailTrafficForwardingTypes(): PlatformListsFormatInterface[] {
        return this.settings.fail_traffic_forwarding_types.map(({ id, name }) => ({
            id,
            title: name
        }));
    }
}
