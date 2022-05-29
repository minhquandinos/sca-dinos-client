import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { NotificationHeaderService } from './notification-header.service';

export type NotificationHeaderType = 'warning' | 'success' | 'info' | 'danger';

@Component({
    selector: 'app-notification-header',
    templateUrl: './notification-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationHeaderComponent {
    @Input() close = true;

    @Input() set color(color: NotificationHeaderType) {
        this.setColor(color);
    }

    @ViewChild('notificationContainer', { static: true }) notificationContainer: ElementRef;

    colorClassName: string;

    constructor(private notificationHeader: NotificationHeaderService) {}

    get show(): boolean {
        return this.notificationHeader.show;
    }

    onClose() {
        this.notificationHeader.hide();
    }

    setColor(color: NotificationHeaderType = 'info') {
        let className;
        switch (color) {
            case 'danger':
                className = 'bg__pending';
                break;
            case 'success':
                className = 'bg__approved';
                break;
            case 'warning':
                className = 'bg__rejected';
                break;
            case 'info':
            default:
                className = 'bg__info';
                break;
        }

        this.colorClassName = className;
    }
}
