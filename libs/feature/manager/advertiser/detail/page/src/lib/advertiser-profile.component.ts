import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, startWith, Subject, switchMap, take, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthAsService } from '@scaleo/auth/as/service';
import { NAVIGATION_PATH_TOKEN } from '@scaleo/core/navigation/common';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { AdvertiserDetailService } from '@scaleo/feature/manager/advertiser/detail/data-access';
import { AdvertiserCreateComponent } from '@scaleo/feature/manager/advertiser/upsert/component';
import { AdvertiserModel } from '@scaleo/feature/manager/advertiser/upsert/data-access';
import { ManagerPathResolverType } from '@scaleo/feature/manager/core/navigation';
import { DateFormatService } from '@scaleo/platform/format/service';
import { BaseStatusIdEnum } from '@scaleo/platform/list/access-data';
import { PLATFORM_PERMISSION_TOKEN, PLATFORM_PERMISSIONS, PlatformPermissionsType } from '@scaleo/platform/permission/role';
import { NavigateRootService } from '@scaleo/shared/components';
import { BreadcrumbInterface } from '@scaleo/shared/data';
import { PageTitleService } from '@scaleo/shared/services/page-title';
import { PathFileService } from '@scaleo/shared/services/path-file';
import { Modal3CloseEventEnum, Modal3Service } from '@scaleo/ui-kit/components/modal3';
import { ToastrBarService } from '@scaleo/ui-kit/elements';

@Component({
    selector: 'app-advertiser-profile',
    templateUrl: './advertiser-profile.component.html',
    styleUrls: ['./advertiser-profile.component.css'],
    providers: [UnsubscribeService, { provide: 'CUSTOM_FIELDS_CONFIG', useValue: 'adv_custom_fields' }]
})
export class AdvertiserProfileComponent implements OnInit {
    private _advertiserData: AdvertiserModel;

    address: string;

    id: number;

    public readonly statusId = BaseStatusIdEnum;

    private _update$: Subject<void> = new Subject();

    readonly managerPermissions = PLATFORM_PERMISSIONS;

    constructor(
        private modal3Service: Modal3Service,
        private activatedRoute: ActivatedRoute,
        private advertiserDetailService: AdvertiserDetailService,
        private pageTitleService: PageTitleService,
        private router: Router,
        private authAsService: AuthAsService,
        private toastr: ToastrBarService,
        private dateFormatService: DateFormatService,
        private readonly pathFile: PathFileService,
        private readonly unsubscribe: UnsubscribeService,
        private readonly navigateRootService: NavigateRootService,
        @Inject(PLATFORM_PERMISSION_TOKEN) public readonly permissions: PlatformPermissionsType,
        @Inject(NAVIGATION_PATH_TOKEN) private readonly paths: ManagerPathResolverType
    ) {
        this.id = this.activatedRoute.snapshot.params.id;
    }

    ngOnInit(): void {
        this.initialLoad();
    }

    public get advertiserData(): AdvertiserModel {
        return this._advertiserData;
    }

    public get countryIcon(): string {
        return this.pathFile.countryIcon(this.advertiserData?.registration?.country_code.toLowerCase());
    }

    public openModal(): void {
        const modal$ = this.modal3Service.editForm(AdvertiserCreateComponent, {
            data: {
                editId: this.activatedRoute.snapshot.params.id
            }
        });

        modal$.afterClosed$
            .pipe(
                filter(({ type }) => [Modal3CloseEventEnum.Delete, Modal3CloseEventEnum.Update].includes(type as Modal3CloseEventEnum)),
                take(1)
            )
            .subscribe(({ type }) => {
                if (type == Modal3CloseEventEnum.Delete) {
                    this.router.navigate([this.paths.advertisers.root]);
                }
                if (type === Modal3CloseEventEnum.Update) {
                    this._update$.next();
                }
            });
    }

    loginAs(email?: string): void {
        this.authAsService.login(email || this.advertiserData.email);
    }

    private setAdvertiserData(advertiser: AdvertiserModel): void {
        this.setAdvertiserAddress(advertiser);
        this._advertiserData = advertiser;
    }

    private initialLoad(): void {
        this._update$
            .pipe(
                startWith(''),
                switchMap(() => this.advertiserDetailService.view(this.id)),
                catchError((error) => {
                    if (error.code === 404) {
                        this.router.navigate([this.paths.advertisers.root]);
                    }
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe)
            )
            .subscribe((advertiser) => {
                this.setAdvertiserData(advertiser);
                this.initBreadcrumb();
            });
    }

    private initBreadcrumb(): void {
        const breadcrumb: BreadcrumbInterface[] = [
            {
                key: 'main_navigation.advertisers',
                link: this.paths.advertisers.root,
                current: false
            },
            {
                key: `#${this.id}`,
                title: `${this.advertiserData.company_name}`,
                link: null,
                current: true
            }
        ];

        this.pageTitleService.setTitle(breadcrumb);
    }

    private setAdvertiserAddress(advertiser: AdvertiserModel): void {
        const address = [];
        address.push(advertiser.address, advertiser.city, advertiser.region, advertiser?.country_selected?.title, advertiser.postal_code);

        this.address = address.filter((el) => el).join(', ');
    }
}
