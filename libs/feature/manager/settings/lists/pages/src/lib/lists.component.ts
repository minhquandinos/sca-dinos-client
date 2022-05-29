import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlatformListsInterface } from '@scaleo/platform/list/access-data';

type ListsType = 'tags' | 'messengers' | 'traffic-types';

@Component({
    selector: 'scaleo-mng-lists',
    styleUrls: ['lists.component.scss'],
    templateUrl: './lists.component.html'
})
export class ListsComponent implements OnInit, OnDestroy {
    public activeMenu: ListsType;

    public listTagsUpdate: Subject<boolean> = new Subject<boolean>();

    public platformLists: PlatformListsInterface;

    private unsubscribe: Subject<void> = new Subject();

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.data.pipe(takeUntil(this.unsubscribe)).subscribe((data) => {
            this.platformLists = data.platformLists;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
