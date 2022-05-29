import { NgModule } from '@angular/core';

import { AmpPipe } from './amp.pipe';

@NgModule({
    declarations: [AmpPipe],
    exports: [AmpPipe]
})
export class AmpPipeModule {}
