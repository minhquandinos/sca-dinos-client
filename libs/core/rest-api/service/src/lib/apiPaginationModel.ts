export interface ApiPaginationModel {
    current_page: number;
    page_count: number;
    per_page: number;
    total_count: number;
}

export class ApiResponseWithPagination<T> {
    pagination: ApiPaginationModel;

    results: Array<T> | any;
}
