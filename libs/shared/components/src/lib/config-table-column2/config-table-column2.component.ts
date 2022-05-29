import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { ProfileQuery } from '@scaleo/account/data-access';
import { Modal3CloseEventEnum, Modal3Ref, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { UiTable2CustomColumnTranslate } from '@scaleo/ui-kit/elements';

import { ConfigTableColumn2Service } from './config-table-column2.service';
import { ConfigTableColumn2RequiredService } from './config-table-column2-required.service';
import { ConfigTableColumn2Model, ConfigTableType } from './models/config-table-column2.model';
import { ConfigTableAlternativeTranslateService } from './services/config-table-alternative-translate.service';

@Component({
    selector: 'app-config-table-column2',
    templateUrl: './config-table-column2.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfigTableColumn2Service, ConfigTableColumn2RequiredService, ConfigTableAlternativeTranslateService]
})
export class ConfigTableColumn2Component implements OnInit, OnDestroy {
    @Input() set configs(configs: ConfigTableColumn2Model[]) {
        if (configs?.length > 0) {
            this._configTableColumn2Service.initCheckedColumn(configs);
            this._configs = configs;
        }
    }

    @Input() grid: 2 | 3 | 4 = 3;

    @Input() title: string;

    // @Input() requiredFields: string;

    @Input() icon = 'main_columns';

    @Input() confirmButtonLabel = 'shared.dictionary.save';

    @Input() showGroup = true;

    @Input() classNameForButton: string;

    @Input() configType: ConfigTableType;

    @Input() popupWrapperClassName: ConfigTableType;

    @Input() popupMinWidth: string;

    @Input() set groupTranslate(value: UiTable2CustomColumnTranslate) {
        if (value) {
            this._alternativeTranslateService.setGroupTranslate(value);
        }
    }

    @Input() set itemTranslate(value: UiTable2CustomColumnTranslate) {
        if (value) {
            this._alternativeTranslateService.setItemTranslate(value);
        }
    }

    @Input() set requiredFields(value: string[]) {
        if (value.length > 0) {
            this._configTableColumn2RequiredService.initRequiredColumns(value);
        }
    }

    // @Input() max: number;
    //
    // @Input() messageWhenMax: string;

    @Output() columnChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

    _configs: ConfigTableColumn2Model[] = [];

    configModalTableColumnClass = '';

    private _modalRef: Modal3Ref;

    @ViewChild('infoTemplate') infoTemplate: TemplateRef<HTMLElement>;

    @ViewChild('infoFooterTemplate') infoFooterTemplate: TemplateRef<HTMLElement>;

    @ViewChild('tableConfig', { static: true }) private _tableConfig: ElementRef;

    checkedColumn$ = this._configTableColumn2Service.checkedColumn$;

    constructor(
        private _eRef: ElementRef,
        private _modal3Service: Modal3Service,
        private _configTableColumn2Service: ConfigTableColumn2Service,
        private _configTableColumn2RequiredService: ConfigTableColumn2RequiredService,
        private _profileQuery: ProfileQuery,
        private _alternativeTranslateService: ConfigTableAlternativeTranslateService
    ) {}

    ngOnInit(): void {
        if (this.configType) {
            const configTable = `modal--config-table-${this.configType}`;
            const configTableRole = `${configTable}-${this._profileQuery.role.toLowerCase()}`;
            this.configModalTableColumnClass = ` ${configTable} ${configTableRole}`;
        }
    }

    ngOnDestroy(): void {
        this._configTableColumn2Service.clearCheckedColumn();
    }

    apply() {
        this._modalRef.close(null, Modal3CloseEventEnum.Cancel);
        this._configTableColumn2Service.saveNewCheckedColumns();
        this.columnChanged.emit(this._configTableColumn2Service.checkedColumns);
    }

    showInfo() {
        this._modalRef = this._modal3Service.info(this.infoTemplate, {
            title: this.title,
            minWidth: this.popupMinWidth,
            innerClassName: `modal--config ${this.popupWrapperClassName}`, //`modal--config ${this.configModalTableColumnClass}`,
            footer: {
                template: this.infoFooterTemplate
            }
        });
        this._configTableColumn2Service.setTempCheckedColumn();
    }

    cancel() {
        this._modalRef.close();
        this._configTableColumn2Service.restore();
    }
}
