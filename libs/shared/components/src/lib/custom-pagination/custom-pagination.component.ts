import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PageContentService } from '@scaleo/core/page-content/service';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';
import { PlatformListsFormatInterface } from '@scaleo/platform/list/access-data';

import { CustomPaginationModel } from './models/pagination-config.model';
import { CustomPaginationConfigService } from './services/custom-pagination-config.service';

@Component({
    selector: 'app-custom-pagination',
    templateUrl: './custom-pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CustomPaginationConfigService]
})
export class CustomPaginationComponent {
    @HostBinding('class') hostClass = 'd-block w-100';

    @Input() set pagination(value: ApiPaginationModel) {
        if (value) {
            this._pagination = value;
            this.perPageDefault = this._pagination.per_page;
            this.pager = this.getPager(this._pagination.current_page);
            this.totalCount = this._pagination.total_count;
            if (this.pager) {
                this.showPager = true;
                this.cdr.detectChanges();
            }
        }
        this.cdr.markForCheck();
    }

    @Input() pageInQueryParams: boolean;

    @Input() scrollToTopAfterPageChange = true;

    @Input() showPerPageDropdown = true;

    _pagination: ApiPaginationModel;

    pager: CustomPaginationModel;

    showPager: boolean;

    totalCount: number;

    public pageDefault = 1;

    public perPageDefault = 25;

    public perPagesList: PlatformListsFormatInterface[] = [
        { id: 1, title: '10' },
        { id: 2, title: '25' },
        { id: 3, title: '50' },
        { id: 4, title: '100' }
    ];

    @Output() toggle: EventEmitter<number> = new EventEmitter<number>();

    @Output() togglePerPage: EventEmitter<number> = new EventEmitter<number>();

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly pageContentService: PageContentService,
        private readonly customPaginationConfigService: CustomPaginationConfigService
    ) {}

    previousPage(page: number): void {
        if (this.pager.currentPage > 1) {
            this.setPage(page);
        }
    }

    nextPage(page: number): void {
        if (this.pager.currentPage !== this.pager.totalPages) {
            this.setPage(page);
        }
    }

    setPage(numberPage: number): void {
        this.toggle.emit(numberPage);
        this.pager = this.getPager(numberPage);

        if (this.pageInQueryParams) {
            const page = numberPage === 1 ? null : numberPage;
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    page
                },
                queryParamsHandling: 'merge'
            });
        }
        if (this.scrollToTopAfterPageChange) {
            this.pageContentService.nativeElement.scrollTo(0, 0);
        }
    }

    perPageWasChange(page: number): void {
        this.perPageDefault = page;
        this.togglePerPage.emit(page);
        this.pageContentService.nativeElement.scrollTo(0, 0);
    }

    private getPager(currentPage: number = 1): CustomPaginationModel {
        return this.customPaginationConfigService.setPager(this._pagination, currentPage);
    }
}
