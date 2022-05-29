import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { FormatPipe } from '@scaleo/platform/format/pipe';
import { PLATFORM_PERMISSION_TOKEN, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { ReportEnum, ReportType, StatisticRowRelationModel } from '@scaleo/reports/common';
import { HyperlinkModel } from '@scaleo/shared/components';

// TODO add permission to default template
@Component({ template: '' })
export abstract class BaseReportFieldLinkRelation2Component implements OnInit {
    @Input() field: StatisticRowRelationModel;

    @Input() reportType: ReportType;

    @ViewChild('defaultTpl', { static: true }) defaultTpl: TemplateRef<any>;

    @ViewChild('defaultStatisticTpl', { static: true }) defaultStatisticTpl: TemplateRef<any>;

    renderTemplate: TemplateRef<any>;

    hyperlink: HyperlinkModel;

    parentHyperlink: HyperlinkModel;

    hyperlinkPermission: string;

    abstract linkLabel$: Observable<string>;

    parentLinkLabel$ = this.setLabel('table.column.offer');

    readonly defaultPermission: string;

    protected constructor(
        protected translate: TranslateService,
        @Inject(PLATFORM_PERMISSION_TOKEN) protected permissions: PlatformPermissionsType
    ) {
        this.defaultPermission = permissions.canAccessOffers;
    }

    ngOnInit(): void {
        this.setTemplate();
    }

    setTemplate() {
        if (this.field?.id) {
            if (this.reportType === ReportEnum.Statistics) {
                this.renderTemplate = this.defaultStatisticTpl;
            } else {
                this.renderTemplate = this.defaultTpl;
            }
        }
    }

    abstract get roleLink(): string;

    setHyperlink(link: string, parentLink: string, formatPipe: FormatPipe, canAccessOffers: boolean) {
        if (this.field?.id) {
            if (this.reportType === ReportEnum.Statistics) {
                this.parentHyperlink = {
                    link: parentLink,
                    title: formatPipe.transform(`${this.field.parent_id} ${this.field.parent_value as string}`, 'idName')
                };
                this.hyperlink = {
                    link,
                    title: formatPipe.transform(`${this.field.id} ${this.field.value as string}`, 'idName')
                };
            } else {
                if (canAccessOffers) {
                    this.hyperlink = {
                        link,
                        title: formatPipe.transform(`${this.field.id} ${this.field.value as string}`, 'idName')
                    };
                }

                if (!canAccessOffers) {
                    this.parentHyperlink = {
                        link: parentLink,
                        title: formatPipe.transform(`${this.field.parent_id} ${this.field.parent_value as string}`, 'idName')
                    };
                    this.hyperlink = {
                        link,
                        title: formatPipe.transform(`${this.field.id} ${this.field.value as string}`, 'idName')
                    };
                }
            }
        }
    }

    protected setLabel(schema: string): Observable<string> {
        return this.translate.stream(schema);
    }
}
