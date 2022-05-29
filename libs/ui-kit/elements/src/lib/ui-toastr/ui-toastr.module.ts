import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { CustomToastComponent } from './custom-toast.component';

@NgModule({
    declarations: [CustomToastComponent],
    imports: [
        CommonModule,
        ToastrModule.forRoot({
            toastComponent: CustomToastComponent
        })
    ]
})
export class UiToastrModule {}
