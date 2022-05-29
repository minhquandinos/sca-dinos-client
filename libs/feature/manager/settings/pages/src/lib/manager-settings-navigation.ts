import { BaseNavGroupModel } from '@scaleo/shared/data';
import { getConfig } from '@scaleo/utils';

const SETTINGS_TRANSLATE = 'administration_settings';
const HEADERS_TRANSLATE = `${SETTINGS_TRANSLATE}.headers`;

const navigation2: BaseNavGroupModel[] = [
    {
        title: 'Company',
        items: [
            {
                title: `${HEADERS_TRANSLATE}.general`,
                routeLink: 'general'
            },
            {
                title: `${HEADERS_TRANSLATE}.branding`,
                routeLink: 'branding'
            },
            {
                title: `${SETTINGS_TRANSLATE}.security.title`,
                routeLink: 'security'
            },
            {
                title: `mobile_app.menu`,
                routeLink: 'mobile-app'
            }
        ]
    },
    {
        title: 'Team',
        items: [
            {
                title: 'settings.teammates.title',
                routeLink: 'teammates'
            },
            {
                title: `settings.roles_permissions.title`,
                routeLink: 'roles-permissions'
            }
        ]
    },
    {
        title: 'Affiliate',
        items: [
            {
                title: `${HEADERS_TRANSLATE}.affiliates`,
                routeLink: 'affiliates'
            },
            {
                title: 'main_navigation.billing',
                routeLink: 'billing'
            }
        ]
    },
    {
        title: 'Advertiser',
        items: [
            {
                title: `${HEADERS_TRANSLATE}.advertisers`,
                routeLink: 'advertisers'
            }
        ]
    },
    {
        title: 'Content',
        items: [
            {
                title: `${HEADERS_TRANSLATE}.lists`,
                routeLink: 'lists'
            },
            {
                title: `${HEADERS_TRANSLATE}.email_templates`,
                routeLink: 'email-templates'
            },
            {
                title: 'main_navigation.offers',
                routeLink: 'offers'
            }
        ]
    }
];

export const MANAGER_SETTINGS_NAVIGATION = getConfig<BaseNavGroupModel[]>(navigation2);
