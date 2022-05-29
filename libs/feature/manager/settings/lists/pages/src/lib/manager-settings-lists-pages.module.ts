import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SortablejsModule } from 'ngx-sortablejs';

import { SharedModule } from '@scaleo/core/shared/module';
import { InputModule } from '@scaleo/shared/components';
import { FindPlatformStatusesModule } from '@scaleo/shared/components/find';
import { DisableButtonDuringRequestDirectiveModule } from '@scaleo/shared/directives';
import { UiCard2Module } from '@scaleo/ui-kit/components/card2';
import { Modal3EditFormModule } from '@scaleo/ui-kit/components/modal3';
import {
    UiButtonLinkModule,
    UiDividerModule,
    UiSkeletonModule,
    UiStatusColorModule,
    UiSvgIconModule,
    UiTableModule,
    UiTabNavBarModule
} from '@scaleo/ui-kit/elements';

import { ListMessengersComponent } from './list-messengers/list-messengers.component';
import { MessengerCreateComponent } from './list-messengers/messenger-create/messenger-create.component';
import { ListTagsComponent } from './list-tags/list-tags.component';
import { TagCreateComponent } from './list-tags/tag-create/tag-create.component';
import { ListTrafficTypesComponent } from './list-traffic-types/list-traffic-types.component';
import { TrafficTypeCreateComponent } from './list-traffic-types/traffic-type-create/traffic-type-create.component';
import { ListsComponent } from './lists.component';
import { ListsResolver } from './lists.resolver';
import { AddListsComponent } from './shared/components/add-lists/add-lists.component';

const routes: Routes = [
    {
        path: '',
        component: ListsComponent,
        resolve: {
            platformLists: ListsResolver
        },
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'tags'
            },
            {
                path: 'tags',
                component: ListTagsComponent
            },
            {
                path: 'messengers',
                component: ListMessengersComponent
            },
            {
                path: 'traffic-types',
                component: ListTrafficTypesComponent
            }
        ]
    }
];

@NgModule({
    declarations: [
        ListMessengersComponent,
        ListTrafficTypesComponent,
        ListTagsComponent,
        ListsComponent,
        TagCreateComponent,
        MessengerCreateComponent,
        TrafficTypeCreateComponent,
        AddListsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        UiButtonLinkModule,
        SortablejsModule.forRoot({ animation: 150 }),
        // LinkGroupModule,
        UiStatusColorModule,
        UiButtonLinkModule,
        UiSkeletonModule,
        FindPlatformStatusesModule,
        UiSvgIconModule,
        UiTableModule,
        UiTabNavBarModule,
        InputModule,
        Modal3EditFormModule,
        UiCard2Module,
        UiDividerModule,
        DisableButtonDuringRequestDirectiveModule
    ],
    providers: [ListsResolver]
})
export class ManagerSettingsListsPagesModule {}
