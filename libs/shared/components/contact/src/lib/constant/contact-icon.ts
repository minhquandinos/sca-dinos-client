import { MessengerEnum } from '../models/contact.model';

export const CONTACT_ICON = [
    {
        id: 1,
        icon: 'ic_skype',
        name: 'Skype'
    },
    {
        id: 2,
        icon: 'ic_whatsapp',
        name: 'WatsApp'
    },
    {
        id: 3,
        icon: 'ic_facebook',
        name: 'Messenger'
    },
    {
        id: 4,
        icon: 'ic_viber',
        name: 'Viber'
    },
    {
        id: 5,
        icon: 'ic_telegram',
        name: 'Telegram'
    },
    {
        id: 6,
        icon: 'ic_line',
        name: 'Line'
    },
    {
        id: 7,
        icon: 'ic_wechat',
        name: 'WeChat'
    },
    {
        id: 8,
        icon: 'ic_call',
        name: 'Call'
    }
];

export const CONTACT: {
    [K in MessengerEnum]: {
        id: Partial<MessengerEnum>;
        icon: string;
        name: string;
    };
} = {
    [MessengerEnum.Skype]: {
        id: MessengerEnum.Skype,
        icon: 'ic_skype',
        name: 'Skype'
    },
    [MessengerEnum.WatsApp]: {
        id: MessengerEnum.WatsApp,
        icon: 'ic_whatsapp',
        name: 'WatsApp'
    },
    [MessengerEnum.Messenger]: {
        id: MessengerEnum.Messenger,
        icon: 'ic_facebook',
        name: 'Messenger'
    },
    [MessengerEnum.Viber]: {
        id: MessengerEnum.Viber,
        icon: 'ic_viber',
        name: 'Viber'
    },
    [MessengerEnum.Telegram]: {
        id: MessengerEnum.Telegram,
        icon: 'ic_telegram',
        name: 'Telegram'
    },
    [MessengerEnum.Line]: {
        id: MessengerEnum.Line,
        icon: 'ic_line',
        name: 'Line'
    },
    [MessengerEnum.WeChat]: {
        id: MessengerEnum.WeChat,
        icon: 'ic_wechat',
        name: 'WeChat'
    },
    [MessengerEnum.Call]: {
        id: MessengerEnum.Call,
        icon: 'ic_call',
        name: 'Call'
    }
};
