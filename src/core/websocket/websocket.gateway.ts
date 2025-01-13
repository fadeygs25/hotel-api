import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class WebSocketGatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(WebSocketGatewayService.name);

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): string {
    this.logger.log(`Message received: ${message}`);
    return `Received: ${message}`;
  }
}

@WebSocketGateway({ namespace: 'notifications' })
export class NotificationsGateway {
  private readonly logger = new Logger(NotificationsGateway.name);

  @SubscribeMessage('newBooking')
  handleNewBooking(@MessageBody() data: any): void {
    this.logger.log(`New booking notification: ${JSON.stringify(data)}`);
  }
}