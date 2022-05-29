import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-affiliate2-dashboard-page-component',
    template: `<div class="flex items-center justify-center mt-20">
            <h1 class="mat-h1">
                Tailwind CSS 3
                <span class="text-red">Angular</span>
            </h1>
        </div>
        <div class="flex items-center justify-center bg-tahiti-400">
            <div class="mr-1">
                <button mat-stroked-button>Basic</button>
            </div>
            <button mat-stroked-button color="accent" class="mr-4">Accent</button>
            <button mat-raised-button color="primary" class="mr-4">Basic</button>
            <button mat-raised-button color="accent">Basic</button>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureAffiliate2DashboardPageComponent {}
