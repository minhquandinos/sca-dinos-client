import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { PlatformSettingsQuery } from '@scaleo/platform/settings/access-data';
import { Modal3CloseEventEnum, Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTableHeaderInterface } from '@scaleo/ui-kit/elements';

import { ConfigTableType } from '../config-table-column2';
import { StatisticOutputParameterInterface } from './config-table-column.model';
import { ConfigTableColumnService } from './config-table-column.service';

@Component({
    selector: 'app-config-table-column',
    templateUrl: './config-table-column.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigTableColumnComponent implements OnDestroy, AfterViewInit {
    @Input() config: Observable<StatisticOutputParameterInterface[]>;

    @Input() grid: 2 | 3 | 4 = 3;

    // @Input() className = '';
    @Input() title: string;

    @Input() requiredFields: string;

    @Input() icon = 'main_columns';

    @Input() returnNewTableHeader: boolean;

    @Input() confirmButtonLabel = 'shared.dictionary.save';

    @Input() showGroup = true;

    @Input() classNameForButton: string;

    @Input() popupWrapperClassName: ConfigTableType;

    @Input() popupMinWidth: string;

    @Input() set configType(
        value: 'statistics' | 'clicks' | 'conversions' | 'dashboard-volume' | 'dashboard-finances' | 'logs' | 'logs-clicks'
    ) {
        if (value) {
            const configTable = `modal--config-table-${value}`;
            const configTableRole = `${configTable}-${this._profileQuery.role.toLowerCase()}`;
            this.configModalTableColumnClass = ` ${configTable} ${configTableRole}`;
        }
    }

    @Input() max: number;

    @Input() messageWhenMax: string;

    @Input() allowCheckAllItemsInGroup: boolean;

    @Input() set alternativeColumnsConfigTranslateKey(value: string) {
        if (value) {
            this.configTableColumnService.alternativeColumnsConfigTranslateKey = value;
        }
    }

    @Output() columnChanged: EventEmitter<void> = new EventEmitter<void>();

    configs: StatisticOutputParameterInterface[];

    configModalTableColumnClass = '';

    private _unsubscribe: Subject<void> = new Subject<void>();

    private _modal3Ref: Modal3Ref<any>;

    columnsTree$ = this.configTableColumnService.columnsTree.asObservable();

    @ViewChild('infoTemplate') infoTemplate: TemplateRef<HTMLElement>;

    @ViewChild('infoFooterTemplate') infoFooterTemplate: TemplateRef<HTMLElement>;

    @ViewChild('tableConfig', { static: true })
    private _tableConfig: ElementRef;

    constructor(
        public readonly configTableColumnService: ConfigTableColumnService,
        private _eRef: ElementRef,
        private _modal3Service: Modal3Service,
        private _profileQuery: ProfileQuery, // private cdr: ChangeDetectorRef
        private _platformSettingsQuery: PlatformSettingsQuery
    ) {}

    ngAfterViewInit(): void {
        this._configColumns();
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    apply() {
        this._emitNewTableHeader();
        this._modal3Ref.close(null, Modal3CloseEventEnum.Apply);
    }

    showInfo() {
        this._modal3Ref = this._modal3Service.info(this.infoTemplate, {
            title: this.title,
            // wrapperClassName: `modal--config ${this.configModalTableColumnClass}`,
            minWidth: this.popupMinWidth,
            innerClassName: `modal--config ${this.popupWrapperClassName}`,
            footer: {
                template: this.infoFooterTemplate
            }
        });
    }

    cancel() {
        this._modal3Ref.close(null, Modal3CloseEventEnum.Close);
        this.configTableColumnService.showMessageWhenMax.next(false);
    }

    countSelectedItem() {
        if (this.max > 0) {
            this.configTableColumnService.countSelectedItem(this.configs);
        }
    }

    setRequiredItem() {
        if (this.requiredFields) {
            const arr = this.requiredFields.split(',');
            this.configTableColumnService.columnsRequire.next(arr);
        }
    }

    private _emitNewTableHeader() {
        if (this.returnNewTableHeader) {
            this.configTableColumnService.columnsTree.next(this._convertConfigToHeaderWithChildrenColumn());
            // this.columnChanged.emit(this.convertConfigToHeaderWithChildrenColumn());
        } else {
            this.configTableColumnService.setColumns(this._convertConfigToHeaderString);
            // this.columnChanged.emit(this.convertConfigToHeaderString());
        }
        this.columnChanged.emit();
    }

    private _convertConfigToHeaderWithChildrenColumn(): UiTableHeaderInterface[] {
        return [...this.configs]
            .sort((c1, c2) => (c1.groupSort > c2.groupSort ? 1 : -1))
            .map((group) => ({
                value: group.key.toLowerCase(),
                children: group.items
                    .filter((column) => !!column?.selected)
                    .sort((c1, c2) => (c1.reportSort > c2.reportSort ? 1 : -1))
                    .map((child) => ({ value: child.key }))
            }))
            .filter((column) => column?.children.length > 0);
    }

    private get _convertConfigToHeaderString(): string {
        return []
            .concat(...this.configs.map((group) => [...group.items, ...[].concat(...group.items.map((child) => child?.children))]))
            .filter((column) => !!column?.selected)
            .sort((column1, column2) => (column1.reportSort > column2.reportSort ? 1 : -1))
            .map((column) => column.key)
            .join(',');
    }

    private _configColumns() {
        this.config
            .pipe(
                tap(() => {
                    if (this.returnNewTableHeader) {
                        this.configTableColumnService.columnsTree.next([]);
                    } else {
                        this.configTableColumnService.setColumns(undefined);
                    }
                }),
                map((configs) =>
                    configs.map((config) => ({
                        ...config,
                        keyForTooltip: this._setTooltipKey(config.key),
                        items: config.items.map((param) => {
                            const columnsSelected = this.configTableColumnService.columnsPayload;
                            const selected = columnsSelected ? columnsSelected.split(',').includes(param.key) : null;
                            const defaultSelected = !!param.default;
                            return {
                                ...param,
                                keyForTooltip: this._setTooltipKey(param.key),
                                selected: columnsSelected ? selected : defaultSelected,
                                children: param?.children?.map((child) => {
                                    const childSelect = columnsSelected.split(',').includes(child.key);
                                    return {
                                        ...child,
                                        childSelect
                                    };
                                })
                            };
                        })
                    }))
                ),
                takeUntil(this._unsubscribe)
            )
            .subscribe((configs) => {
                this.configs = configs;
                this.countSelectedItem();
                this.setRequiredItem();
                this._emitNewTableHeader();
            });
    }

    private _setTooltipKey(key: string): string {
        switch (key) {
            case 'total_conversions':
                return this._getTitleForTotalConversions;
            case 'cv_total':
                return this._getTitleForCvTotal;
            default:
                return key;
        }
    }

    private get _getTitleForCvTotal(): string {
        return this._platformSettingsQuery.settings.include_rejected_in_totals ? 'cv_total' : 'total_conversions_without_rejected';
    }

    private get _getTitleForTotalConversions(): string {
        return this._platformSettingsQuery.settings.include_rejected_in_totals
            ? 'total_conversions_include_rejected_in_totals'
            : 'total_conversions';
    }

    public checkAllItemsInGroup(column: StatisticOutputParameterInterface) {
        if (this.allowCheckAllItemsInGroup) {
            const allParamsIsCheck: boolean = column.items.every((param) => param.selected);
            column.items = column.items.map((param) => ({
                ...param,
                selected: !allParamsIsCheck
            }));
            this.countSelectedItem();
        }
    }
}
