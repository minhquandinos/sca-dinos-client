import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appColorFieldByKeyValue]'
})
export class ColorFieldByKeyValueDirective {
    @Input() set options(options: { key: string; value: any }) {
        if (options.value !== null && options.value !== undefined && options.key != null) {
            if (typeof options.key === 'string') {
                this._key = options.key.toLowerCase();
                this._value = options.value;
                this.setColorByKey();
            }
        }
    }

    private _key: string;

    private _value: any;

    constructor(private el: ElementRef, private renderer2: Renderer2) {}

    setColorByKey(): void {
        this.clearColorClass();
        let styleClass;
        switch (this._key) {
            case 'approved_profit':
            case 'profit':
                styleClass = 'color__green';
                break;
            // case 'revenue':
            //     styleClass = 'color__green';
            //     break;
            case 'antifraud_logic_score':
                if (this._value > 30 && this._value <= 70) {
                    styleClass = 'color__orange';
                } else if (this._value > 70) {
                    styleClass = 'color__red';
                }
                break;
            case 'cv_approved':
            case 'approved':
                styleClass = 'color__green';
                break;
            case 'cv_pending':
            case 'pending':
            case 'pending_profit':
                styleClass = 'color__orange';
                break;
            case 'invalid_clicks':
            case 'cv_rejected':
            case 'rejected':
            case 'reason':
            case 'rejected_profit':
            case 'cv_trash':
            case 'trash':
                styleClass = 'color__red';
                break;
            case 'result':
                // eslint-disable-next-line no-case-declarations
                const item = (this._value as string).split(' ')[0];
                if (item === 'OK' || item === 'Conversion') {
                    styleClass = 'color__green';
                } else {
                    styleClass = 'color__red';
                }
                break;
            case 'conversion_status':
                // eslint-disable-next-line no-case-declarations
                const value = (this._value as string).toLowerCase();
                switch (value) {
                    case 'approved':
                        styleClass = 'color__green';
                        break;
                    case 'pending':
                        styleClass = 'color__orange';
                        break;
                    case 'rejected':
                    case 'trash':
                        styleClass = 'color__red';
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        if (styleClass) {
            this.renderer2.addClass(this.el.nativeElement, styleClass);
        }
    }

    private clearColorClass() {
        this.renderer2.removeClass(this.el.nativeElement, 'color__green');
        this.renderer2.removeClass(this.el.nativeElement, 'color__orange');
        this.renderer2.removeClass(this.el.nativeElement, 'color__red');
    }
}
