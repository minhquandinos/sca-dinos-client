import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { BaseRoleType } from '@scaleo/platform/role/models';

@Component({
    selector: 'app-custom-info-tooltip-template',
    template: `
        <div>
            <ng-container [ngTemplateOutlet]="isTemplate ? _text : defaultTextTpl"></ng-container>
            <app-link-to-beacon *ngIf="showLinkToBeacon" [beaconId]="beaconId" class="mt-2 d-block"></app-link-to-beacon>
        </div>

        <ng-template #defaultTextTpl>
            <span [innerHTML]="_text"></span>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomInfoTooltipTemplateComponent implements OnInit {
    @HostBinding('class') hostClass = 'custom-info-tooltip-template d-inline-flex align-items-center';

    @Input() set text(value: string | TemplateRef<any>) {
        if (value) {
            this._text = value;
            this.isTextTemplate();
        }
    }

    @Input() beaconId: string;

    @Input() permissionExceptForBeacon: BaseRoleType[];

    _text: string | TemplateRef<any>;

    isTemplate: boolean;

    showLinkToBeacon: boolean;

    constructor(private readonly profileQuery: ProfileQuery) {}

    ngOnInit(): void {
        this.showLinkToBeacon = this.getShowLinkToBeacon;
    }

    private isTextTemplate() {
        this.isTemplate = this._text instanceof TemplateRef;
    }

    private get getShowLinkToBeacon(): boolean {
        return this.beaconId && this.getPermissionToSetBeaconDataForRole;
    }

    private get getPermissionToSetBeaconDataForRole(): boolean {
        return !this.permissionExceptForBeacon?.includes(this.profileQuery.baseRole);
    }
}
