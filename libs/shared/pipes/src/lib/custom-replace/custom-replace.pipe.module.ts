import { NgModule } from '@angular/core';

import { CustomReplacePipe } from './custom-replace.pipe';

@NgModule({
    declarations: [CustomReplacePipe],
    exports: [CustomReplacePipe]
})
export class CustomReplacePipeModule {}
