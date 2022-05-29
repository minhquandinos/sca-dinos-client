export interface PaginationConfigModel {
    limitTotalPages: number;
    middlePageOfThePaginator: number;
    pagesAfterGoingMiddlePageToStart: number;
    pagesAfterGoingMiddlePageToEnd: number;
    startPageAfterGoingMiddlePage?: number;
    endPageAfterGoingMiddlePage?: number;
}

export interface CustomPaginationModel {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
}
