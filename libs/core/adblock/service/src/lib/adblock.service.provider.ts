import { AdBlockService } from './adblock.service';

const adBlockServiceFactory = () => {
    // Create env
    const adBlock = new AdBlockService();

    // Read environmentDev variables from browser window
    const browserWindow = window || {};
    const browserWindowEnv = (browserWindow as any)['__scaleo'] || {};

    // Assign environmentDev variables from browser window to env
    // In the current implementation, properties from env.js overwrite defaults from the EnvService.
    // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
    for (const key in browserWindowEnv) {
        // eslint-disable-next-line no-prototype-builtins
        if (browserWindowEnv.hasOwnProperty(key)) {
            (adBlock as any)[key] = (window as any)['__scaleo'][key];
        }
    }

    return adBlock;
};

export const ADBLOCK_PROVIDER = {
    provide: AdBlockService,
    useFactory: adBlockServiceFactory
};
