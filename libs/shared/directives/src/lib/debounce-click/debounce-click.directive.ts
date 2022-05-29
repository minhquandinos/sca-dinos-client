import { Directive, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { UnsubscribeService } from '@scaleo/core/services/unsubscribe';

@Directive({
    selector: '[appDebounceClick]',
    providers: [UnsubscribeService]
})
export class DebounceClickDirective implements OnInit {
    @Input()
    debounceTime = 300;

    @Output()
    debounceClick: EventEmitter<any> = new EventEmitter();

    private clicks = new Subject();

    @HostListener('click', ['$event'])
    clickEvent(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }

    constructor(private readonly unsubscribe: UnsubscribeService) {}

    ngOnInit(): void {
        this.clicks.pipe(debounceTime(this.debounceTime), takeUntil(this.unsubscribe)).subscribe((event) => this.debounceClick.emit(event));
    }
}
