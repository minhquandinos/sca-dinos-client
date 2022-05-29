import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileQuery } from '@scaleo/account/data-access';
import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';
import { TruncateTextPipe } from '@scaleo/shared/pipes';

@Component({
    selector: 'shared-layout-user-profile',
    templateUrl: './user-profile.component.html',
    providers: [{ provide: 'locationObject', useValue: Location }, TruncateTextPipe, UnsubscribeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {
    @HostBinding('class') hostClass = 'user-profile';

    readonly image$: Observable<string> = this.getImage$;

    readonly name$: Observable<string> = this.getName$;

    readonly roleLabel$: Observable<string> = this.getRoleLabel$;

    constructor(
        private readonly router: Router,
        private readonly translate: TranslateService,
        private readonly profileQuery: ProfileQuery,
        private readonly truncateTextPipe: TruncateTextPipe
    ) {}

    logout(): void {
        this.router.navigate(['logout']);
    }

    private get getRoleLabel$(): Observable<string> {
        const showIdForThisRole: BaseRoleType[] = [BASE_ROLE.affiliate, BASE_ROLE.advertiser];

        return this.profileQuery.profile$.pipe(
            map(({ base_role, role, id }) => {
                const label = role?.label;
                return showIdForThisRole.includes(base_role) ? `${label} #${id}` : label;
            })
        );
    }

    private get getName$(): Observable<string> {
        return this.profileQuery.profile$.pipe(
            map(({ lastname, firstname }) => {
                const nameLimitLength = 20;
                const shortLastName = `${lastname?.substr(0, 1)}.`;
                const name = `${firstname} ${shortLastName}`;

                return name.length > nameLimitLength ? this.truncateTextPipe.transform(name, nameLimitLength) : name;
            })
        );
    }

    private get getImage$(): Observable<string> {
        return this.profileQuery.profile$.pipe(map(({ image }) => image));
    }
}
