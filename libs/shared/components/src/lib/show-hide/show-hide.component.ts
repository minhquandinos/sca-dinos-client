import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'app-show-hide',
    templateUrl: './show-hide.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowHideComponent {
    @HostBinding('class') hostClass = 'd-block';

    @Input() labelShow: string;

    @Input() labelHide: string;

    @Input() buttonClass = '';

    @Input() buttonPositionOnShow: 'top' | 'bottom' = 'top';

    @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    show = false;

    iconClass = this.getIconClass;

    showHideBlock(): void {
        this.show = !this.show;
        this.iconClass = this.getIconClass;
        this.toggle.emit(this.show);
    }

    private get getIconClass(): string {
        return this.show ? 'transform rotate-180 ml-1' : 'ml-1';
    }
}
