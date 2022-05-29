import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-skeleton-image',
    templateUrl: './ui-skeleton-image.component.html',
    styleUrls: ['./ui-skeleton-image.component.css']
})
export class UiSkeletonImageComponent {
    @Input() type: 'circle' | 'rounded' = 'circle';

    @Input() size: 'small' | 'medium' | 'big' | 'biggest' = 'medium';

    public get typeImageClass(): string {
        return this.type === 'rounded' ? 'rounded' : 'rounded-circle';
    }

    public get sizeImageClass(): string {
        let size = '';
        switch (this.size) {
            case 'small':
                break;
            case 'medium':
                size = 'skeleton__image--64';
                break;
            case 'big':
                size = 'skeleton__image--96';
                break;
            case 'biggest':
                size = 'skeleton__image--111';
                break;
            default:
                break;
        }

        return size;
    }
}
