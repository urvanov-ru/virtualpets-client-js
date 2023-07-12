
import GameView from './GameView.js'

window.addEventListener('resize', onResize);
export let mainContainerScale = 1;

let deferredInstallPromptListener;

function onResize(event) {
  const container = mainContainerElement();
  if (container) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleWidth = windowWidth / GameView.ORIGINAL_WIDTH;
    const scaleHeight = windowHeight / GameView.ORIGINAL_HEIGHT;
    mainContainerScale = 1;
    if (scaleWidth < scaleHeight) {
      mainContainerScale = scaleWidth;
    } else {
      mainContainerScale = scaleHeight;
    }
    const width = GameView.ORIGINAL_WIDTH * mainContainerScale;
    const height = GameView.ORIGINAL_HEIGHT * mainContainerScale;
    container.style.width = width + 'px';
    container.style.height = height + 'px';
    container.style.position = 'absolute';
    container.style.left = (windowWidth - width) / 2 + 'px';
    container.style.top = (windowHeight - height) / 2 + 'px';
  }
}
document.addEventListener("DOMContentLoaded", function(event) {
  onResize();
});

export function mainContainerElement() {
  return document.getElementById('virtualpetscontainer');
}

export function setDeferredInstallPromptListener(listener) {
  console.debug('setDeferredInstallPromptListener %o', listener);
  deferredInstallPromptListener = listener;
}

export function fireDeferredInstallPrompt(deferredInstallPrompt) {
  console.debug('fireDeferredInstallPrompt deferredInstallPrompt = %o, deferredInstallPromptListener = %o.',
      deferredInstallPrompt, deferredInstallPromptListener);
  if (deferredInstallPromptListener) {
    deferredInstallPromptListener(deferredInstallPrompt);
  }
}

