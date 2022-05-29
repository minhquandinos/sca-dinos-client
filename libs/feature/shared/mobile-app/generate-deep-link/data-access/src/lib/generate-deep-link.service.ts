import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GenerateDeepLinkApi } from './generate-deep-link.api';

@Injectable()
export class GenerateDeepLinkService {
    constructor(private readonly api: GenerateDeepLinkApi) {}

    getMobileLoginLink$(): Observable<string> {
        return this.api.getMobileLoginLink$();
    }
}
