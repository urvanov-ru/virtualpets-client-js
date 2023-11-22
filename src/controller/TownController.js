// domain
import HighlightGameObject from '../domain/HighlightGameObject.js';
import TownData from '../domain/TownData.js';
import GameObject from '../domain/GameObject.js';
import Point from '../domain/Point.js';
import Dimension from '../domain/Dimension.js';
import BaseGameController from './BaseGameController.js';

// resources
import ResourceManager from '../resources/ResourceManager.js';

// localization
import StringConstants from '../localization/StringConstants.js';
import MessageSource from '../localization/MessageSource.js';

// rest
import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../rest/multithreading/ConnectionExceptionSettings.js';

// tray icon
import MessageType from '../trayicon/MessageType.js';
export default class TownControllerImpl extends BaseGameController {
  petService;
  townView;
  gameController;

  townData;

  townService;

  showView() {
    // TODO Auto-generated method stub

  }

  hideView() {
    // TODO Auto-generated method stub

  }

  initialize() {
    this.baseGameView
        .addInitializationCompletedListener((sender, data) => {
          this.getTownInfo();
        });
    this.townData = new TownData();
    const background = new GameObject();
    background.position = new Point(0, 0);
    background.animationImageIds = [[ResourceManager.IMAGE_TOWN_BACKGROUND]];
    background.addMouseMoveListener((backgroundMouseMoveArg) => {
      this.townView.showDefaultCursor();
      this.townView.toolTipText = "";
      this.highlightObject = null;
    });
    this.addGameObject(background);
    this.townData.background = background;

    const dressingRoom = new HighlightGameObject();
    dressingRoom.position = new Point(TownData.ORIGINAL_DRESSING_ROOM_X,
        TownData.ORIGINAL_DRESSING_ROOM_Y);
    dressingRoom.animationImageIds = [[ ResourceManager.IMAGE_TOWN_DRESSING_ROOM], [ResourceManager.IMAGE_TOWN_DRESSING_ROOM_HIGHLIGHT]];
    dressingRoom.addMouseMoveListener((dressingRoomMouseMoveArg) => {
      this.townView.showHandCursor();
      this.townView.toolTipText = "";
      this.highlightObject = dressingRoom;
    });
    dressingRoom.addClickedListener((clickedArg) => {
      this.gameController.showDressingRoom();
    });
    this.addGameObject(dressingRoom);
    this.townData.dressingRoom = dressingRoom;

    const treasury = new HighlightGameObject();
    treasury.position = new Point(TownData.ORIGINAL_TREASURY_X,
        TownData.ORIGINAL_TREASURY_Y);
    treasury.animationImageIds = [[ ResourceManager.IMAGE_TOWN_TREASURY], [ResourceManager.IMAGE_TOWN_TREASURY_HIGHLIGHT]];
    treasury.addMouseMoveListener((mouseMoveArg) => {
      this.townView.showHandCursor();
      this.townView.toolTipText = "";
      this.highlightObject = treasury;
    });
    treasury.addClickedListener((clickedArg) => {
      this.gameController.showTreasury();
    });
    this.addGameObject(treasury);
    this.townData.treasury =treasury;

    const arrowLeft = new HighlightGameObject();
    arrowLeft.position = new Point(TownData.ORIGINAL_ARROW_LEFT_X,
        TownData.ORIGINAL_ARROW_LEFT_Y);
    arrowLeft.animationImageIds = [[ ResourceManager.IMAGE_TOWN_ARROW_LEFT], [ResourceManager.IMAGE_TOWN_ARROW_LEFT_HIGHLIGHT]];
    arrowLeft.addMouseMoveListener((mouseMoveArg) => {
      this.townView.showHandCursor();
      this.townView.toolTipText = "";
      this.highlightObject = arrowLeft;
    });
    arrowLeft.addClickedListener((clickedArg) => {
      this.gameController.showRoom();
    });
    this.addGameObject(arrowLeft);
    this.townData.arrowLeft = arrowLeft;

    const rubbish = new HighlightGameObject();
    rubbish.position = new Point(TownData.ORIGINAL_RUBBISH_X,
        TownData.ORIGINAL_RUBBISH_Y);
    
    rubbish.animationImageIds = [[ ResourceManager.IMAGE_TOWN_RUBBISH], [ResourceManager.IMAGE_TOWN_RUBBISH_HIGHLIGHT ]];
    rubbish.addMouseMoveListener((mouseMoveArg) => {
      this.townView.showHandCursor();
      this.townView.toolTipText = "";
      this.highlightObject = rubbish;
    });
    rubbish.addClickedListener((clickedArg) => {
      this.gameController.showRubbish();
    });
    this.addGameObject(rubbish);
    this.townData.rubbish = rubbish;
    
    
    const afternoonTea = new HighlightGameObject();
    afternoonTea.position = new Point(TownData.ORIGINAL_AFTERNOONTEA_X,
        TownData.ORIGINAL_AFTERNOONTEA_Y);
    afternoonTea.animationImageIds = [[ ResourceManager.IMAGE_TOWN_AFTERNOONTEA], [ResourceManager.IMAGE_TOWN_AFTERNOONTEA_HIGHLIGHT]];
    afternoonTea.addMouseMoveListener((mouseMoveArg) => {
      this.townView.showHandCursor();
      this.townView.toolTipText = "";
      this.highlightObject = afternoonTea;
    });
    afternoonTea.addClickedListener((clickedArg) => {
      this.gameController.showAfternoonTea();
    });
    this.addGameObject(afternoonTea);
    this.townData.afternoonTea = afternoonTea;

    this.initializeLevelInfo();
    this.initializeAchievementInfo();
    this.initializeJournal();
  }


//  private class GetTownInfoBackgroundWork extends
//      BackgroundWork<Void, GetTownInfoResult, Void> {
//
//    @Override
//    public GetTownInfoResult doInBackground() throws Exception {
//      return townService.getTownInfo();
//    }
//
//    @Override
//    public void completed(GetTownInfoResult result) {
//      logger.info("GetTownInfoBackgroundWork finished.");
//      setTownInfo(result);
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      logger.error("GetTownInfoBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//
//  }

  getTownInfo() {
    const work = new BackgroundWork();
    work.doInBackground = () => {
    return this.townService.getTownInfo();
    };
    work.completed = (getTownInfoResult) => {
      console.info("GetTownInfoBackgroundWork finished.");
      this.townInfo =getTownInfoResult;
    };
    work.failed = (exception) => {
      console.error("GetTownInfoBackgroundWork failed %o.", exception);
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = null;
    work.view = this.baseGameView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  set townInfo(getTownInfoResult) {
    this.updateLevelInfo(getTownInfoResult.levelInfo, new Point(400, 300));

    this.updateAchievementInfo(getTownInfoResult.achievements);

    this.journal.newEntriesCountLabel.text = 
        getTownInfoResult.newJournalEntriesCount === 0 ? "" : ""
            + getTownInfoResult.newJournalEntriesCount;
    this.journal.newEntriesCountLabel.visible = 
        getTownInfoResult.newJournalEntriesCount > 0;
  }

  set townView(townView) {
    this.baseGameView = townView;
    this.townView = townView;
  }

}
