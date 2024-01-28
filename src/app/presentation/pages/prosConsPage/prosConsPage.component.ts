import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    TextMessageBoxComponent,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAIService = inject(OpenAIService);

  public handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update(previous => [
      ...previous,
      {
        isGPT: false,
        text: prompt,
      }
    ])


    this.openAIService.prosConsDiscusser(prompt)
      .subscribe( response => {
        this.isLoading.set(false);
        this.messages.update(previous => [
          ...previous,
          {
            isGPT: true,
            text: response.content
          }
        ])
      })
  }
}
