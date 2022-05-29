import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-entity-group',
    templateUrl: './entity-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityGroupComponent {
    @Input() label: string;
}
