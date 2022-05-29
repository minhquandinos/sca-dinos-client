import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ManagerEndpointsModule } from '@scaleo/feature/manager/core/endpoints';
import { ManagerNavigationModule } from '@scaleo/feature/manager/core/navigation';
import { ManagerTranslateModule } from '@scaleo/feature/manager/core/translate';

@NgModule({
    imports: [CommonModule, ManagerEndpointsModule, ManagerNavigationModule, ManagerTranslateModule]
})
export class ManagerCoreInitModule {}
