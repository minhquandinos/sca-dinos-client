import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

import { BASE_ROLE, BaseRoleType, DefaultRoleEnum } from '@scaleo/platform/role/models';

import { MenuModel, ProfileModel } from './profile.model';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends Query<ProfileModel> {
    profile$: Observable<ProfileModel> = this.select();

    constructor(protected override store: ProfileStore) {
        super(store);
    }

    get profile(): ProfileModel {
        return this.getValue();
    }

    get id(): number {
        return this.profile.id;
    }

    get id$(): Observable<number> {
        return this.select('id');
    }

    get slug(): string {
        switch (this.profile.base_role) {
            case BASE_ROLE.admin:
            case BASE_ROLE.manager:
            case BASE_ROLE.affiliateManager:
            case BASE_ROLE.advertiserManager:
                return 'manager';
            case BASE_ROLE.affiliate:
                return 'affiliate';
            case BASE_ROLE.advertiser:
                return 'advertiser';
            default:
                return null;
        }
    }

    get role(): DefaultRoleEnum | string {
        return this.profile?.role?.value;
    }

    get role$(): Observable<DefaultRoleEnum | string> {
        return this.profile$?.pipe(map((profile) => profile?.role?.value));
    }

    get roleLabel(): string {
        return this.profile.role.label;
    }

    get baseRole(): BaseRoleType {
        return this.profile?.base_role;
    }

    get baseRole$(): Observable<BaseRoleType> {
        return this.profile$?.pipe(map((profile) => profile?.base_role));
    }

    get roleIsNotEmpty$(): Observable<DefaultRoleEnum> {
        return this.role$.pipe(
            startWith('' as any),
            filter((role) => !!role)
        );
    }

    get menus$(): Observable<MenuModel[]> {
        return this.prepareMenu$('menu');
    }

    get menuLeads$(): Observable<MenuModel[]> {
        return this.prepareMenu$('menuLeads');
    }

    get enableApi(): boolean {
        return this.getValue().api_status === 1; // TODO nx StatusesId.Active
    }

    // TODO remove
    get showNetworkRevenue(): boolean {
        return Boolean(this.profile.show_network_revenue);
    }

    private prepareMenu$(key: 'menu' | 'menuLeads'): Observable<MenuModel[]> {
        return this.select(key).pipe(map((menu) => this.prepareMenu(menu)));
    }

    private prepareMenu(menus: MenuModel[]): MenuModel[] {
        return menus.map((group) => ({
            ...group,
            items: group.items.map((item) => ({
                ...item,
                route: this.slug ? `${this.slug}/${item.route}` : item.route
            }))
        }));
    }
}
