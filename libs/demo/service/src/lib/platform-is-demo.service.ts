import { Injectable } from '@angular/core';

import { EnvService } from '@scaleo/core/services/env';

@Injectable()
export class PlatformIsDemoService {
    private readonly demoUrl = ['https://demo-track.scaleo.io', 'https://demo.scaletrk.com'];

    constructor(private envService: EnvService) {}

    public get isDemoUrl(): boolean {
        return this.demoUrl.includes(this.envService.serverUrl);
    }
}
