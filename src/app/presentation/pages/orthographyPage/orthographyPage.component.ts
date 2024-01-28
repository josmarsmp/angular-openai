import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent, GptMessageOrthographyComponent, MyMessageComponent, TextMessageBoxComponent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TypingLoaderComponent } from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from 'app/presentation/services/openai.service';



@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

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
    ]);

    this.openAIService.checkOrthography(prompt)
      .subscribe(resp => {
        this.isLoading.set(false);
        this.messages.update(previous => [
          ...previous,
          {
            isGPT: true,
            text: resp.message,
            info: resp
          }
        ])
      })

  }

}
