import GameObject from './GameObject.js';
import Point from './Point.js';


export default class ExperienceGameObject extends GameObject {
  static get TIME_TO_LIFE() { return 10000; }
  static get TIME_TO_MOVE_TO_LEVEL_INFO() { return 500; }
  static get TIME_TO_JUMP_FROM_CREATION_POINT() { return 500; }
  static get SM_X() { return 100; }
  static get SM_Y() { return 100; }
  static get SM_JUMP_Z() { return 100; }
  
  createdAt = null;

  movingToLevelInfo = false;
  jumping = false;
  startPosition = null;
  jumpEnd = null;
  
  levelInfo = null;
  
  constructor() {
    super();
    this.createdAt = new Date().getTime();
  }
  
  isTimeToLifeOver() {
    return new Date().getTime() > this.createdAt + ExperienceGameObject.TIME_TO_LIFE;
  }
  
  isTimeToJumpOver() {
    return new Date().getTime() > this.createdAt + ExperienceGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
  }
  
  forceTimeToLifeOver() {
    if (!this.isTimeToLifeOver()) {
      this.createdAt = new Date().getTime() - ExperienceGameObject.TIME_TO_LIFE - 1;
    }
  }


  step() {
    super.step();
    if (this.isTimeToLifeOver()) {
      
      if (!this.movingToLevelInfo) {
        this.startPosition = this.position;
        this.movingToLevelInfo = true;
      }
      const startX = this.startPosition.x;
      const startY = this.startPosition.y;
      const t = new Date().getTime() - this.createdAt - ExperienceGameObject.TIME_TO_LIFE;
      if (t > ExperienceGameObject.TIME_TO_MOVE_TO_LEVEL_INFO) {
        this.visible = false;
      }
      const sm = t / ExperienceGameObject.TIME_TO_MOVE_TO_LEVEL_INFO;
      const rucksackPosition = this.levelInfo.experienceProgressBar.position;
      const rucksackX = rucksackPosition.x;
      const rucksackY = rucksackPosition.y;
      const newX = startX + (rucksackX - startX) * sm;
      const newY = startY + (rucksackY - startY) * sm;
      this.position = new Point(newX, newY); 
    } else {
      if (!this.isTimeToJumpOver()) {
        
        if (!this.jumping) {
          this.startPosition = this.position;
          const startX = this.startPosition.x;
          const startY = this.startPosition.y;
          this.jumping = true;
          const jumpEndX = startX - ExperienceGameObject.SM_X + Math.floor(Math.random() * (ExperienceGameObject.SM_X + ExperienceGameObject.SM_X));
          const jumpEndY = startY - ExperienceGameObject.SM_Y + Math.floor(Math.random() * (ExperienceGameObject.SM_Y + ExperienceGameObject.SM_Y));
          this.jumpEnd = new Point(jumpEndX, jumpEndY);
        }
        const startX = this.startPosition.x;
        const startY = this.startPosition.y;
        const t = new Date().getTime() - this.createdAt;
        if (t <= ExperienceGameObject.TIME_TO_JUMP_FROM_CREATION_POINT) {
          const sm = t / ExperienceGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
          const sina = Math.sin(sm * Math.PI);
          const jumpz =  sina * ExperienceGameObject.SM_JUMP_Z;
          const jumpEndX = this.jumpEnd.x;
          const jumpEndY = this.jumpEnd.y;
          const newX = startX + (jumpEndX - startX) * sm;
          const newY = startY + (jumpEndY - startY) * sm - jumpz;
          this.position = new Point(newX, newY);
        }
      }
    }
  }

}
