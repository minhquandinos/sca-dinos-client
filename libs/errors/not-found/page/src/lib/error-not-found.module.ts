import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@scaleo/core/shared/module';
import { UiButtonLinkModule, UiPageWrapperModule } from '@scaleo/ui-kit/elements';

import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
    {
        path: '',
        component: NotFoundComponent
    }
];

@NgModule({
    declarations: [NotFoundComponent],
    imports: [CommonModule, SharedModule, UiPageWrapperModule, RouterModule.forChild(routes), UiButtonLinkModule],
    exports: [NotFoundComponent]
})
export class ErrorNotFoundModule {}
