// localization
import StringConstants from '../localization/StringConstants.js';
import MessageSource from '../localization/MessageSource.js';

// rest
import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../rest/multithreading/ConnectionExceptionSettings.js';

// tray icon
import MessageType from '../trayicon/MessageType.js';

export default class UserPetsController {
  
  userPetsView;
  trayIcon;
  messageSource;
  petService;
  createPetController;
  settings;
  gameController;
  backgroundWorkManager;
  
  showView() {
    this.refresh();
    this.userPetsView.showView();
  }

  hideView() {
    this.userPetsView.hideView();
  }

//  private class RefreshBackgroundWork extends BackgroundWork<Void, PetListResult, Object> {
//
//    @Override
//    public PetListResult doInBackground() throws Exception {
//      return petService.getUserPets();
//    }
//    
//    @Override
//    public void completed(PetListResult result) {
//      if (result.isSuccess()) {
//        userPetsView.setPetsInfo(result.getPetsInfo());
//        if (result.getPetsInfo().length == 0) {
//          createPetController.showView();
//        }
//      } else {
//        trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
//      }
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      log.error("RefreshBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null)
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR); 
//    }
//  }
  
  refresh() {
    const work = new BackgroundWork();
    work.failed = (ex) => {
      console.error("RefreshBackgroundWork failed %o.", ex);
      const message = messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message, MessageType.ERROR); 
    }
    work.completed = (petListResult) => {
      if (petListResult.success) {
        this.userPetsView.petsInfo = petListResult.petsInfo;
        if (petListResult.petsInfo.length == 0) {
          this.createPetController.showView();
        }
      } else {
        this.trayIcon.showTrayMessage(petListResult.message, MessageType.ERROR);
      }
    }
    work.doInBackground = () => {
      return this.petService.getUserPets();
    }
    work.view = this.userPetsView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }
  
  create(createPetArg) {
    this.createPetController.showView();
  }
  
  
//  private class SelectBackgroundWork extends BackgroundWork<SelectPetArg, SelectPetResult, Object> {
//
//    @Override
//    public SelectPetResult doInBackground() throws Exception {
//      return petService.select(getArgument());
//    }
//    
//    @Override
//    public void completed(SelectPetResult result) {
//      try {
//        if (result.isSuccess()) {
//          settings.setPetId(getArgument().getPetId());
//          settings.save();
//          userPetsView.hideView();
//          gameController.showView();
//        } else {
//         trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
//        }
//      } catch (Exception ex) {
//        log.error("SelectBackgroundWork.", ex);
//        String message = messageSource.getMessage(StringConstants.ERROR, null, null) 
//            + ": " + ex.toString();
//        trayIcon.showTrayMessage(message,  MessageType.ERROR);
//      }
//    }
//    
//    @Override
//    public void failed(Exception ex) {
//      log.error("SelectBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR, null, null) 
//          + ": " + ex.toString();
//      trayIcon.showTrayMessage(message,  MessageType.ERROR);
//    }
//  }
  
  select(selectPetArg) {
    const work = new BackgroundWork();
    work.failed = () => {
      console.error("SelectBackgroundWork failed %o.", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null) 
          + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message,  MessageType.ERROR);
    }
    work.completed = (result) => {
      try {
        if (result.success) {
          this.settings.petId = work.argument.petId;
          this.settings.save();
          this.userPetsView.hideView();
          this.gameController.showView();
        } else {
          this.trayIcon.showTrayMessage(selectPetArg.message, MessageType.ERROR);
        }
      } catch (ex) {
        console.error("SelectBackgroundWork %o.", ex);
        const message = this.messageSource.getMessage(StringConstants.ERROR, null, null) 
            + ": " + ex.toString();
        this.trayIcon.showTrayMessage(message,  MessageType.ERROR);
      }
    }
    work.doInBackground = () => {
      return this.petService.select(work.argument);
    }
    work.argument = selectPetArg;
    work.view = this.userPetsView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }
  
  initialize() {
    this.userPetsView.addRefreshListener((sender, arg) => {
      try {
        this.refresh();
      } catch (ex) {
        console.error("RefreshListener %o.",ex);
        const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
            + ": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    
    
    this.userPetsView.addCreateListener((sender, arg) => {
      try {
        this.create(arg);
      } catch(ex) {
        console.error("CreateListener %o.", ex);
        const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
            +": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    this.userPetsView.addSelectListener((sender, selectPetArg) => {
      try {
        this.select(selectPetArg);
      } catch(ex) {
        console.error("SelectListener %o.", ex);
        const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
            +": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
  }
}

