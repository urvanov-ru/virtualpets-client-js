import GameObject from './GameObject.js';


export default class BuildingGameObject extends GameObject {
  buildListeners = [];
  moveListeners = new Array();
  upgradeListeners = new Array();
    
  addBuildListener(listener) {
    this.buildListeners.push(listener);
  };
  
  addMoveListener(moveListener) {
    this.moveListeners.push(moveListener);
  };

  addUpgradeListener(upgradeListener) {
    this.upgradeListeners.push(upgradeListener);
  };

  fireBuildEvent() {
    for (var n = 0; n < this.buildListeners.length; n++) {
        this.buildListeners[n]();
    }
  };

  fireUpgradeEvent() {
    for (var n = 0; n < this.upgradeListeners.length; n++) {
        this.upgradeListeners[n]();
    }
  };

  fireMoveEvent() {
    for (var n = 0; n < this.moveListeners.length; n++) {
        this.moveListeners[n]();
    }
  };

  step() {
    this.z = ((this.position.y + this.dimension.height) * GameObject.TILE_Z_STEP);
  }
}; 






