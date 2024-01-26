import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAIService = inject(OpenAIService);

  public handleMessage(prompt: string) {

  }

  // public handleMessageWithFile({ prompt, file }: TextMessageEvent) {
  //   console.log({ prompt, file })
  // }

  // handleMessageWithSelect(event: TextMessageBoxEvent) {
  //   console.log(event);
  // }
}
