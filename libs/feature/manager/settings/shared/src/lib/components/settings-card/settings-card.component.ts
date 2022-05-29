import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'scaleo-manager-settings-card',
    templateUrl: './settings-card.component.html',
    styleUrls: ['./scaleo-manager-settings-card.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsCardComponent {
    @Input()
    title: string;
}
