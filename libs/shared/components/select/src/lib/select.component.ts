import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { CompareWithFn } from '@ng-select/ng-select/lib/ng-select.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { WindowRefService } from '@scaleo/core/window-ref/service';
import { Util } from '@scaleo/utils';

import { selectThemeClassName } from './consts/select-theme.const';
import { SelectChangeModel } from './models/select.model';
import { SelectThemeType } from './types/select.type';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select-default.scss', './select-clear-theme.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            useExisting: forwardRef((): any => SelectComponent),
            multi: true
        }
    ]
})
export class SelectComponent extends BaseControlValueAccessor<any> implements OnInit, OnDestroy {
    @Input() formControlName: string;

    @Input() set items(value: any[]) {
        if (value) {
            this._items = value;
            if (!this.itemIsLoadSubject$.value) {
                this.itemIsLoadSubject$.next(true);
            }
        } else {
            this._items = [];
        }
    }

    @Input() itemLabel: string = null;

    @Input() itemValue: string = undefined;

    @Input() placeholder: string = null;

    @Input() label: string = null;

    @Input() labelShowId: boolean;

    @Input() searchable: boolean;

    @Input() clearable: boolean;

    @Input() multiple: boolean;

    @Input() hideSelected: boolean;

    @Input() loading: boolean;

    @Input() classNames = '';

    @Input() searchFn: any;

    @Input() compareWith: CompareWithFn;

    @Input() addTemplate: boolean;

    @Input() size: 'small' | 'base' | 'medium' | 'big' = 'base';

    @Input() positionLabelRequired: 'left' | 'right' = 'right';

    @Input() hideDropdownArrow: boolean;

    @Input() set disableSelect(disabled: boolean) {
        this.disabled = disabled;
    }

    @Input() theme: SelectThemeType;

    @Input() appendTo: 'body' | string;

    @Output() initialSelected: EventEmitter<any | any[]> = new EventEmitter<any | any[]>();

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() change: EventEmitter<SelectChangeModel> = new EventEmitter<SelectChangeModel>();

    @Output() changeFull: EventEmitter<any> = new EventEmitter<any>();

    @Output() multiAdd: EventEmitter<any> = new EventEmitter<any>();

    @Output() multiRemove: EventEmitter<any> = new EventEmitter<any>();

    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    @Output() scrolledToEnd: EventEmitter<void> = new EventEmitter<void>();

    _items: any[] = [];

    private itemIsLoadSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public disabled = false;

    public control: AbstractControl;

    public required: boolean;

    themeClass = '';

    private unsubscribe: Subject<void> = new Subject<void>();

    @ContentChild('labelTmp') labelTemplate: TemplateRef<any>;

    @ContentChild('optionTmp') optionTemplate: TemplateRef<any>;

    @ViewChild('selectRef', { static: true }) selectRef: ElementRef;

    @ViewChild(NgSelectComponent) set selectComponent(component: NgSelectComponent) {
        if (component) {
            this._selectComponentRef = component;
            if (this.compareWith) {
                component.compareWith = this.compareWith;
            }
        }
    }

    private _selectComponentRef: NgSelectComponent;

    constructor(
        private renderer2: Renderer2,
        @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer,
        private readonly windowRefService: WindowRefService
    ) {
        super();
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);

                if (this.control) {
                    if (this.control.validator) {
                        const validator = this.control.validator({} as AbstractControl);
                        if (this.control && validator && validator.required) {
                            this.required = true;
                        }
                    }
                    if (this.control.disabled) {
                        this.disabled = true;
                    }
                }
            }
        }
        this.getInitialSelected();
        this.initSelectTheme();

        if (this.appendTo === 'body') {
            this.windowRefService.nativeWindow.addEventListener('scroll', this.onScroll, true);
        }
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
        if (this.appendTo === 'body') {
            this.windowRefService.nativeWindow.removeEventListener('scroll', this.onScroll, true);
        }
    }

    writeValue(value: any) {
        this.value = value;
    }

    changed(event: any) {
        let newValue;
        if (event instanceof Array) {
            newValue = this.itemValue ? event.map((obj) => obj[this.itemValue]) : event;
        } else if (event && this.itemValue) {
            newValue = event[this.itemValue];
        } else {
            newValue = event || '';
        }

        const oldValue = Util.cloneDeep(this.control?.value) || null;

        this.onChange(newValue);
        this.change.emit({ newValue, oldValue });
        this.changeFull.emit(event);
    }

    onMultiAdd(event: any) {
        this.multiAdd.emit(event);
    }

    onMultiRemove(event: any) {
        this.multiRemove.emit(event);
    }

    onClear() {
        this.clear.emit();
    }

    searching(event: any) {
        this.search.emit(event.term);
    }

    changeFormControl(formControlName: string) {
        this.formControlName = formControlName;
        this.control = this.controlContainer.control.get(this.formControlName);
        this.writeValue(this.control.value);
        this.registerOnChange((newValue: any) => {
            this.control.setValue(newValue, { emitModelToViewChange: false });
        });

        this.control.updateValueAndValidity();
    }

    scrollToEnd() {
        this.scrolledToEnd.emit();
    }

    initSelectTheme(): void {
        const themeClassName = selectThemeClassName[this.theme];
        this.themeClass = themeClassName || '';
    }

    private getInitialSelected() {
        this.itemIsLoadSubject$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
            if (this.itemValue) {
                if (Array.isArray(this.value)) {
                    const selectedItems = this._items.filter((item) =>
                        this.value
                            .map((elem: any) => {
                                if (!Number.isNaN(+elem) && typeof +elem === 'number') {
                                    return +elem;
                                }
                                return elem;
                            })
                            .includes(item[this.itemValue])
                    );
                    this.initialSelected.emit(selectedItems);
                }

                if (typeof this.value === 'number' || typeof this.value === 'string') {
                    // eslint-disable-next-line eqeqeq
                    const selectedItem = this._items?.find((item) => item[this.itemValue] == this.value);
                    this.initialSelected.emit(selectedItem);
                }
            }
        });
    }

    private onScroll = (event: any) => {
        if (this.appendTo === 'body' && this._selectComponentRef && this._selectComponentRef.isOpen) {
            const isScrollingInScrollHost = (event.target.className as string).indexOf('ng-dropdown-panel-items') > -1;
            if (isScrollingInScrollHost) {
                return;
            }
            this._selectComponentRef.close();
        }
    };
}
