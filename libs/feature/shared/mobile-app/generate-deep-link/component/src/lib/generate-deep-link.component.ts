import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DetectedClientDeviceEnum } from '@scaleo/core/detected-clinet-device/service';
import { GENERATE_DEEP_LINK_PROVIDER, GenerateDeepLinkService } from '@scaleo/feature/shared/mobile-app/generate-deep-link/data-access';

@Component({
    selector: 'scaleo-feature-shared-generate-deep-link',
    templateUrl: './generate-deep-link.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GENERATE_DEEP_LINK_PROVIDER]
})
export class GenerateDeepLinkComponent implements OnInit {
    link$: Observable<string>;

    readonly availableOses: DetectedClientDeviceEnum[] = [DetectedClientDeviceEnum.IOS, DetectedClientDeviceEnum.Android];

    constructor(private readonly service: GenerateDeepLinkService) {}

    ngOnInit(): void {
        this.link$ = this.service.getMobileLoginLink$();
    }
}
