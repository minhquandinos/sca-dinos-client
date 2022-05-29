import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-link-to-beacon',
    template: `
        <a class="color__main-link cursor-pointer" #linkRef>
            {{ 'interface.basic.learn_more' | translate }}
        </a>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkToBeaconComponent implements OnInit {
    @Input() beaconId: string;

    @ViewChild('linkRef', { static: true })
    private readonly linkRef: ElementRef;

    constructor(private readonly renderer: Renderer2) {}

    ngOnInit(): void {
        this.setBeaconData();
    }

    private setBeaconData() {
        this.renderer.setAttribute(this.linkRef.nativeElement, 'data-beacon-article-sidebar', this.beaconId);
    }
}
