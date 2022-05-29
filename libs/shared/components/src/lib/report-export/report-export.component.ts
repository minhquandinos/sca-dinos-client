import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { MediaWatcherService } from '@scaleo/core/media-watcher/service';
import { SheetExtensionType } from '@scaleo/platform/data';
import { ButtonType, DropdownEntityMenuComponent, DropdownEntityMenuModel } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-report-export',
    template: `
        <ui-dropdown-entity-menu
            [label]="'interface.export_file.title' | translate"
            [menu]="menu"
            [buttonType]="buttonType"
            [buttonIcon]="buttonIcon"
            [rightDropdownMenu]="isNotMobile$ | async"
        ></ui-dropdown-entity-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportExportComponent {
    @Output() exportFormat: EventEmitter<SheetExtensionType> = new EventEmitter<SheetExtensionType>();

    @Input() buttonType: ButtonType = 'simple';

    @Input() buttonIcon = 'ic_export';

    public readonly isNotMobile$: Observable<boolean> = this.mediaWatcherService.isNotMobile$;

    @ViewChild(DropdownEntityMenuComponent, { static: true }) entityMenuComponent: DropdownEntityMenuComponent;

    readonly menu: DropdownEntityMenuModel[] = [
        {
            title: this.translate.stream('interface.export_file.csv'),
            action: (): void => this.exportData('csv')
        },
        {
            title: this.translate.stream('interface.export_file.xlsx'),
            action: (): void => this.exportData('xlsx')
        }
    ];

    constructor(private translate: TranslateService, private mediaWatcherService: MediaWatcherService) {}

    exportData(format: SheetExtensionType): void {
        this.exportFormat.emit(format);
        this.start();
    }

    private start(): void {
        this.entityMenuComponent.buttonLinkComponent.isLoad = false;
        this.entityMenuComponent.buttonLinkComponent.disabled = true;
        this.entityMenuComponent.markForCheck();
    }

    complete(): void {
        this.entityMenuComponent.buttonLinkComponent.isLoad = true;
        this.entityMenuComponent.buttonLinkComponent.disabled = false;
        this.entityMenuComponent.markForCheck();
    }
}
