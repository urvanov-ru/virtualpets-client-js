export default class PathPoint {
  x = 0;
  y = 0;
  state = 0;

  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
  }

  clone() {
    return new PathPoint(x, y, state);
  }
}
