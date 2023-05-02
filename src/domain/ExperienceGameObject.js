import GameObject from './GameObject.js';


export default class ExperienceGameObject extends GameObject { // implements HighlightGameObject
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
    createdAt = new Date().getTime();
  }
    
  isTimeToLifeOver() {
    return new Date().getTime() > createdAt + ExperienceGameObject.TIME_TO_LIFE;
  }
    
  isTimeToJumpOver() {
    return new Date().getTime() > createdAt + ExperienceGameObject.TIME_TO_JUMP_FROM_CREATION_POINT;
  }
    
  forceTimeToLifeOver() {
    if (!isTimeToLifeOver()) {
      createdAt = new Date().getTime() - ExperienceGameObject.TIME_TO_LIFE - 1;
    }
  }

//    @Override
//    public void step() {
//        super.step();
//        if (isTimeToLifeOver()) {
//            
//            if (!movingToLevelInfo) {
//                setStartPosition(getPosition());
//                movingToLevelInfo = true;
//            }
//            int startX = getStartPosition().getX();
//            int startY = getStartPosition().getY();
//            long t = new Date().getTime() - createdAt - TIME_TO_LIFE;
//            if (t > TIME_TO_MOVE_TO_LEVEL_INFO) {
//                setVisible(false);
//            }
//            double sm = (double)t / (double)TIME_TO_MOVE_TO_LEVEL_INFO;
//            Point rucksackPosition = levelInfo.getExperienceProgressBar().getPosition();
//            int rucksackX = rucksackPosition.getX();
//            int rucksackY = rucksackPosition.getY();
//            double newX = startX + (rucksackX - startX) * sm;
//            double newY = startY + (rucksackY - startY) * sm;
//            setPosition(new Point((int)newX, (int)newY)); 
//        } else {
//            if (!isTimeToJumpOver()) {
//                
//                if (!jumping) {
//                    setStartPosition(getPosition());
//                    int startX = getStartPosition().getX();
//                    int startY = getStartPosition().getY();
//                    jumping = true;
//                    Random random = new Random();
//                    int jumpEndX = startX - SM_X + random.nextInt(SM_X + SM_X);
//                    int jumpEndY = startY - SM_Y + random.nextInt(SM_Y + SM_Y);
//                    setJumpEnd(new Point(jumpEndX, jumpEndY));
//                }
//                int startX = getStartPosition().getX();
//                int startY = getStartPosition().getY();
//                long t = new Date().getTime() - createdAt;
//                if (t <= TIME_TO_JUMP_FROM_CREATION_POINT) {
//                    double sm = (double)t / (double)TIME_TO_JUMP_FROM_CREATION_POINT;
//                    double sina = Math.sin(sm * Math.PI);
//                    double jumpz = (double) (sina * SM_JUMP_Z);
//                    int jumpEndX = jumpEnd.getX();
//                    int jumpEndY = jumpEnd.getY();
//                    double newX = startX + (jumpEndX - startX) * sm;
//                    double newY = startY + (jumpEndY - startY) * sm - jumpz;
//                    setPosition(new Point((int)newX, (int)newY));
//                }
//            }
//        }
//    }

}
