import { animate, state, style, transition, trigger } from '@angular/animations';

export const animationRules = {
    animationTriggerForSortLists: trigger('showHideSortInList', [
        state(
            'show',
            style({
                opacity: 1
            })
        ),
        state(
            'hide',
            style({
                opacity: 0
            })
        ),
        transition('show => hide', [animate('0.5s')]),
        transition('hide => show', [animate('1s')])
    ]),
    fade: (timeIn = 300, timeOut: number = 300) =>
        trigger('fade', [
            transition(':enter', [
                style({
                    opacity: 0
                }),
                animate(timeIn, style({ opacity: 1 }))
            ]),
            transition(':leave', [animate(timeOut, style({ opacity: 0 }))])
        ])
};
