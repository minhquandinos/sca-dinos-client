export interface ContactModel {
    account: string;
    title: string;
    type?: number;
}

export enum MessengerEnum {
    Skype = 1,
    WatsApp = 2,
    Messenger = 3,
    Viber = 4,
    Telegram = 5,
    Line = 6,
    WeChat = 7,
    Call = 8
}
