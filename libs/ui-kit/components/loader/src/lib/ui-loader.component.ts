import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'scaleo-ui-loader',
    template: ``,
    styleUrls: ['./ui-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiLoaderComponent {
    @HostBinding('class') hostClass = 'ui-loader';

    @Input() set sizeInPx(value: number) {
        if (value) {
            this.hostStyle['--ui-loader-size'] = `${value}px`;
        }
    }

    @HostBinding('style')
    private hostStyle = {
        '--ui-loader-size': `12px`
    };
}
