import GameObject from './GameObject.js';
import Point from './Point.js';

export default class CollectableGameObject extends GameObject {

  static get TIME_TO_LIFE() { return 10000; }
  static get TIME_TO_MOVE_TO_RUCKSACK() { return 500; }
  static get TIME_TO_JUMP_FROM_CREATION_POINT() { return 500; }
  static get SM_X() { return 100; }
  static get SM_Y() { return 100; }
  static get SM_JUMP_Z() { return 100; }

  createdAt = new Date().getTime();
  movingToRucksack = false;
  jumping = false;
  startPosition = null;
  jumpEnd = null;
  rucksack = null;

  isTimeToLifeOver() {
    return new Date().getTime() > this.createdAt + CollectableGameObject.TIME_TO_LIFE;
  };
    
  isTimeToJumpOver() {
    return new Date().getTime() > this.createdAt + CollectableGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
  };
    
  forceTimeToLifeOver() {
    if (!this.isTimeToLifeOver()) {
        this.createdAt = new Date().getTime() - CollectableGameObject.TIME_TO_LIFE - 1;
    }
  };





    

    step() {
        super.step();
        if (this.isTimeToLifeOver()) {
            
            if (!this.movingToRucksack) {
                this.startPosition = this.position;
                this.movingToRucksack = true;
            }
            let startX = this.startPosition.x;
            let startY = this.startPosition.y;
            let t = new Date().getTime() - this.createdAt - CollectableGameObject.TIME_TO_LIFE;
            if (t > CollectableGameObject.TIME_TO_MOVE_TO_RUCKSACK) {
                this.visible = false;
            }
            let sm = t / CollectableGameObject.TIME_TO_MOVE_TO_RUCKSACK;
            let rucksackPosition = this.rucksack.position;
            let rucksackX = rucksackPosition.x;
            let rucksackY = rucksackPosition.y;
            let newX = startX + (rucksackX - startX) * sm;
            let newY = startY + (rucksackY - startY) * sm;
            this.position = new Point(newX, newY); 
        } else {
            if (!this.isTimeToJumpOver()) {
                if (!this.jumping) {
                    this.startPosition = this.position;
                    let startX = this.startPosition.x;
                    let startY = this.startPosition.y;
                    this.jumping = true;
                    let jumpEndX = startX - CollectableGameObject.SM_X + Math.floor(Math.random() * (CollectableGameObject.SM_X + CollectableGameObject.SM_X));
                    let jumpEndY = startY - CollectableGameObject.SM_Y + Math.floor(Math.random() * (CollectableGameObject.SM_Y + CollectableGameObject.SM_Y));
                    this.jumpEnd = new Point(jumpEndX, jumpEndY);
                }
                let startX = this.startPosition.x;
                let startY = this.startPosition.y;
                let t = new Date().getTime() - this.createdAt;
                if (t <= CollectableGameObject.TIME_TO_JUMP_FROM_CREATION_POINT) {
                    let sm = t / CollectableGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
                    let sina = Math.sin(sm * Math.PI);
                    let jumpz = sina * CollectableGameObject.SM_JUMP_Z;
                    let jumpEndX = this.jumpEnd.x;
                    let jumpEndY = this.jumpEnd.y;
                    let newX = startX + (jumpEndX - startX) * sm;
                    let newY = startY + (jumpEndY - startY) * sm - jumpz;
                    this.position = new Point(newX, newY);
                }
            }
        }
    }

    
};


