import { DOCUMENT } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    ViewChild
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { delay, takeUntil, tap, throttleTime } from 'rxjs/operators';

import { UiSvgIconAnimationType, UiSvgIconComponent, UiSvgIconType } from '../ui-svg-icon';
import {
    ButtonType,
    UiButtonLinkColorType,
    UiButtonLinkIconPositionType,
    UiButtonLinkIconSizeType,
    UiButtonLinkSizeType
} from './ui-button-link.type';

interface SomeInterface {
    disabled: boolean;
}

@Component({
    selector: 'ui-button-link',
    templateUrl: './ui-button-link.component.html'
})
export class UiButtonLinkComponent implements OnInit, OnDestroy, SomeInterface {
    @Input() label: string;

    @Input() icon: string;

    @Input() iconPosition: UiButtonLinkIconPositionType = 'left';

    @Input() iconSize: UiButtonLinkIconSizeType;

    @Input() iconAnimation: UiSvgIconAnimationType;

    @Input() iconAnimationDuration: number;

    @Input() size: UiButtonLinkSizeType = 'base';

    @Input()
    set type(type: ButtonType) {
        if (type) {
            this._type = type;
            if (this.buttonRef) {
                this.initType();
            }
        }
    }

    @Input() color: UiButtonLinkColorType;

    @Input() circle: boolean;

    @Input() className = '';

    @Input() active: boolean;

    @Input() isLoad = true;

    @Input() iconType: UiSvgIconType;

    @Input() disabled: boolean;

    @Input() iconColor: string;

    @Input() iconClass = '';

    @Output() toggle: EventEmitter<PointerEvent> = new EventEmitter<PointerEvent>();

    @HostBinding() tabindex = 1;

    @HostBinding('class') hostClass = 'ui-button-link';

    @ViewChild('buttonRef', { static: true })
    private buttonRef: ElementRef;

    @ViewChild(UiSvgIconComponent) readonly uiSvgIconComponent: UiSvgIconComponent;

    private unsubscribe: Subject<void> = new Subject<void>();

    private _type: ButtonType = 'main';

    typeClassName: string;

    constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private document: HTMLDocument) {}

    ngOnInit(): void {
        this.initStyle();
        this.clickHandler();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private initStyle(): void {
        this.initType();

        this.initIconAnimation();

        this.renderer2.addClass(this.buttonRef.nativeElement, `btn-size-${this.size}`);

        if (this.iconPosition === 'right') {
            this.renderer2.addClass(this.buttonRef.nativeElement, 'flex-row-reverse');
            this.renderer2.addClass(this.buttonRef.nativeElement, 'btn-icon-right');
        }

        if (this.icon) {
            this.renderer2.addClass(this.buttonRef.nativeElement, 'btn-icon');
        }

        if (this.circle) {
            this.renderer2.addClass(this.buttonRef.nativeElement, 'btn-circle');
        }

        if (this.color) {
            this.renderer2.addClass(this.buttonRef.nativeElement, `btn-color-${this.color}`);
        }
    }

    private clickHandler(): void {
        fromEvent(this.buttonRef.nativeElement, 'click')
            .pipe(
                throttleTime(500),
                tap((event) => {
                    this.toggle.emit(event as PointerEvent);
                    if (this.iconAnimation) {
                        this.uiSvgIconComponent.startAnimation();
                    }
                }),
                delay(this.iconAnimation ? 1000 : 250),
                tap(() => {
                    this.buttonRef.nativeElement.blur();
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe();
    }

    // TODO fixed this
    private initType() {
        this.typeClassName = `btn-${this._type}`;
        // this.renderer2.addClass(this.buttonRef.nativeElement, `btn-${this._type}`);
    }

    private initIconAnimation() {
        // if (this.iconAnimation) {
        //     this.renderer2.addClass(this.buttonRef.nativeElement, `btn-icon--animation-${this.iconAnimation}`);
        // }
    }
}
