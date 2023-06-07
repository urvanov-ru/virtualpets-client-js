export default class HiddenObjectsGame {
  
  static get MAX_PLAYERS_COUNT() { return 4; }
  
  players = {}; // new HashMap<Integer, HiddenObjectsPlayer>();
  objects; // Integer[]
  collectedObjects; // HiddenObjectsCollected[]
  gameStarted = false;
  gameOver = false;
  reward; // HiddenObjectsReward
  secondsLeft = 0;
  
  get players() {
    const result = new Array(MAX_PLAYERS_COUNT);
    let n = 0;
    for (const p of players.values()) {
      result[n] = p;
      n++;
    }
    return result;
  }
  
  clearPlayers() {
    this.players.clear();
  }
  
  addPlayer(player) {
    this.players.put(player.userId, player);
  }
  
  getPlayer(userId) {
    return players.get(userId);
  }
}
