import { Clipboard } from '@angular/cdk/clipboard';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FunctionType } from '@scaleo/core/data';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

type PresetType = 'copy';

interface PresetModel {
    icon: string;
    action: FunctionType;
    tooltipMessage: string;
    toastrMessage: string;
}

type PresetsModel = {
    [K in PresetType]: PresetModel;
};

@Component({
    selector: 'app-field-text-info',
    template: `
        <div class="field-text-info2" [ngClass]="className">
            <div class="field-text-info2__content d-contents" #contentWrapper>
                <ng-content></ng-content>
            </div>

            <div class="field-text-info2__actions d-flex align-items-center">
                <ng-content select="[action]"></ng-content>
                <div *ngIf="iconView" class="field-text-info2__icon copy cursor-pointer">
                    <ui-svg-icon
                        [tooltip]="iconTooltipView"
                        [display]="!!iconTooltipView"
                        (click)="clickHandler()"
                        [icon]="iconView"
                    ></ui-svg-icon>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldTextInfoComponent implements OnInit, OnChanges {
    @HostBinding('class') hostClass = 'd-inline w-100';

    @Input() icon: string;

    @Input() action: FunctionType;

    @Input() iconTooltip: string;

    @Input() className: string;

    @Input() callbackMessageSchema: string;

    @Input() preset: PresetType;

    @ViewChild('contentWrapper') content: ElementRef;

    private _presets: PresetsModel = {
        copy: {
            icon: 'copy',
            action: () => {
                this.clipboard.copy(this.content.nativeElement.innerText);
            },
            tooltipMessage: this.translate.instant('interface.basic.copy'),
            toastrMessage: this.translate.instant('interface.basic.link_copy')
        }
    };

    iconView: string;

    iconTooltipView: string;

    constructor(
        private readonly clipboard: Clipboard,
        private readonly translate: TranslateService,
        private readonly toastr: ToastrBarService
    ) {}

    ngOnInit(): void {
        this.setIcon();
        this.setIconTooltip();
    }

    ngOnChanges(changes: SimpleChanges) {
        const { icon, iconTooltip } = changes;

        if (icon?.currentValue) {
            this.setIcon();
        }

        if (iconTooltip?.currentValue) {
            this.setIconTooltip();
        }
    }

    clickHandler() {
        if (typeof this.action === 'function') {
            this.action();
            if (this.callbackMessageSchema) {
                this.toastr.successes(this.callbackMessageSchema);
            }
            return;
        }

        if (this.selectedPreset) {
            this.selectedPreset.action.call(this);
            this.toastr.successes(this.callbackMessageSchema || this.selectedPreset.toastrMessage);
        }
    }

    private get selectedPreset(): PresetModel {
        return this._presets[this.preset];
    }

    private setIcon(): void {
        this.iconView = this.icon || this.selectedPreset?.icon || undefined;
    }

    private setIconTooltip(): void {
        this.iconTooltipView = this.iconTooltip || this.selectedPreset?.tooltipMessage || undefined;
    }
}
