// rest domain
import PetType from './rest/domain/PetType.js';

// domain
import RoomData from './domain/RoomData.js';

// view
import ViewImplFactory from './view/component/ViewImplFactory.js';
import GameView from './view/GameView.js';

import MessageSource from './localization/MessageSource.js';

// settings
import LocalStorageSettings from './settings/LocalStorageSettings.js';

// resources
import ResourceManager from './resources/ResourceManager.js';
import RoomLoadWorker from './resources/RoomLoadWorker.js';

// controller
import RoomController from './controller/RoomController.js';
import GameController from './controller/GameController.js';

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  canvas.width = 320;
  canvas.height = 240;
  
  const scale = canvas.style.clientWidth / GameView.ORIGINAL_WIDTH;

  
  
  const roomData = new RoomData();
  const gameView = new GameView();
  
  const resourceManager = new ResourceManager();
  const roomLoadWorker = new RoomLoadWorker(resourceManager, scale, PetType.CAT); 
  const gameController = new GameController();
  const viewImplFactory = new ViewImplFactory();
  const messageSource = new MessageSource();

  gameView.resourceManager = resourceManager;
  gameView.viewImplFactory = viewImplFactory;
  
  gameController.gameView = gameView;
  gameController.messageSource = messageSource;
  
  viewImplFactory.resourceManager = resourceManager;
  
  gameController.showView();
  
  
});


//let addPrivateChatArg = new AddPrivateChatArg();


