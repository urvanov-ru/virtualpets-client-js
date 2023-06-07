// rest domain
import AchievementCode from './rest/domain/AchievementCode.js';
import BuildingMaterialType from './rest/domain/BuildingMaterialType.js';
import ChatMessage from './rest/domain/ChatMessage.js';
import Cloth from './rest/domain/Cloth.js';
import ClothType from './rest/domain/ClothType.js';
import CollectObjectArg from './rest/domain/CollectObjectArg.js';
import CreatePetArg from './rest/domain/CreatePetArg.js';
import CreatePetResult from './rest/domain/CreatePetResult.js';
import DrinkArg from './rest/domain/DrinkArg.js';
import DrinkType from './rest/domain/DrinkType.js';
import FoodType from './rest/domain/FoodType.js';
import GetPetBooksResult from './rest/domain/GetPetBooksResult.js';
import GetPetClothsResult from './rest/domain/GetPetClothsResult.js';
import GetPetDrinksResult from './rest/domain/GetPetDrinksResult.js';
import GetPetFoodsResult from './rest/domain/GetPetFoodsResult.js';
import GetPetJournalEntriesResult from './rest/domain/GetPetJournalEntriesResult.js';
import GetPetRucksackInnerResult from './rest/domain/GetPetRucksackInnerResult.js';
import GetRoomInfoResult from './rest/domain/GetRoomInfoResult.js';
import GetServersArg from './rest/domain/GetServersArg.js';
import GetTownInfoResult from './rest/domain/GetTownInfoResult.js';
import HiddenObjectsCollected from './rest/domain/HiddenObjectsCollected.js';
import HiddenObjectsGame from './rest/domain/HiddenObjectsGame.js';
import HiddenObjectsGameType from './rest/domain/HiddenObjectsGameType.js';
import HiddenObjectsPlayer from './rest/domain/HiddenObjectsPlayer.js';
import HiddenObjectsReward from './rest/domain/HiddenObjectsReward.js';

// domain
import GameObject from './domain/GameObject.js';
import AchievementInfoGameObject from './domain/AchievementInfoGameObject.js';
import AddPrivateChatArg from './domain/AddPrivateChatArg.js'
import AnimationOverArg from './domain/AnimationOverArg.js'
import AnimationOverListener from './domain/AnimationOverListener.js';
import BookGameObject from './domain/BookGameObject.js';
import BuildingGameObject from './domain/BuildingGameObject.js';
import BuildingMaterialGameObject from './domain/BuildingMaterialGameObject.js';
import BuildMenuGameObject from './domain/BuildMenuGameObject.js';
import ClickedArg from './domain/ClickedArg.js';
import ClickedListener from './domain/ClickedListener.js';
import ClothGameObject from './domain/ClothGameObject.js';
import CollectableGameObject from './domain/CollectableGameObject.js';
import Dimension from './domain/Dimension.js';
import DressingRoomData from './domain/DressingRoomData.js';
import EventListener from './domain/EventListener.js';
import TownData from './domain/TownData.js';
import TreasuryData from './domain/TreasuryData.js';
import TileType from './domain/TileType.js';
import RucksackGameObject from './domain/RucksackGameObject.js';
import ProgressBarGameObject from './domain/ProgressBarGameObject.js';
import Point from './domain/Point.js';
import PopupMenuGameObject from './domain/PopupMenuGameObject.js';
import MouseMoveListener from './domain/MouseMoveListener.js';
import HiddenObjectsGameData from './domain/HiddenObjectsGameData.js';
import LabelGameObject from './domain/LabelGameObject.js';
import MenuItem from './domain/MenuItem.js';
import MouseMoveArg from './domain/MouseMoveArg.js';
import HighlightGameObject from './domain/HighlightGameObject.js';
import HighlightGameObjectImpl from './domain/HighlightGameObjectImpl.js';
import BoxGameObject from './domain/BoxGameObject.js';
import RoomData from './domain/RoomData.js';
import PetGameObject from './domain/PetGameObject.js';
import LevelInfoGameObject from './domain/LevelInfoGameObject.js';
import MessageBoxInnerGameObject from './domain/MessageBoxInnerGameObject.js';
import MessageBoxGameObject from './domain/MessageBoxGameObject.js';
import ExperienceGameObject from './domain/ExperienceGameObject.js';
import JournalGameObject from './domain/JournalGameObject.js';


// tiles
import TilesEngine from './tiles/TilesEngine.js';


// view
import GameObjectRenderBase from './view/domain/GameObjectRenderBase.js';
import LabelGameObjectRenderBase from './view/domain/LabelGameObjectRenderBase.js';
import PopupMenuGameObjectRenderBase from './view/domain/PopupMenuGameObjectRenderBase.js';
import ProgressBarGameObjectRenderBase from './view/domain/ProgressBarGameObjectRenderBase.js';
import AfternoonTeaView from './view/AfternoonTeaView.js';
import DressingRoomView from './view/DressingRoomView.js';
import RoomView from './view/RoomView.js';
import TownView from './view/TownView.js';
import TreasuryView from './view/TreasuryView.js';
import RubbishView from './view/RubbishView.js';
import GameEngine from './view/GameEngine.js';
import GameFrame from './view/GameFrame.js';


// localization
import StringConstants from './localization/StringConstants.js';

// settings
import Settings from './settings/Settings.js';
import MemorySettings from './settings/MemorySettings.js';
import LocalStorageSettings from './settings/LocalStorageSettings.js';


// resources
import ProgressInfo from './resources/ProgressInfo.js';
import ResourceHolder from './resources/ResourceHolder.js';
import ResourceManager from './resources/ResourceManager.js';
import ResourceLoader from './resources/ResourceLoader.js';
import BaseGameLoadWorker from './resources/BaseGameLoadWorker.js';
import RoomLoadWorker from './resources/RoomLoadWorker.js';

// controller
import RoomController from './controller/RoomController.js';
import GameController from './controller/GameController.js';


document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
  let roomData = new RoomData();
  let roomView = new RoomView(roomData);

  let gameController = new GameController();
  // gameController.gameView = 
  gameController.showView();

  let roomController = new RoomController();
  roomController.roomData = roomData;
  roomController.roomView = roomView;
});


//let addPrivateChatArg = new AddPrivateChatArg();


