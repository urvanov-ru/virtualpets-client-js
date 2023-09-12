
export default class Point {
  x = 0;
  y = 0;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  clone() {
    return new Point(this.x, this.y);
  }
}
