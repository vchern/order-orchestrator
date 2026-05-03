import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';

@Controller('orders')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Post()
  @HttpCode(201)
  receiveOrder(@Body() order: unknown): { received: true } {
    this.logger.log(`Received order: ${JSON.stringify(order)}`);
    return { received: true };
  }
}
