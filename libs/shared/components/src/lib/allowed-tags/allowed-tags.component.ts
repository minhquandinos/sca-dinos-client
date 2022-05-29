import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BooleanEnum } from '@scaleo/core/data';

@Component({
    selector: 'app-allowed-tags',
    template: `
        <div class="allowed-tag allowed-tag__{{ allowedTag }}" [ngClass]="className">
            <span *ngIf="tag">{{ tag }}</span>
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllowedTagsComponent implements OnInit {
    @Input() tag: string;

    @Input() allowedAsNumber: BooleanEnum | boolean;

    @Input() allowed: boolean;

    @Input() className: string;

    allowedTag: string;

    ngOnInit(): void {
        if (this.allowedAsNumber) {
            this.formattingAllowed();
        }
        this.allowedTag = this.allowed ? 'allowed' : 'denied';
    }

    private formattingAllowed() {
        this.allowed = this.allowedAsNumber === BooleanEnum.True;
    }
}
