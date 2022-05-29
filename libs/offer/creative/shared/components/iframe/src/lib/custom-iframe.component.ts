import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { QuotesEnum } from './quotes.enum';

@Component({
    selector: 'app-custom-iframe',
    templateUrl: './custom-iframe.component.html',
    styles: [
        `
            div {
                all: initial;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom
})
export class CustomIframeComponent implements OnInit {
    @Input() htmlCode: string;

    @ViewChild('container', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

    ngOnInit(): void {
        this.viewContainerRef.element.nativeElement.innerHTML = this.convertQuotesToDoubleQuoteInString;
    }

    private get convertQuotesToDoubleQuoteInString(): string {
        const unicodes = [
            QuotesEnum.RightDoubleMark,
            QuotesEnum.LeftDoubleMark,
            QuotesEnum.LeftSingleMark,
            QuotesEnum.RightSingleMark,
            QuotesEnum.Apostrophe
        ].join();

        const unicodesRexExp = new RegExp(`[${unicodes}]`, 'g');
        return this.htmlCode.replace(unicodesRexExp, '"');
    }
}
