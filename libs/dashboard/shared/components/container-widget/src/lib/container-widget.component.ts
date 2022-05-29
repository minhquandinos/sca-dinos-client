import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { DashboardConfigService } from '@scaleo/dashboard/service';
import { UiPageWrapperComponent, UiPageWrapperFooterComponent } from '@scaleo/ui-kit/elements';

// TODO change UiPageWrapperModule to CardModule after complete CardModule and merge SCL-842
@Component({
    selector: 'app-container-widget',
    template: `
        <div class="custom-dashboard-widget">
            <ui-page-wrapper [borderRadius]="4" className="custom-dashboard-widget__wrapper" #uiPageWrapperComponent>
                <div class="custom-dashboard-widget__edit-bg" *ngIf="isEdit$ | async"></div>
                <ui-page-wrapper-header className="custom-dashboard-widget__header">
                    <div class="d-flex justify-content-center w-100">
                        <div class="d-flex my-auto h-100">
                            <ng-container *ngIf="headerLeftSideTemplate; else defaultHeaderLeftSideTemplate">
                                <ng-container *ngTemplateOutlet="headerLeftSideTemplate"></ng-container>
                            </ng-container>
                            <ng-template #defaultHeaderLeftSideTemplate>
                                <div class="custom-dashboard-widget__title title" [ngClass]="{ 'position-relative': isEdit$ | async }">
                                    {{ title }}
                                </div>
                            </ng-template>
                            <div class="d-flex">
                                <div class="ml-2">
                                    <ng-template #widgetSettingsContainer></ng-template>
                                </div>
                                <div class="ml-2">
                                    <ng-template #widgetActionContainer></ng-template>
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto my-auto">
                            <div *ngIf="(isEdit$ | async) && activeWidget" class="position-relative">
                                <ui-svg-icon icon="move2"></ui-svg-icon>
                            </div>
                            <div [hidden]="isEdit$ | async">
                                <ng-template #widgetRightSideContainer></ng-template>
                            </div>
                        </div>
                    </div>
                </ui-page-wrapper-header>
                <ng-content select="[containerHeaderContent]"></ng-content>
                <ui-page-wrapper-content className="custom-dashboard-widget__content p-0" [ngClass]="className">
                    <ng-content></ng-content>
                </ui-page-wrapper-content>
                <ui-page-wrapper-footer *ngIf="showFooter" className="custom-dashboard-widget__footer" #uiPageWrapperFooterComponent>
                    <ng-content select="[containerFooter]"></ng-content>
                </ui-page-wrapper-footer>
            </ui-page-wrapper>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default
})
export class ContainerWidgetComponent implements OnInit, AfterViewInit {
    @HostBinding('class') hostClass = 'd-block h-100';

    @Input() title: string;

    @Input() activeWidget: boolean;

    @Input() className: string;

    @Input() headerLeftSideTemplate: TemplateRef<any>;

    // @Input() borderTopFooter: boolean;

    isEdit$ = this.dashboardConfigService.isEdit$;

    @ViewChild('widgetSettingsContainer', { read: ViewContainerRef }) widgetSettings: ViewContainerRef;

    @ViewChild('widgetActionContainer', { read: ViewContainerRef }) widgetAction: ViewContainerRef;

    @ViewChild('widgetRightSideContainer', { read: ViewContainerRef }) widgetRightSide: ViewContainerRef;

    @ViewChild(UiPageWrapperComponent)
    pageWrapperComponent: UiPageWrapperComponent;

    @ViewChild(UiPageWrapperFooterComponent)
    uiPageWrapperFooterComponent: UiPageWrapperFooterComponent;

    public showFooter = true;

    constructor(private renderer2: Renderer2, private dashboardConfigService: DashboardConfigService) {}

    ngOnInit(): void {
        if (this.pageWrapperComponent) {
            // console.log('ngOnInit', this.pageWrapperComponent);
            // const el = this.pageWrapperComponent.pageRef.nativeElement;
            // if (el && this.className) {
            //     this.renderer2.addClass(el, this.className);
            // }
        }
    }

    public ngAfterViewInit(): void {
        this.showFooter = Boolean(this.uiPageWrapperFooterComponent?.footerRef.nativeElement.firstElementChild);
    }
}
