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
    if (this.moveTarget != null && this.movePath != null) {
      if (!isTimeToJumpOver()) {
        if (!this.jumping) {
          
          this.jumpStart = this.position.clone();
          
          this.jumping = true;
          this.jumpEnd = this.movePath[moveStep];
          this.jumpStartAt = new Date().getTime();
        }
        let t = new Date().getTime() - this.jumpStartAt;
        if (t <= PetGameObject.TIME_TO_JUMP_FROM_CREATION_POINT) {
          let sm = t
              / TIME_TO_JUMP_FROM_CREATION_POINT;
          let sina = Math.sin(sm * Math.PI);
          let jumpz = (sina * PetGameObject.SM_JUMP_Z);

          let newX = this.jumpStart.x + (this.jumpEnd.x - this.jumpStart.x) * sm;
          let newY = this.jumpStart.y + (this.jumpEnd.y - this.jumpStart.y) * sm
              - jumpz;
          this.position = new Point(newX, newY);
          this.z = ((this.jumpEnd.y + this.dimension.height) * PetGameObject.TILE_Z_STEP);
        }
      } else {
        this.jumping = false;
        this.jumpStartAt = new Date().getTime();
        this.position = this.movePath[moveStep].clone();
        this.moveStep++;
        if (this.moveStep >= this.movePath.length) {
          this.moveStep = 0;
          this.moveTarget = null;
          this.movePath = null;
          if (this.moveFinishedListener != null) {
            this.moveFinishedListener.event();
            this.moveFinishedListener = null;
          }
        }
      }
    }
    let clothZ = this.z + 1;
    if (this.hat != null) {
      this.hat.position = this.position;
      if (this.hat.z != clothZ) {
        this.hat.position = clothZ;
      }
    }
    if (this.cloth != null) {
      this.cloth.position = this.position;
      if (this.cloth.z != clothZ) {
        this.cloth.z = clothZ;
      }
    }
    if (this.bow != null) {
      this.bow.position = this.position;
      if (this.bow.z != clothZ) {
        this.bow.z = clothZ;
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


