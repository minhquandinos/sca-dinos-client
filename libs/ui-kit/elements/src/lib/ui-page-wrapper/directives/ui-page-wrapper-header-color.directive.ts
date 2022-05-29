import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { UiPageWrapperHeaderComponent } from '../ui-page-wrapper-header/ui-page-wrapper-header.component';

@Directive({
    selector: '[appUiPageWrapperHeaderColor]'
})
export class UiPageWrapperHeaderColorDirective implements OnChanges {
    @Input('appUiPageWrapperHeaderColor') toggleColor = false;

    @Input() colorClass = 'bg__main_color';

    @Input() colorStyle: string;

    constructor(private host: UiPageWrapperHeaderComponent) {}

    ngOnChanges(changes: SimpleChanges) {
        const { toggleColor } = changes;

        if (toggleColor?.currentValue) {
            this.setColorFactory();
        }

        if (!toggleColor?.currentValue && this.host.headerRef) {
            this.removeColorFactory();
        }
    }

    private setColorFactory() {
        if (this.colorClass) {
            this.setColorByClass();
        } else {
            this.setColorByStyle();
        }
    }

    private removeColorFactory() {
        if (this.colorClass) {
            this.removeColorByClass();
        } else {
            this.removeColorByStyle();
        }
    }

    private setColorByClass() {
        this.host.renderer.addClass(this.host.headerRef.nativeElement, this.colorClass);
    }

    private removeColorByClass() {
        this.host.renderer.removeClass(this.host.headerRef.nativeElement, this.colorClass);
    }

    private setColorByStyle() {
        this.host.renderer.setStyle(this.host.headerRef.nativeElement, 'background', this.colorStyle);
    }

    private removeColorByStyle() {
        this.host.renderer.removeStyle(this.host.headerRef.nativeElement, 'background');
    }
}
