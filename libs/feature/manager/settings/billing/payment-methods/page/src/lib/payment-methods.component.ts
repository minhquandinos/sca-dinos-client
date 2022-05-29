import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, forkJoin, Observable, Subject, take } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import {
    PAYMENT_METHOD_STATE_PROVIDER,
    PaymentMethodsModel,
    PaymentMethodsQuery,
    PaymentMethodsRequestModel,
    PaymentMethodsService
} from '@scaleo/feature/manager/settings/billing/payment-methods/data-access';
import { animationRules } from '@scaleo/shared/animations';
import { SharedMethodsService } from '@scaleo/shared/services/shared-methods';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { PaymentMethodsCreateComponent } from './payment-methods-create/payment-methods-create.component';

@Component({
    selector: 'scaleo-mng-payment-methods',
    templateUrl: './payment-methods.component.html',
    animations: [animationRules.animationTriggerForSortLists],
    providers: [PAYMENT_METHOD_STATE_PROVIDER]
})
export class PaymentMethodsComponent implements OnInit, OnDestroy {
    public readonly tableHeaders: UiTableHeaderInterface[] = [
        {
            value: 'title',
            key: 'title',
            translateKey: 'table.column.title',
            colWidth: '25%'
        },
        {
            value: 'supported_currencies',
            key: 'supported_currencies',
            translateKey: 'table.column.supported_currencies',
            colWidth: '30%'
        },
        {
            value: 'payment_threshold',
            key: 'payment_threshold',
            translateKey: 'table.column.minimum_threshold',
            colWidth: '30%'
        },
        {
            value: 'payment_commission',
            key: 'payment_commission',
            translateKey: 'table.column.commission',
            colWidth: '15%'
        }
    ];

    items: Observable<PaymentMethodsModel[]>;

    newLists: PaymentMethodsModel[];

    isLoad$: Observable<boolean> = this.paymentMethodsQuery.selectLoading();

    public options: any = {
        handle: '.config-list__sort',
        onUpdate: (): any => this.postChangesToServer()
    };

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public shared: SharedMethodsService,
        private modal3: Modal3Service,
        private paymentMethodsService: PaymentMethodsService,
        private paymentMethodsQuery: PaymentMethodsQuery
    ) {}

    ngOnInit(): void {
        this.loadItems();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public openModal(editId?: number) {
        const modal$ = this.modal3.editForm(PaymentMethodsCreateComponent, {
            data: {
                editId: editId || null
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) =>
                    [Modal3CloseEventEnum.Create, Modal3CloseEventEnum.Update, Modal3CloseEventEnum.Delete].includes(
                        type as Modal3CloseEventEnum
                    )
                ),
                take(1),
                tap(() => {
                    this.paymentMethodsService.loadSubject$.next();
                })
            )
            .subscribe();
    }

    private loadItems() {
        this.paymentMethodsService.paymentsData.pipe(takeUntil(this.unsubscribe)).subscribe();
        this.items = this.paymentMethodsQuery.selectAll().pipe(
            tap((items: PaymentMethodsModel[]) => {
                if (items) {
                    this.newLists = [...items];
                }
            })
        );
    }

    private postChangesToServer() {
        const resArray: any[] = [];

        this.newLists.forEach((el, key: number) => {
            const newSortValue = 1 + key;
            if (el.sort !== newSortValue) {
                const post = {
                    ...el,
                    sort: newSortValue
                };
                resArray.push(this.paymentMethodsService.update(post as PaymentMethodsRequestModel, post.id));
            }
        });
        forkJoin([...resArray])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe();
    }
}
