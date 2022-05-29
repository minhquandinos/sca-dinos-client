import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'scaleo-dashboard-skeleton',
    templateUrl: './dashboard-skeleton.component.html',
    styleUrls: ['./dashboard-skeleton.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSkeletonComponent {
    readonly skeletons = [1, 2, 3, 4, 5, 6];

    trackByFn(index: number): number {
        return index;
    }
}
