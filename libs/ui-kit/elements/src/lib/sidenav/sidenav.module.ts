import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';

import { SidenavGroupComponent } from './components/sidenav-group/sidenav-group.component';
import { SidenavGroupTitleComponent } from './components/sidenav-group-title/sidenav-group-title.component';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SidenavItemsComponent } from './components/sidenav-items/sidenav-items.component';
import { SidenavComponent } from './sidenav.component';

@NgModule({
    declarations: [SidenavComponent, SidenavItemComponent, SidenavGroupComponent, SidenavItemsComponent, SidenavGroupTitleComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [SidenavComponent]
})
export class SidenavModule {}
