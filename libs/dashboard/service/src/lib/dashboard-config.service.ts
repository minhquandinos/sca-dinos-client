import { Injectable } from '@angular/core';
import { CompactType, DisplayGrid, GridsterConfig, GridType } from 'angular-gridster2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DashboardConfigService {
    isEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    options$: BehaviorSubject<GridsterConfig> = new BehaviorSubject<GridsterConfig>({
        gridType: GridType.VerticalFixed,
        displayGrid: DisplayGrid.None,
        compactType: CompactType.CompactUp,
        pushItems: true,
        pushResizeItems: true,
        swap: true,
        // pushDirections: { north: true, east: true, south: true, west: true },
        margin: 16,
        disableAutoPositionOnConflict: true,
        disableWarnings: true,
        setGridSize: true,
        outerMargin: false,
        outerMarginTop: null,
        outerMarginRight: null,
        outerMarginBottom: null,
        outerMarginLeft: null,
        ignoreMarginInRow: false,
        scrollSensitivity: 10,
        scrollSpeed: 20,
        enableEmptyCellClick: false,
        enableEmptyCellContextMenu: false,
        // scrollToNewItems: true,
        // disablePushOnDrag: false,
        draggable: {
            enabled: false
            // dropOverItems: true
        },
        resizable: {
            enabled: false
        },
        // minCols: 4,
        // maxCols: 4,
        // minRows: 1,
        // maxRows: 100,
        // maxItemCols: 4,
        // minItemCols: 1,
        // maxItemRows: 100,
        // minItemRows: 1,
        // maxItemArea: 2500,
        minItemArea: 1,
        // defaultItemCols: 1,
        // defaultItemRows: 1,
        // fixedRowHeight: 300,
        keepFixedHeightInMobile: true,
        keepFixedWidthInMobile: false,
        // fixedColWidth: 100,
        fixedRowHeight: 228,

        minCols: 12, // 6
        maxCols: 12 // 6
    });

    optionsInactive$: BehaviorSubject<GridsterConfig> = new BehaviorSubject<GridsterConfig>({
        ...this.options$.value,
        draggable: {
            enabled: false
        },
        resizable: {
            enabled: false
        }
    });

    get isEdit(): boolean {
        return this.isEdit$.value;
    }

    edit(edit: boolean) {
        this.isEdit$.next(edit);
        this.options$.next({
            ...this.options$.value,
            draggable: {
                enabled: edit
            },
            resizable: {
                enabled: edit
            }
        });
    }

    draggableResizableActivated(activated: boolean) {
        this.options$.next({
            ...this.options$.value,
            draggable: {
                enabled: activated
            },
            resizable: {
                enabled: activated
            }
        });
    }
}
