export abstract class BasePagination {
    abstract updatePage(page: number): void;

    abstract updatePerPage(perPage: number): void;
}
