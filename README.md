## Introduction
This is simple wrapper for Sparrow SMS. It supports sending SMS only, but later more will be added. Just ping me or open pull request and contribute :)
## Installation

```bash
$ npm i --save nestjs/sparrow-sms 
$ yarn add nestjs/sparrow-sms 
```

#### Importing module Async

```typescript
import { SparrowSmsModule } from 'nestjs-sparrow-sms';
@Module({
  imports: [
      SparrowSmsModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<AllConfig>) => ({
              identity: configService.get("----your key-----", {infer: true}),
              mode: configService.get("----your key-----", {infer: true}),
              token: configService.get("----your key-----", {infer: true}),
          })
      }),
  ],
  providers: [],
  exports: [],
})
export class YourModule {}
```
#### Calling Send Method to send SMS

```typescript
import { SparrowSmsService,SparrowSmsRequestDto } from 'nestjs-sparrow-sms';

@Injectable()
export class YourService {
  constructor(private sparrowSmsService: SparrowSmsService) {}
    
    async anyCustomFunction(){
        //...your code
        const sparrowSmsRequestDto: SparrowSmsRequestDto = {
      to: 'SMS RECEIVING NUMBER',
      text: 'SMS MESSAGE'
    };
    await this.sparrowSmsService.send(sparrowSmsRequestDto);
  }
}
```
## License

This package is MIT licensed.
