import type { ProsConsResponse } from '@interfaces/pros-cons.response';
import { environment } from 'environments/environment.development';

export const prosConsUseCase = async (prompt: string) => {

  try {
    const response = await fetch(`${environment.backendAPI}/pros-cons-discusser`, {
      body: JSON.stringify({ prompt }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if(!response.ok) throw new Error('No se pudo realizar la conexión con el servicio');

    const data = await response.json() as ProsConsResponse;

    return {
      ok: true,
      ...data
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      role: '',
      content: ''
    };
  }

}
