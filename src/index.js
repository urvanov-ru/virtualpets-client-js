
// domain
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
import ResourceManager from './view/ResourceManager.js';
import GameEngine from './view/GameEngine.js';


let o = new AchievementInfoGameObject();
o.achievementLabel = 'test';
alert(o.achievementLabel);

//let addPrivateChatArg = new AddPrivateChatArg();


