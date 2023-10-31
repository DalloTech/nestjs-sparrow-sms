import {DynamicModule, Module} from '@nestjs/common';
import {SparrowSmsService} from "./sparrowSms.service";
import {HttpModule} from "@nestjs/axios";
import SparrowSmsAsyncOptions, {SPARROW_SMS_CONFIG_OPTIONS} from "./sparrowSms.interface";

@Module({})
export class SparrowSmsModule {
    static registerAsync(options: SparrowSmsAsyncOptions): DynamicModule {
        return {
            module: SparrowSmsModule,
            imports: [HttpModule, ...options.imports],
            providers: [{
                provide: SPARROW_SMS_CONFIG_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject
            },
                SparrowSmsService
            ],
            exports: [SparrowSmsService]
        }
    }
}
