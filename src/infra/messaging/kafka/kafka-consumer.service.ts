import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    const username: string =
      configService.get<string>('KAFKA_USERNAME') ?? 'username';
    const password: string =
      configService.get<string>('KAFKA_PASSWORD') ?? 'password';

    super({
      client: {
        clientId: 'notifications',
        brokers: ['loving-marlin-6743-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username,
          password,
        },
        ssl: true,
      },
    });
  }
  async onModuleDestroy() {
    await this.close();
  }
}
