import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    HostListener,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@scaleo/core/classes';
import { AcceptFileExtensionType, FILE_EXTENSION_MIME, FileExtensionEnum, FileExtensionType, FileGroupEnum } from '@scaleo/platform/data';
import { ButtonType } from '@scaleo/ui-kit/elements';

import { acceptMimesUtil } from './utils/file-accept-mime.util';

@Component({
    selector: 'app-custom-file-upload',
    templateUrl: './custom-file-upload.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef((): any => CustomFileUploadComponent),
            multi: true
        }
    ]
})
export class CustomFileUploadComponent extends BaseControlValueAccessor<any> implements OnInit {
    @Input() formControlName: string;

    @Input() labelButton: string;

    @Input() placeholder: string;

    @Input() label: string;

    @Input() typeButton: ButtonType = 'floating';

    @Input() set accept(value: AcceptFileExtensionType) {
        if (value) {
            this._acceptFileFormat = acceptMimesUtil(value);
        }
    }

    @Input() validatorFileExtension: FileExtensionType | FileExtensionType[];

    @Input() hideSelectedFile = false;

    @ViewChild('inputRef', { static: true }) inputRef: ElementRef;

    @Output() selectedFile: EventEmitter<string | ArrayBuffer | File> = new EventEmitter<string | ArrayBuffer | File>();

    @Output() invalidSelectedFile: EventEmitter<boolean> = new EventEmitter<boolean>();

    fileName: string;

    _acceptFileFormat: string = FILE_EXTENSION_MIME[FileGroupEnum.All];

    public control: AbstractControl;

    public required: boolean;

    private static truncateFileName(name: string, extension: string) {
        if (name.length > 50) {
            return `${name.slice(0, 40)}....${extension}`;
        }

        return name;
    }

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file: File = event && event.item(0);
        if (file) {
            this.onChange(file);
            const fileExtension = file.name.split('.').pop();
            this.fileName = CustomFileUploadComponent.truncateFileName(file.name, fileExtension);
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                if (this.validatorFileExtension && !this.validatorFileExtension.includes(fileExtension as FileExtensionEnum)) {
                    this.invalidSelectedFile.emit(true);
                    return;
                }
                if ([FileExtensionEnum.ZIP, FileExtensionEnum.CSV].includes(fileExtension as FileExtensionEnum)) {
                    this.selectedFile.emit(file);
                } else {
                    this.selectedFile.emit(reader.result);
                }
            };
        }
    }

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
        super();
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);

                if (this.control.validator) {
                    const validator = this.control.validator({} as AbstractControl);
                    if (this.control && validator && validator.required) {
                        this.required = true;
                    }
                }
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    writeValue(value: null) {
        // clear file input
        this.inputRef.nativeElement.value = '';
    }
}
