import { Injectable } from '@angular/core';

const WINDOW = (): any => window;

@Injectable({
    providedIn: 'root'
})
export class WindowRefService {
    get nativeWindow(): any {
        return WINDOW();
    }
}
