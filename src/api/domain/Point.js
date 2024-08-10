export default class Point {
  x;
  y;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  clone() {
    return new Point(this.x, this.y);
  }
}
