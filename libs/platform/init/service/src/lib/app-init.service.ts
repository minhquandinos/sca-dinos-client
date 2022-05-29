import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { NewProfileService } from '@scaleo/account/data-access';
import { AuthenticationService } from '@scaleo/auth/authentication/service';
import { PreloadService } from '@scaleo/core/preload/service';
import { EnvService } from '@scaleo/core/services/env';
import { LanguageInitService } from '@scaleo/platform/language/init';
import { InitPermissionService } from '@scaleo/platform/permission/role';
import { NewPlatformSettingsService } from '@scaleo/platform/settings/access-data';
import { InitPlanService } from '@scaleo/platform-permission-plan-service';

@Injectable({ providedIn: 'root' })
export class AppInitService {
    constructor(
        private env: EnvService,
        private newPlatformSettingsService: NewPlatformSettingsService,
        private preloadService: PreloadService,
        private language: LanguageInitService,
        private router: Router,
        private auth: AuthenticationService,
        private permissionService: InitPermissionService,
        private newProfileService: NewProfileService,
        private readonly initPlanService: InitPlanService
    ) {}

    async init(): Promise<any> {
        try {
            await this.language.init();
            await this.env.initEnv();
            await this.newPlatformSettingsService.init();

            await this.initPlanService.init();
            if (this.auth.isAuthenticated()) {
                await firstValueFrom(this.newProfileService.get());
                await this.permissionService.setRolePermission();
            }
        } catch (e) {
            console.log(e);
            this.preloadService.setLoaded(true);
            this.router.navigate(['/error']);
        }
    }
}
