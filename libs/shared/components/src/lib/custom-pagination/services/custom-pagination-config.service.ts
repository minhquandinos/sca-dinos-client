import { Injectable } from '@angular/core';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { ApiPaginationModel } from '@scaleo/core/rest-api/service';

import { defaultPaginationConfig } from '../configs/default-pagination.config';
import { mobilePaginationConfig } from '../configs/mobile-pagination.config';
import { CustomPaginationModel, PaginationConfigModel } from '../models/pagination-config.model';

@Injectable()
export class CustomPaginationConfigService {
    private readonly isMobile = this.mediaWatcherService.isMobile;

    constructor(private readonly mediaWatcherService: MediaWatcherService) {}

    setPager(pagination: ApiPaginationModel, currentPage: number = 1): CustomPaginationModel {
        const { per_page, total_count } = pagination;
        const totalPages = Math.ceil(total_count / per_page);

        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const { startPage, endPage } = this.setStartEndPage(totalPages, currentPage);
        const pages = this.setPages(startPage, endPage);
        const startIndex = (currentPage - 1) * per_page;
        const endIndex = Math.min(startIndex + per_page - 1, total_count - 1);

        return {
            currentPage,
            pageSize: per_page,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    private setStartEndPage(totalPages: number, currentPage: number): { startPage: number; endPage: number } {
        const { limitTotalPages, middlePageOfThePaginator, endPageAfterGoingMiddlePage, startPageAfterGoingMiddlePage } =
            this.setPaginationConfig(currentPage);
        let startPage = 1;
        let endPage: number;

        if (totalPages <= limitTotalPages) {
            endPage = totalPages;
        } else if (currentPage <= middlePageOfThePaginator) {
            endPage = limitTotalPages;
        } else if (endPageAfterGoingMiddlePage >= totalPages) {
            startPage = totalPages - (limitTotalPages - 1);
            endPage = totalPages;
        } else {
            startPage = startPageAfterGoingMiddlePage;
            endPage = endPageAfterGoingMiddlePage;
        }
        return {
            startPage,
            endPage
        };
    }

    private setPaginationConfig(
        currentPage: number
    ): Required<Omit<PaginationConfigModel, 'pagesAfterGoingMiddlePageToEnd' | 'pagesAfterGoingMiddlePageToStart'>> {
        const { pagesAfterGoingMiddlePageToEnd, pagesAfterGoingMiddlePageToStart, ...config } = this.prePaginationConfigFactory;
        return {
            ...config,
            startPageAfterGoingMiddlePage: currentPage - pagesAfterGoingMiddlePageToStart,
            endPageAfterGoingMiddlePage: currentPage + pagesAfterGoingMiddlePageToEnd
        };
    }

    private get prePaginationConfigFactory(): PaginationConfigModel {
        return this.isMobile ? mobilePaginationConfig : defaultPaginationConfig;
    }

    private setPages(startPage: number, endPage: number): number[] {
        return Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    }
}
