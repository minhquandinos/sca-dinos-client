import { BaseObjectModel } from '@scaleo/core/data';
import { EnvService } from '@scaleo/core/services/env';
import { DashboardWidgetModel } from '@scaleo/dashboard/common';
import { BASE_ROLE, BaseRoleType } from '@scaleo/platform/role/models';

import { advertiserManagerWidgetsConfig } from './advertiser-manager-widget.config';
import { affiliateManagerWidgetsConfig } from './affiliate-manager-widget.config';
import { baseWidgetsConfig } from './base-widgets.config';
import { mgcomWidgetsConfig } from './mgcom-widgets.config';

export const getConfigForManagerFactory = (env: EnvService, baseRole: BaseRoleType): DashboardWidgetModel[] => {
    const widgetConfigMap: BaseObjectModel = {
        [BASE_ROLE.affiliateManager]: affiliateManagerWidgetsConfig,
        [BASE_ROLE.affiliateManager]: advertiserManagerWidgetsConfig
    };

    if (baseRole === BASE_ROLE.admin) {
        if (env?.serverUrl === 'https://mgcom.scaletrk.com') {
            // https://dev-track.scaleo.io
            return mgcomWidgetsConfig;
        }
    }

    const config = widgetConfigMap?.[baseRole] || baseWidgetsConfig;

    return config;
};
