import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';
import { SelectModule } from '@scaleo/shared/components/select';

import { FindRoleComponent } from './find-role.component';
import { FindRoleFirstElementTranslatePipe } from './pipes/find-role-first-element-translate.pipe';

@NgModule({
    declarations: [FindRoleComponent, FindRoleFirstElementTranslatePipe],
    imports: [CommonModule, SharedModule, SelectModule],
    exports: [FindRoleComponent]
})
export class FindRoleModule {}
