import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-manager-chip',
    template: `
        <ui-chip size="large" rounded="true" [noColor]="true" *ngIf="image && name">
            <ui-image type="circle" height="20" [image]="image | defaultImage: 'manager'"></ui-image>
            <span class="fs-base manager-chip__title">{{ name }}</span>
        </ui-chip>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerChipComponent {
    @HostBinding('class') hostClass = 'manager-chip';

    @Input() image: string;

    @Input() name: string;
}
