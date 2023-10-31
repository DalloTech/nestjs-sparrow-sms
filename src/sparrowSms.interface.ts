import {FactoryProvider, ModuleMetadata} from "@nestjs/common";

export const SPARROW_SMS_CONFIG_OPTIONS = 'SPARROW_SMS_CONFIG_OPTIONS'
export const SPARROW_SMS_SEND_SMS = 'https://api.sparrowsms.com/v2/sms'

export enum SmsMode {
    TEST = 'TEST',
    LIVE = 'LIVE',
}

export interface SparrowSmsRequestDto {
    to: string;
    text: string;
}

export interface SparrowSmsDto {
    //Token generated from our website.
    token: string;
    //It should be the identity provided to you.
    from: string;
    //Comma Separated 10-digit mobile numbers.
    to: string;
    //SMS Message to be sent.
    text: string;
}

export interface SparrowSmsOption {
    token: string;
    identity: string;
    mode: SmsMode;
    sendSmsUrl?: string;
}


type SparrowSmsAsyncOptions =
    Pick<ModuleMetadata, 'imports'>
    & Pick<FactoryProvider<SparrowSmsOption>, 'useFactory' | 'inject'>;


export default SparrowSmsAsyncOptions;