import { ComponentRef, Directive, Host, Input, OnDestroy, OnInit, Optional, SkipSelf, Type, ViewContainerRef } from '@angular/core';
import { AsyncValidatorFn, ControlContainer, FormControl, FormControlName, NgControl, ValidatorFn } from '@angular/forms';

import { dynamicComponentLookupRegistry } from '@scaleo/core/decorators/common';
import {
    reportFilterComponents,
    ReportFilterFilterEnum,
    ReportFilterModel,
    ReportFiltersSelectedComponentModel
} from '@scaleo/reports/shared/filters/common';

@Directive({
    selector: '[appDynamicFieldDirective]'
})
export class DynamicFieldDirectiveDirective extends NgControl implements OnInit, OnDestroy {
    component: ComponentRef<any>;

    @Input() dynamicFormControlName: ReportFilterFilterEnum;

    @Input() selectedFilters: ReportFilterModel;

    private readonly componentsArray: ReportFiltersSelectedComponentModel[] = reportFilterComponents;

    _control: FormControl;

    @Input() formControlName: FormControlName;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private viewContainerRef: ViewContainerRef) {
        super();
    }

    ngOnInit(): void {
        this.createComponent();
    }

    private createComponent() {
        const currentComponent = this.getComponent;

        let componentRef: Type<any>;
        if (typeof currentComponent?.component === 'string') {
            componentRef = dynamicComponentLookupRegistry.get(currentComponent.component);
        }

        if (typeof currentComponent?.component === 'function') {
            componentRef = currentComponent.component;
        }

        if (componentRef) {
            this.component = this.viewContainerRef.createComponent(componentRef);

            const instanceKeys: string[] = Object.keys(currentComponent.instance);
            instanceKeys.forEach((key: string) => {
                if (key === 'keyForFormControl') {
                    if (currentComponent.instance[key] === 'formControlName') {
                        this.valueAccessor = this.component.instance;
                        this._control = this.formDirective.addControl(this);
                    }
                    this.component.instance[currentComponent.instance[key]] = this.selectedFilters.filter;
                } else {
                    this.component.instance[key] = currentComponent.instance[key];
                }
                this.component.changeDetectorRef.detectChanges();
            });
        }
    }

    private get getComponent(): ReportFiltersSelectedComponentModel {
        const { filter } = this.selectedFilters;
        return this.componentsArray.find((item: ReportFiltersSelectedComponentModel) => item.list.includes(filter));
    }

    get path(): string[] {
        return [...this.controlContainer.path, this.dynamicFormControlName];
    }

    get formDirective(): any {
        return this.controlContainer ? this.controlContainer.formDirective : null;
    }

    get control(): FormControl {
        return this._control;
    }

    get validator(): ValidatorFn | null {
        return null;
    }

    get asyncValidator(): AsyncValidatorFn {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    viewToModelUpdate(newValue: any): void {
        // this.update.emit(newValue);
    }

    ngOnDestroy(): void {
        if (this.formDirective) {
            this.formDirective.removeControl(this);
        }
        if (this.component) {
            this.component.destroy();
        }
    }
}
