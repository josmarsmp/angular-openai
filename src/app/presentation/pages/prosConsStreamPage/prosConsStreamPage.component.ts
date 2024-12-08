import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './prosConsStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAIService = inject(OpenAIService);

  public abortSignal = new AbortController();

  public async handleMessage(prompt: string) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();
    this.messages.update(previous => [
      ...previous,
      {
        isGPT: false,
        text: prompt
      },
      {
        isGPT: true,
        text: '...'
      }
    ]);

    this.isLoading.set(true);
    const stream = this.openAIService.prosConsStreamDiscusser(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await(const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();
    const messages = this.messages();

    this.messages.set([...messages, { isGPT: true, text: message } ]);

  }
}
