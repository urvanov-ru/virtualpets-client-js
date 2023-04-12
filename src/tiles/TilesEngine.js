
import PathPoint from './PathPoint.js';

export default class TilesEngine {
    
  static get DEFAULT_TILE_WIDTH() { return 150; }

  static get DEFAULT_TILE_HEIGHT() { return 150; }

    

  tiles = null; // [][]

  _tileWidth = 0;

  _tileHeight = 0;

  gameObjects = new Set();


  /**
   * @param width
   *            Width in tiles.
   * @param height
   *            Height in tiles.
   * @param tileWidth
   *            Width of tile.
   * @param tileHeight
   *            Height of tile.
   */
  constructor(...params) {
    switch (params.length) {
      case 4: 
        initWidthHeightTileWTileH(params[0], params[1], params[2], params[3]);
        break;
      case 3:
        initTilesTileWTileH(params[0], params[1], params[2]);
        break;
      case 1:
        initTiles(params[0]);
        break;
      case 2:
        initTiles(params[0], params[1]);
        break;
    }
  }
  
  #initWidthHeightTileWTileH(width, height, tileWidth, tileHeight) {
    initTiles(width, height);
    this._tileWidth = tileWidth;
    this._tileHeight = tileHeight;
  }

  createAndFillTiles(width, height) {
    tiles = new Array[width];
    for (let n = 0; n < tiles.length; n++) {
      tiles[n] = new Array[height];
      tiles[n].fill(TileType.NORMAL);
    }
  }

  #initTilesTileWTileH(tiles, tileWidth, tileHeight) {
    this.tiles = tiles;
    this._tileWidth = tileWidth;
    this._tileHeight = tileHeight;
  }

  #initTiles(tiles) {
    this.tiles = tiles;
    this._tileWidth = DEFAULT_TILE_WIDTH;
    this._tileHeight = DEFAULT_TILE_HEIGHT;
  }

  #initWidthHeight(width, height) {
    createAndFillTiles(width, height);
    this.tileWidth = DEFAULT_TILE_WIDTH;
    this.tileHeight = DEFAULT_TILE_HEIGHT;
  }

  getTileType(x, y) {
    return tiles[x][y];
  }

  translateToTileCoordinates(x, y) {
    return new Point(x / tileWidth, y / tileHeight);
  }

  translateToTileCoordinates(x, y) {
    return new Point(Math.trunc(x / tileWidth), Math.trunc(y / tileHeight));
  }
  
  get tileWidth() {
    return this._tileWidth;
  }
  
  get tileHeight() {
    return this._tileHeight;
  }

  findPath(start, dest) {
//  refreshTilesType();
//  int startX = start.x;
//  int startY = start.y;
//  int destX = dest.x;
//  int destY = dest.y;
//  if (tiles[destX][destY] == TileType.WALL) {
//    return null;
//  }
//  int[] a[] = new int[tiles.length][tiles[0].length];
//  ROWS: for (let n = 0; n < tiles.length; n++) {
//    COLUMNS: for (int m = 0; m < tiles[0].length; m++) {
//      a[n][m] = tiles[n][m] == TileType.NORMAL ? 0 : 1;
//    }
//  }
//  Stack<PathPoint> lstCurr = new Stack<PathPoint>();
//  lstCurr.ensureCapacity(10);
//  Stack<PathPoint> lstBest = null;
//  int nCurrSteps = 0;
//  int nBestSteps = Integer.MAX_VALUE;
//  PathPoint curPos = new PathPoint(startX, startY, 0);
//  a[startX][startY] = 2;
//  boolean bEnd = false;
//  lstCurr.add(curPos);
//  lstCurr.ensureCapacity(a[0].length + a.length);
//  int xmax = a.length - 1;
//  int ymax = a[0].length - 1;

//  int[][][] aPriority = new int[a.length][a[0].length][5];

//  CALC_PRIORITY_OUTER: for (int n = 0; n < aPriority.length; n++) {
//      CALC_PRIORITY_INNER: for (int m = 0; m < aPriority[0].length; m++) {
//          int[] aPriorityCase = new int[5];
//          int nPriorityXDir = (int) Math.signum(destX - n);
//          int nPriorityYDir = (int) Math.signum(destY - m);
//          if (nPriorityXDir > 0) {
//              aPriorityCase[0] = 1;
//              if (nPriorityYDir > 0) {
//                  aPriorityCase[1] = 2;
//                  aPriorityCase[2] = 3;
//                  aPriorityCase[3] = 0;
//              } else {
//                  aPriorityCase[1] = 0;
//                  aPriorityCase[2] = 3;
//                  aPriorityCase[3] = 2;
//              }
//          } else if (nPriorityXDir < 0) {
//              aPriorityCase[0] = 3;
//              if (nPriorityYDir > 0) {
//                  aPriorityCase[1] = 2;
//                  aPriorityCase[2] = 1;
//                  aPriorityCase[3] = 0;
//              } else {
//                  aPriorityCase[1] = 0;
//                  aPriorityCase[2] = 1;
//                  aPriorityCase[3] = 2;
//              }
//          } else {
//              if (nPriorityYDir > 0) {
//                  aPriorityCase[0] = 2;
//                  aPriorityCase[1] = 1;
//                  aPriorityCase[2] = 0;
//              } else {
//                  aPriorityCase[0] = 0;
//                  aPriorityCase[1] = 1;
//                  aPriorityCase[2] = 2;
//              }
//              aPriorityCase[3] = 3;
//          }
//          aPriorityCase[4] = 4;
//          aPriority[n][m] = aPriorityCase;
//      }
//  }

//  FINDPATH: while (!bEnd) {
//      int nx = curPos.x;
//      int ny = curPos.y;
//      // System.out.println("nx="+nx);
//      // System.out.println("ny="+ny);
//      // System.out.println("state="+curPos.state);
//      if ((nx == destX) && (ny == destY)) {
//         if (nBestSteps > nCurrSteps) {
//              nBestSteps = nCurrSteps;
//              lstBest = new Stack<PathPoint>();
//              Iterator<PathPoint> it = lstCurr.iterator();
//              while (it.hasNext()) {
//                  PathPoint p = it.next();
//                  try {
//                      lstBest.add((PathPoint) p.clone());
//                  } catch (CloneNotSupportedException e) {
//                      log.error("FINDPATH saving bestSteps error. ", e);
//                  }
//              }
//          }
//      }
//      if (nCurrSteps >= nBestSteps) {
//        curPos.state = 4;
//      }

//      switch (aPriority[curPos.x][curPos.y][curPos.state]) {
//      case 0:
//          if (ny == 0) {
//              curPos.state++;
//          } else {
//              ny--;
//              if (a[nx][ny] == 0) {
//                  curPos = new PathPoint(nx, ny, 0);
//                  lstCurr.add(curPos);
//                  a[nx][ny] = 2;
//                  nCurrSteps++;
//              } else {
//                  curPos.state++;
//              }
//          }
//          break;
//      case 1:
//          if (nx == xmax) {
//              curPos.state++;
//          } else {
//              nx++;
//              if (a[nx][ny] == 0) {
//                  curPos = new PathPoint(nx, ny, 0);
//                  lstCurr.add(curPos);
//                  a[nx][ny] = 2;
//                  nCurrSteps++;
//              } else {
//                  curPos.state++;
//              }
//          }
//          break;
//      case 2:
//          if (ny == ymax) {
//              curPos.state++;
//          } else {
//              ny++;
//              if (a[nx][ny] == 0) {
//                  curPos = new PathPoint(nx, ny, 0);
//                  lstCurr.add(curPos);
//                  a[nx][ny] = 2;
//                  nCurrSteps++;
//              } else {
//                  curPos.state++;
//              }
//          }
//          break;
//      case 3:
//          if (nx == 0) {
//              curPos.state++;
//          } else {
//              nx--;
//              if (a[nx][ny] == 0) {
//                  curPos = new PathPoint(nx, ny, 0);
//                  lstCurr.add(curPos);
//                  a[nx][ny] = 2;
//                  nCurrSteps++;
//              } else {
//                  curPos.state++;
//              }
//          }
//          break;

//      case 4:
//          a[nx][ny] = 0;
//          lstCurr.remove(curPos);
//          nCurrSteps--;
//          try {
//              curPos = lstCurr.lastElement();
//              curPos.state++;
//          } catch (NoSuchElementException ex) {
//              if (lstBest == null) {
//                  return null;
//              }
//              break FINDPATH;
//          }
//          break;
//      }
//  }

//  // TODO: convert to stream operations of Java 8.
//  Point[] result = new Point[lstBest.size()];
//  for (int n = 0; n < lstBest.size(); n++) {
//      PathPoint pp = lstBest.get(n);
//      result[n] = new Point(pp.x, pp.y);
//  }
    return result;
  }

  setTileType(x, y, tileType) {
    this.tiles[x][y] = tileType;
  }

  setTileType(tilesPoint, tileType) {
    setTileType(tilesPoint.x, tilesPoint.y, tileType);
  }

  getTileType(playerTarget) {
    return getTileType(playerTarget.x, playerTarget.y);
  }

  get tileWidth() {
    return this.tileWidth;
  }

  get tileHeight() {
    return this.tileHeight;
  }

  checkTileCoordinate(moveTarget) {
    return moveTarget.x >= 0 && moveTarget.y >= 0
        && moveTarget.x < tiles.length
        && moveTarget.y < tiles[0].length;
  }

  translateToTileCoordinates(go) {
    let goHeight = go.dimension.height();
    let position = go.position;
    let x = position.x;
    let y = position.y - position.y % this.tileHeight;
    if (goHeight % this.tileHeight == 0) {
      goHeight--;
    }
    y += goHeight;
    return translateToTileCoordinates(x, y);
  }

  translateFromTileCoordinates(point) {
    return new Point(point.x * this.tileWidth(),
        point.y * this.tileHeight);
  }
    
  translateFromTileCoordinates(go, point) {
    let goHeight = go.deminsion.height;
    let p = new Point();
    p.x = point.x * this.tileWidth;
    p.y = point.y * this.tileHeight - goHeight + this.tileHeight;
    return p;
  }

  applyTileType(tileCoordinates, tileTypes) {
    let tileX = tileCoordinates.x;
    let tileY = tileCoordinates.y;
    let tileRight = tileX + tileTypes.length;
    let tileBottom = tileY + tileTypes[0].length;
    if (tileRight >= tiles.length) {
      tileRight = tiles.length - 1;
    }
    if (tileBottom >= tiles[0].length) {
      tileBottom = tiles[0].length - 1;
    }
    for (let x = tileX >=0 ? tileX : 0; x < tileRight; x++) {
      for (let y = tileY >=0 ? tileY : 0; y < tileBottom; y++) {
        let tileType = tileTypes[x - tileX][y - tileY];
        if (tileType != null && tileType != TileType.NORMAL) {
          tiles[x][y] = tileTypes[x - tileX][y - tileY];
        }
      }
    }
  }

  addGameObject(go) {
    gameObjects.add(go);
  }

  removeGameObject(go) {
    gameObjects.delete(go);
  }

  refreshTilesType() {
    for (const a of tiles) {
      a.fill(TileType.NORMAL);
    }
    for (const go of gameObjects) {
      applyTilesType(go);
    }
  }

  applyTilesType(go) {
    let tileTypes = go.getTileTypes();
    if (tileTypes != null && go.isVisible()) {
      let tileCoordinates = translateToTileCoordinates(go);
      let dimension = go.dimension;
      let height = dimension.height;
        tileCoordinates.y = Math.trunc(tileCoordinates.y
            - height / this.tileHeight + 1);
        applyTileType(tileCoordinates, tileTypes);
      }
  }

  translateToTileCoordinates(mousePosition) {
    return this.translateToTileCoordinates(mousePosition.x, mousePosition.y);
  }
}
