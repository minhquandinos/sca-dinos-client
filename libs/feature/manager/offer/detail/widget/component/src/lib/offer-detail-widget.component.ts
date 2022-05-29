import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { catchError, firstValueFrom, Observable, take, throwError } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import {
    OFFER_INFO_WIDGET_PROVIDER,
    OfferDetailViewModel,
    OfferInfoWidgetQuery,
    OfferInfoWidgetService
} from '@scaleo/feature/manager/offer/detail/widget/data-access';
import { ManagerOfferDuplicateComponent } from '@scaleo/feature/manager/offer/duplicate/component';
import { OfferUpsertComponent } from '@scaleo/feature/manager/offer/upsert/modal-form';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarEventEnum, ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'scaleo-manager-offer-detail-widget',
    templateUrl: './offer-detail-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [OFFER_INFO_WIDGET_PROVIDER]
})
export class OfferDetailWidgetComponent implements OnDestroy, OnChanges {
    @Input() id: number;

    @Input() previewLink: string;

    @Output() offerData: EventEmitter<OfferDetailViewModel> = new EventEmitter<OfferDetailViewModel>();

    readonly data$ = this.query.data$;

    readonly loading$: Observable<boolean> = this.data$.pipe(map((data) => !!data));

    readonly image$ = this.data$.pipe(pluck('image_url'));

    readonly title$: Observable<string> = this.data$.pipe(pluck('title'));

    readonly status$: Observable<number> = this.data$.pipe(pluck('status', 'id'));

    readonly limitForDescription = 190;

    readonly showTimeZone$ = this.getShowTimeZone$;

    @ViewChild(ManagerOfferDuplicateComponent)
    private readonly offerDuplicateComponent: ManagerOfferDuplicateComponent;

    constructor(
        private readonly service: OfferInfoWidgetService,
        private readonly profileQuery: ProfileQuery,
        private readonly query: OfferInfoWidgetQuery,
        private readonly modal3: Modal3Service,
        private readonly cdr: ChangeDetectorRef,
        private readonly toastr: ToastrBarService,
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType
    ) {
        this.showTimeZone$ = this.getShowTimeZone$;
    }

    ngOnChanges(changes: SimpleChanges) {
        const { id } = changes;

        if (id?.currentValue) {
            this.initData();
        }
    }

    ngOnDestroy() {
        this.service.resetStore();
    }

    duplicated(newOfferId: number): void {
        this.navigateRootService.navigate(`/offers/${newOfferId}`);
    }

    edit(): void {
        const modalRef = this.modal3.editForm(OfferUpsertComponent, {
            data: {
                editId: this.id
            }
        }).afterClosed$;

        firstValueFrom(modalRef).then(({ type }) => {
            if (type === Modal3CloseEventEnum.Update) {
                this.initData();
            }

            if (type === Modal3CloseEventEnum.Delete) {
                this.navigateToOffersList();
            }
        });
    }

    private initData(): void {
        this.service
            .view(this.id)
            .pipe(
                catchError((error) => {
                    this.toastr.response(ToastrBarEventEnum.NotFound, 'table.column.offer');
                    this.navigateToOffersList();
                    return throwError(error);
                }),
                take(1)
            )
            .subscribe((data) => {
                this.offerData.emit(data);
                this.cdr.detectChanges();
            });
    }

    private get getShowTimeZone$(): Observable<boolean> {
        return this.data$.pipe(
            pluck('timezone', 'timezone'),
            map((timezone) => timezone !== this.profileQuery.profile.timezone)
        );
    }

    private navigateToOffersList(): void {
        this.navigateRootService.navigate('/offers/all');
    }
}
