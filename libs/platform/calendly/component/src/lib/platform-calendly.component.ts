import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let Calendly: any;

@Component({
    selector: 'platform-calendly',
    template: ``
})
export class PlatformCalendlyComponent implements OnInit, AfterViewInit {
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    private listener: EventListener;

    constructor(@Inject(DOCUMENT) private document: HTMLDocument) {
        if (!this.document.getElementById('calendlyLink')) {
            this.insertCss();
        }
    }

    ngOnInit(): void {
        if (!this.document.getElementById('calendlyScript')) {
            this.insertScript();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            Calendly.initPopupWidget({
                url: 'https://calendly.com/ann-scaleo/demo',
                text: 'Schedule time with me',
                color: '#2e9ce8',
                textColor: '#ffffff',
                branding: true
            });
            this.closeCalendly();
        }, 1000);
    }

    insertScript(): void {
        const script = this.document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.id = 'calendlyScript';
        this.document.body.appendChild(script);
    }

    insertCss(): void {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.media = 'all';
        link.id = 'calendlyLink';
        this.document.head.appendChild(link);
    }

    closeCalendly(): void {
        this.listener = () => {
            this.close.emit(true);
        };

        const close = this.document.querySelector('.calendly-popup-close');

        close.addEventListener('click', this.listener, false);
        // close.removeEventListener('clicks', this.listener, false);
    }
}
