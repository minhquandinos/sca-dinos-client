import { Injectable } from '@angular/core';

import { MultiSelectBlockFacade } from '../state/multi-select-block.facade';

@Injectable()
export class MultiSelectSelectedService {
    constructor(private readonly stateFacade: MultiSelectBlockFacade) {}

    select(item) {
        const { selected, tempSelected } = this.stateFacade.query.getValue();
        if (this.stateFacade.query.getValue().searching) {
            this.stateFacade.store.update({
                selected: [...selected, item],
                tempSelected: [...tempSelected, item]
            });
        } else {
            this.stateFacade.store.update({
                selected: [...selected, item]
            });
        }
    }

    deselect(item, itemValue: string) {
        const { selected, tempSelected } = this.stateFacade.query.getValue();
        const filtered = (elem) => elem[itemValue] !== item[itemValue];
        if (this.stateFacade.query.getValue().searching) {
            this.stateFacade.store.update({
                selected: selected.filter(filtered),
                tempSelected: tempSelected.filter(filtered)
            });
        } else {
            this.stateFacade.store.update({
                selected: this.stateFacade.query.getValue().selected.filter(filtered)
            });
        }
    }

    removeAll() {
        this.stateFacade.store.update({ selected: [] });
    }
}
