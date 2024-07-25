import { forwardRef, Module } from '@nestjs/common';
import { MessageModule } from './message/message.module';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatRepository } from './chat.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Chat } from './entities/chat.entity';
import { ChatSchema } from './entities/chat.document';

@Module({
  imports: [
    DatabaseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema
      }
    ]),
    forwardRef(() => MessageModule)
  ],
  providers: [
    ChatService,
    ChatResolver,
    ChatRepository
  ]
})
export class ChatModule { }
