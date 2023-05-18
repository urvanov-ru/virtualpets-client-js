
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

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);
});




//let addPrivateChatArg = new AddPrivateChatArg();


