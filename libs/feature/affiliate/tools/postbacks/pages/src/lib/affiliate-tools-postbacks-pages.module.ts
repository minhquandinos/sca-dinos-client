import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'all'
            },
            {
                path: 'all',
                loadChildren: (): Promise<any> =>
                    import('@scaleo/feature/affiliate/tools/postbacks/list/page').then((m) => m.AffiliatePostbacksListModule)
            }
        ])
    ]
})
export class AffiliateToolsPostbacksPagesModule {}
