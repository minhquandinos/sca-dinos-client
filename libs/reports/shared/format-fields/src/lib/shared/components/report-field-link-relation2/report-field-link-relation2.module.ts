import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlatformFormatPipeModule } from '@scaleo/platform/format/pipe';
import { HyperlinkModule } from '@scaleo/shared/components';

import { ReportFieldLinkRelation2CreativeComponent } from './components/report-field-link-relation2-creative/report-field-link-relation2-creative.component';
import { ReportFieldLinkRelation2GoalComponent } from './components/report-field-link-relation2-goal/report-field-link-relation2-goal.component';
import { ReportFieldLinkRelation2LinkComponent } from './components/report-field-link-relation2-link/report-field-link-relation2-link.component';
import { ReportFieldLinkRelation2Component } from './containers/report-field-link-relation2/report-field-link-relation2.component';

@NgModule({
    declarations: [
        ReportFieldLinkRelation2Component,
        ReportFieldLinkRelation2LinkComponent,
        ReportFieldLinkRelation2CreativeComponent,
        ReportFieldLinkRelation2GoalComponent
    ],
    imports: [CommonModule, HyperlinkModule, PlatformFormatPipeModule]
})
export class ReportFieldLinkRelation2Module {}
