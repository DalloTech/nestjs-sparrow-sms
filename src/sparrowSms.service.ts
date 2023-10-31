import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {
    SmsMode,
    SPARROW_SMS_CONFIG_OPTIONS,
    SPARROW_SMS_SEND_SMS,
    SparrowSmsDto,
    SparrowSmsOption,
    SparrowSmsRequestDto
} from "./sparrowSms.interface";

@Injectable()
export class SparrowSmsService {
    private readonly mode: SmsMode = null;
    private readonly token: string = null;
    private readonly identity: string = null;
    private readonly sendSmsUrl: string = null;

    constructor(@Inject(SPARROW_SMS_CONFIG_OPTIONS) private readonly options: SparrowSmsOption, private readonly httpService: HttpService) {
        this.mode = options.mode || SmsMode.TEST;
        this.identity = options.identity;
        this.token = options.token;
        this.sendSmsUrl = options.sendSmsUrl || SPARROW_SMS_SEND_SMS;
        if (!this.identity || !this.token) {
            throw new InternalServerErrorException("Please setup Sparrow sms config")
        }
    }

    async send(data: SparrowSmsRequestDto) {
        const {to, text} = data;
        if (this.mode.localeCompare(SmsMode.TEST) == 0) {
            return {
                status: 200
            }
        } else {
            const requestData: SparrowSmsDto = {
                token: this.token,
                from: this.identity,
                to,
                text
            }
            return await firstValueFrom(
                this.httpService.post(
                    this.sendSmsUrl,
                    requestData,
                    {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
                )
            )
        }
    }
}
