import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';

import { DetectedClientDeviceService } from '@scaleo/core/detected-clinet-device/service';
import { MediaWatcherService } from '@scaleo/core/media-watcher/service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit {
    @HostBinding('class')
    hostClass = 'filter';

    @Input() set resultTemplate(template: TemplateRef<any>) {
        if (this._resultContainerRef) {
            this._resultContainerRef.clear();
            this._resultContainerRef.createEmbeddedView(template || this.defaultResultTemplate);
            this.cdr.markForCheck();
        }
    }

    @ViewChild('resultContainerRef', { read: ViewContainerRef }) set resultContainerRef(container: ViewContainerRef) {
        if (container) {
            this._resultContainerRef = container;
            this._resultContainerRef.clear();
            this._resultContainerRef.createEmbeddedView(this.defaultResultTemplate);
            this.cdr.detectChanges();
        }
    }

    constructor(
        private readonly detectedClientDeviceService: DetectedClientDeviceService,
        private readonly cdr: ChangeDetectorRef,
        private readonly mediaWatcherService: MediaWatcherService
    ) {}

    @Input() results: number;

    @Input() title: string;

    @Input() className = '';

    @Input() selectedItems = false;

    @Input() haveNotFilter = false;

    @Output() hideFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild('selectedFilter') selectedFilter: ElementRef;

    @ViewChild('defaultResultTemplate', { static: true }) defaultResultTemplate: TemplateRef<any>;

    private _resultContainerRef: ViewContainerRef;

    @ViewChild('filtersRef', { static: true }) private filtersRef: ElementRef;

    public readonly isMobileDevice$: Observable<boolean> = this.mediaWatcherService.isMobile$;

    showFilters = true;

    @HostListener('window:resize', [])
    private onResize() {
        if (!this.detectedClientDeviceService.isNative) {
            this.detectScreenSize();
        }
    }

    ngOnInit(): void {
        this.detectScreenSize();
        // this.hideFilter.emit(this.showFilters);
    }

    private detectScreenSize() {
        this.showFilters = !this.mediaWatcherService.isMobile;
    }

    displayFilters() {
        this.showFilters = !this.showFilters;
        this.hideFilter.emit(this.showFilters);
    }
}
