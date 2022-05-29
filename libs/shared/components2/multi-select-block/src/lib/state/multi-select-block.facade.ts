import { Injectable } from '@angular/core';

import { MultiSelectBlock2Query, MultiSelectBlock2Store, MultiSelectBlockState } from './multi-select-block.state';

@Injectable()
export class MultiSelectBlockFacade {
    constructor(private readonly storeService: MultiSelectBlock2Store, private readonly queryService: MultiSelectBlock2Query) {}

    get value(): MultiSelectBlockState {
        return this.queryService.getValue();
    }

    get query() {
        return this.queryService;
    }

    get store() {
        return this.storeService;
    }

    destroy(): void {
        this.storeService.destroy();
    }
}
