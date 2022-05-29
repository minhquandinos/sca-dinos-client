import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { DetectedClientDeviceService } from '@scaleo/core/detected-clinet-device/service';

@Component({
    selector: 'app-custom-search',
    templateUrl: './custom-search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSearchComponent {
    @Input() placeholder: string;

    @Input() className: string;

    @Input() searchAction: 'enter' | 'always' = 'enter';

    @Output() toggleSearch: EventEmitter<string> = new EventEmitter<string>();

    public search: string;

    haveText: boolean;

    constructor(private readonly detectedClientDeviceService: DetectedClientDeviceService) {}

    @HostListener('input', ['$event.target.value'])
    onInput(value: string) {
        this.haveText = !!value;
    }

    public initFilterSearch(event: KeyboardEvent) {
        if ((this.searchAction === 'enter' && this.isEnterAction(event)) || this.searchAction === 'always') {
            this.toggleSearch.emit(this.search);
        }

        if (this.search?.length < 1) {
            this.toggleSearch.emit('');
        }
    }

    clear() {
        this.search = null;
        this.haveText = false;
        this.toggleSearch.emit('');
    }

    private isEnterAction(event: KeyboardEvent) {
        const { code, key } = event;
        const keyForCheck = this.detectedClientDeviceService.isNative ? key : code;
        return keyForCheck === 'Enter';
    }
}
