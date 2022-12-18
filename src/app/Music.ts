export class Music {
  private audioElement: HTMLAudioElement;

  constructor(url: string) {
    this.audioElement = new Audio(url);
    this.audioElement.loop = true;
    this.audioElement.volume = 0.1;
  }

  play() {
    this.audioElement.play();
  }

  pause() {
    this.audioElement.pause();
  }
}
