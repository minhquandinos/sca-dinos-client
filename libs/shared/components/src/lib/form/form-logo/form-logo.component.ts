import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { PathFileService } from '@scaleo/shared/services/path-file';

@Component({
    selector: 'app-form-logo',
    templateUrl: './form-logo.component.html'
})
export class FormLogoComponent implements OnInit, OnChanges {
    @Input() editId: number | string;

    @Input() image: string;

    @Input() type: 'circle' | 'rounded' = 'circle';

    @Input() typeForImage: 'users' | 'offers' | 'affiliates' | 'advertisers' | 'announcements' | 'payments-methods' = 'users';

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() change: EventEmitter<string> = new EventEmitter<string>();

    @Output() delete: EventEmitter<boolean> = new EventEmitter<boolean>();

    public placeholderImage: string;

    // public logo: string = this.placeholderImage;
    public logoOld: string = null;

    public imageChangedEvent: any;

    public showImageChanges: boolean;

    public imageClass: string;

    constructor(private readonly pathFileService: PathFileService) {}

    ngOnInit(): void {
        if (this.type === 'circle') {
            this.imageClass = 'rounded-circle';
        } else if (this.type === 'rounded' && this.typeForImage !== 'offers') {
            this.imageClass = 'rounded';
        }
        this.placeholderImage = this.pathFileService.platformImage(null, this.typeForImage);
    }

    ngOnChanges(): void {
        this.image = this.image ? this.image : this.pathFileService.platformImage(null, this.typeForImage);
    }

    public deleteImage(): void {
        this.delete.emit(true);
    }

    public cancelCropped(): void {
        this.showImageChanges = false;
    }

    public imageWasCropped(event: any): void {
        this.image = event;
        this.showImageChanges = false;
        this.change.emit(event);
    }

    public changeImage(): void {
        this.showImageChanges = true;
    }
}
