import LabelGameObject from '../../domain/LabelGameObject.js';
import ProgressBarGameObject from '../../domain/ProgressBarGameObject.js';
import PopupMenuGameObject from '../../domain/PopupMenuGameObject.js';

import ResourceManager from '../../resources/ResourceManager.js';

import GameObjectRender from './GameObjectRender.js';
import LabelGameObjectRender from './LabelGameObjectRender.js';
import PopupMenuGameObjectRender from './PopupMenuGameObjectRender.js';
import ProgressBarGameObjectRender from './ProgressBarGameObjectRender.js';
import Animation from './Animation.js';
import IndependentFont from './IndependentFont.js';


export default class ViewImplFactory {

  #resourceManager;

  createFont(size) {
    return new IndependentFont(size);
  }
    
  createGameObjectRender(gameObject) {
    if (gameObject instanceof LabelGameObject) {
      return new LabelGameObjectRender(gameObject);
    } else if (gameObject instanceof ProgressBarGameObject) {
      return new ProgressBarGameObjectRender(gameObject);
    } else if (gameObject instanceof PopupMenuGameObject) {
      const popupMenuGameObjectRender = new PopupMenuGameObjectRender(gameObject);
      //popupMenuGameObjectRender.setComponent(gameView.getGamePanel());
      return popupMenuGameObjectRender;
    }
    return new GameObjectRender(gameObject);
  }

  createAnimation(imgids) {
    const imglst = new Array(imgids.length);
    for (let imageIndex = 0; imageIndex < imgids.length; imageIndex++) {
      const image = this.#resourceManager.getImage(imgids[imageIndex]);
      if (image != null) {
        imglst[imageIndex] = image;
      } else {
        throw new Error("Resource with index "
            + imgids[imageIndex] + " was not found.");
      }
    }
    const animation = new Animation();
    animation.imageList = imglst;
    return animation;
  }

  createPetIconAnimation(resourceId, petType,
            scale,
            hatResourceId, clothResourceId, bowResourceId) {
    const iconSize = 57 * scale;
    
    const offscreenCanvas = new OffscreenCanvas(iconSize, iconSize);
     const offscreenCanvasContext = offscreenCanvas.getContext('2d');
     
    const imageCat = this.#resourceManager.getResource(ResourceManager.IMAGE_CAT_NORMAL_1);
    offscreenCanvasContext.drawImage(imageCat, 0, 0, imageCat.width, imageCat.height, 0, 0, iconSize, iconSize);
      
    if (hatResourceId != null) {
      this.#drawClothToPlayerIcon(offscreenCanvasContext, hatResourceId, iconSize);
    }
    if (clothResourceId != null) {
      this.#drawClothToPlayerIcon(offscreenCanvasContext, clothResourceId, iconSize);
    }
    if (bowResourceId != null) {
      this.#drawClothToPlayerIcon(offscreenCanvasContext, bowResourceId, iconSize);
    }
    const animation = new Animation();
    animation.imageList = [ offscreenCanvas.transferToImageBitmap() ];
    return [ animation ];
  }
  
  
  #drawClothToPlayerIcon(context, clothResourceId, iconSize) {
    const image = this.#resourceManager.getResource(clothResourceId);
    context.drawImage(image, 0, 0, image.with, image.height, 0, 0, iconSize, iconSize);
  }

  set resourceManager(resourceManager) {
    this.#resourceManager = resourceManager;
  }
}
