import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-affiliate-billing-balance-block',
    templateUrl: './affiliate-billing-balance-block.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffiliateBillingBalanceBlockComponent implements OnInit {
    @Input() title: string;

    @Input() balance: number;

    @Input() balanceType: 'approved' | 'pending' | 'date' = 'date';

    @Input() tooltipText: string;

    @HostBinding('class') hostClass = 'affiliate-billing-balance__block';

    constructor(private readonly renderer2: Renderer2, private readonly el: ElementRef) {}

    ngOnInit(): void {
        this.setClassByBalanceType();
    }

    private setClassByBalanceType() {
        this.renderer2.addClass(this.el.nativeElement, `affiliate-billing-balance__${this.balanceType}`);
    }
}
