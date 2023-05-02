import GameObject from './GameObject.js';


export default class PetGameObject extends GameObject {
    
  static get STATE_NORMAL() { return 0; }
  static get STATE_EDUCATION() { return 1; }
  static get STATE_EAT() { return 2; }

  static get TIME_TO_JUMP_FROM_CREATION_POINT() { return 500; }
  static get SM_JUMP_Z() { return 100; }

  static get WIDTH() { return 150; }

  static get HEIGHT() { return 150; }
    
  moveTarget = null;
  movePath = null; // Point[]
  moveStep = 0;
  jumpStart = null;
  jumpEnd = null;
  jumpStartAt = 0;
  moveFinishedListener = null;
  jumping = false;
  hat = null;
  cloth = null;
  bow = null;


  step() {
    super.step();
    if (moveTarget != null && movePath != null) {
      if (!isTimeToJumpOver()) {
        if (!jumping) {
          
          jumpStart = position.clone();
          
          jumping = true;
          jumpEnd = movePath[moveStep];
          jumpStartAt = new Date().getTime();
        }
        let t = new Date().getTime() - jumpStartAt;
        if (t <= PetGameObject.TIME_TO_JUMP_FROM_CREATION_POINT) {
          let sm = t
              / TIME_TO_JUMP_FROM_CREATION_POINT;
          let sina = Math.sin(sm * Math.PI);
          let jumpz = (sina * PetGameObject.SM_JUMP_Z);

          let newX = jumpStart.getX() + (jumpEnd.getX() - jumpStart.getX()) * sm;
          let newY = jumpStart.getY() + (jumpEnd.getY() - jumpStart.getY()) * sm
              - jumpz;
          this.position = new Point(newX, newY);
          this.z = ((jumpEnd.y + this.dimension.height) * PetGameObject.TILE_Z_STEP);
        }
      } else {
        jumping = false;
        jumpStartAt = new Date().getTime();
        this.position = movePath[moveStep].clone();
        moveStep++;
        if (moveStep >= movePath.length) {
          moveStep = 0;
          moveTarget = null;
          movePath = null;
          if (moveFinishedListener != null) {
            moveFinishedListener.event();
            moveFinishedListener = null;
          }
        }
      }
    }
    let clothZ = getZ() + 1;
    if (hat != null) {
      hat.position = this.position;
      if (hat.getZ() != clothZ) {
        hat.position = clothZ;
      }
    }
    if (cloth != null) {
      cloth.position = this.position;
      if (cloth.z != clothZ) {
        cloth.z = clothZ;
      }
    }
    if (bow != null) {
      bow.position = this.position;
      if (bow.z != clothZ) {
        bow.z = clothZ;
      }
    }
  }

  isTimeToJumpOver() {
    return new Date().getTime() > jumpStartAt
        + PetGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
  }
    
  setMove(moveTarget, movePath, moveFinishedListener) {
    this.moveTarget = moveTarget;
    this.movePath = movePath;
    this.moveStep = 0;
    this.moveFinishedListener = moveFinishedListener;
  }
  
  setMove(movePath, moveFinishedListener) {
    if (movePath != null && movePath.length > 0)
      setMove(movePath[movePath.length-1], movePath, moveFinishedListener);
    else
      setMove(null, null, null);
  }

  setMove(movePath) {
    setMove(movePath, null);
  }
}


