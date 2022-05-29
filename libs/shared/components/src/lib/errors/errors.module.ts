import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@scaleo/core/shared/module';

import { ErrorComponent } from './components/error.component';
import { ErrorsComponent } from './components/errors.component';

@NgModule({
    declarations: [ErrorsComponent, ErrorComponent],
    imports: [CommonModule, SharedModule],
    exports: [ErrorsComponent, ErrorComponent]
})
export class ErrorsModule {}
