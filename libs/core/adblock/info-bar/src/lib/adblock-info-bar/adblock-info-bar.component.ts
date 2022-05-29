import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-adblock-info-bar',
    templateUrl: './adblock-info-bar.component.html',
    styleUrls: ['./adblock-info-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdblockInfoBarComponent {}
