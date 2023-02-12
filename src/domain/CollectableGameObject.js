

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
    return new Date().getTime() > this.createdAt + CollectagleGameObject.TIME_TO_LIFE;
  };
    
  isTimeToJumpOver = function() {
    return new Date().getTime() > this.createdAt + CollectableGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
  };
    
  forceTimeToLifeOver = function() {
    if (!this.isTimeToLifeOver()) {
        this.createdAt = new Date().getTime() - CollectableGameObject.TIME_TO_LIFE - 1;
    }
  };





    

    step() {
        super.step();
 // Was not adapted yet
 //       if (isTimeToLifeOver()) {
 //           
 //           if (!movingToRucksack) {
 //               this.startPosition = getPosition();
 //               movingToRucksack = true;
 //           }
 //           let startX = this.startPosition.x;
 //           let startY = this.startPosition.y;
 //           long t = new Date().getTime() - createdAt - TIME_TO_LIFE;
 //           if (t > TIME_TO_MOVE_TO_RUCKSACK) {
 //               setVisible(false);
 //           }
  //          let sm = (double)t / (double)TIME_TO_MOVE_TO_RUCKSACK;
 //           let rucksackPosition = rucksack.getPosition();
 //           let rucksackX = rucksackPosition.x;
 //           let rucksackY = rucksackPosition.y;
 //           let newX = startX + (rucksackX - startX) * sm;
 //           let newY = startY + (rucksackY - startY) * sm;
 //           setPosition(new Point((int)newX, (int)newY)); 
 //       } else {
 //           if (!isTimeToJumpOver()) {
 //               
 //               if (!jumping) {
 //                   this.startPosition = getPosition();
 //                   let startX = this.startPosition.x;
 //                   let startY = this.startPosition.y;
 //                   jumping = true;
 //                   Random random = new Random();
 //                   int jumpEndX = startX - SM_X + random.nextInt(SM_X + SM_X);
 //                   int jumpEndY = startY - SM_Y + random.nextInt(SM_Y + SM_Y);
 //                   setJumpEnd(new Point(jumpEndX, jumpEndY));
 //               }
 //               int startX = getStartPosition().x;
 //               int startY = getStartPosition().y;
 //               long t = new Date().getTime() - createdAt;
 //               if (t <= TIME_TO_JUMP_FROM_CREATION_POINT) {
 //                   double sm = (double)t / (double)TIME_TO_JUMP_FROM_CREATION_POINT;
 //                   double sina = Math.sin(sm * Math.PI);
 //                   double jumpz = (double) (sina * SM_JUMP_Z);
 //                   int jumpEndX = jumpEnd.x;
 //                   int jumpEndY = jumpEnd.y;
 //                   double newX = startX + (jumpEndX - startX) * sm;
 //                   double newY = startY + (jumpEndY - startY) * sm - jumpz;
 //                   setPosition(new Point(newX, (int)newY));
 //               }
 //           }
 //       }
    }

    
};


