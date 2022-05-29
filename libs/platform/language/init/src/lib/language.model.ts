import { InjectionToken } from '@angular/core';

export type LanguageDefaultType = LanguageEnum.English | LanguageEnum.Russian;

export type AffiliateLanguageType = keyof Record<LanguageEnum, string>;

export type LanguageType = LanguageDefaultType | AffiliateLanguageType;

export interface LanguageModel {
    lang: LanguageType;
    flag: string;
    title: string;
}

export enum LanguageEnum {
    English = 'en',
    Russian = 'ru',
    Vietnam = 'vn',
    Portugal = 'pt',
    Spanish = 'es',
    German = 'de',
    French = 'fr',
    Italian = 'it',
    Polish = 'pl',
    Turkish = 'tr',
    Catalan = 'ca'
}

export const LANGUAGES_TOKEN = new InjectionToken<LanguageModel>('LanguagesToken');
