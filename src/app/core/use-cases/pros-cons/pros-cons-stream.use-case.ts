import { environment } from 'environments/environment.development';

export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {


  try {
    const response = await fetch(`${environment.backendAPI}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal
    });

    if(!response.ok) throw new Error('No se pudo realizar la conexión con el servicio');

    const reader = response.body?.getReader();
    if(!reader) {
      console.log('No se pudo generar el reader');
      throw new Error('No se pudo generar el reader');
    }

    const decoder = new TextDecoder();
    let text = '';

    while(true) {
      const { value, done } = await reader.read();

      if(done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true});
      text += decodedChunk;
      yield text;
    }

    return text;

  } catch (error) {
    return null;
  }
}
