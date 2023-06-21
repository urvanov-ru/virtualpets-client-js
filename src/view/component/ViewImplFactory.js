import LabelGameObject from '../../domain/LabelGameObject.js';
import ProgressBarGameObject from '../../domain/ProgressBarGameObject.js';
import PopupMenuGameObject from '../../domain/PopupMenuGameObject.js';

import GameObjectRender from './GameObjectRender.js';
import LabelGameObjectRender from './LabelGameObjectRender.js';
import PopupMenuGameObjectRender from './PopupMenuGameObjectRender.js';
import ProgressBarGameObjectRender from './ProgressBarGameObjectRender.js';


export default class ViewImplFactory {

  createFont(size) {}
    
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

  createAnimation(imgids) {}

  createPetIconAnimation(resourceId, petType,
            scale,
            hatResourceId, clothResourceId, bowResourceId) {
            }

}
