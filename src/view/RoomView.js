import GameEngine from './GameEngine.js';

export default class RoomView extends GameEngine {
   
  #roomData;

  set roomData(roomData) {
    this.#roomData = roomData;
  }

  step() {
    super.step();
    const progressBar = this.#roomData.progressBar;
    if (progressBar.visible) {
      if (progressBar.value < progressBar.maxValue) {
        progressBar.value = progressBar.value + 1;
      } else {
        progressBar.visible = false;
        this.#roomData.progressBarOverListener.animationOver(
            new AnimationOverArg());
      }
    }
  }
}
