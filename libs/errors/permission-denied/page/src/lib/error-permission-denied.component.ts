import { ChangeDetectionStrategy, Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';

@Component({
    selector: 'app-not-found',
    templateUrl: './error-permission-denied.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPermissionDeniedComponent implements OnInit {
    constructor(@Optional() private pageTitleService: PageTitleService, private router: Router) {}

    ngOnInit(): void {
        this.initBreadcrumb();
    }

    private initBreadcrumb(): void {
        if (this.pageTitleService) {
            const breadcrumb: BreadcrumbInterface[] = [
                {
                    key: 'interface.basic.page_not_found.title',
                    link: undefined,
                    current: true
                }
            ];
            this.pageTitleService.setTitle(breadcrumb);
        }
    }

    homePage() {
        const link = `/`;

        this.router.navigate([link]);
    }
}
