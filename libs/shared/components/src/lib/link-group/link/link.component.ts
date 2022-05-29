import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-link',
    templateUrl: './link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
    @Input() icon: string;
}
