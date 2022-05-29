import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

import { UiPageWrapperFooterBorderTopEnum, UiPageWrapperFooterSizeType, UiPageWrapperHeaderSizeType } from '../ui-page-wrapper/index';

@Component({
    selector: 'app-card',
    template: `
        <ui-page-wrapper borderRadius="4" [className]="wrapperClassName">
            <ui-page-wrapper-header
                #headerComponentRef
                [haveBorderBottom]="headerDivider"
                [className]="headerClassName"
                [size]="headerSize"
            >
                <ng-content select="[cardHeader]"></ng-content>
            </ui-page-wrapper-header>

            <ui-page-wrapper-content #contentComponentRef [className]="contentClassName">
                <ng-content></ng-content>
            </ui-page-wrapper-content>

            <ui-page-wrapper-footer [borderTop]="footerDivider" [size]="footerSize" [className]="footerClassName">
                <ng-content select="[cardFooter]"></ng-content>
            </ui-page-wrapper-footer>
        </ui-page-wrapper>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
    @HostBinding('class')
    @Input()
    headerClassName: string;

    @Input() contentClassName = 'p-20';

    @Input() headerDivider = false;

    @Input() footerDivider: keyof Record<UiPageWrapperFooterBorderTopEnum, string>;

    @Input() headerSize: UiPageWrapperHeaderSizeType = 'medium';

    @Input() footerSize: UiPageWrapperFooterSizeType = 'small';

    @Input() footerClassName = '';

    @Input() set widthSize(widthSize: 'full' | 'half') {
        this.wrapperClassName = widthSize === 'half' ? 'page-wrapper--size-half' : '';
    }

    wrapperClassName = '';
}
