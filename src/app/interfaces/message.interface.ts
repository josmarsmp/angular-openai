export interface Message {
  text: string;
  isGPT: boolean;
  info? : {
    userScore: number;
    errors: string[],
    message: string;
  }
}
