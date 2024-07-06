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

  refresh() {
    const work = new BackgroundWork();
    work.failed = (ex) => {
      console.error("RefreshBackgroundWork failed %o.", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR, null, null)
          + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message, MessageType.ERROR); 
    }
    work.completed = (petListResult) => {
      this.userPetsView.petsInfo = petListResult.petsInfo;
      if (petListResult.petsInfo.length === 0) {
        this.createPetController.showView();
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
  

  select(selectPetArg) {
    const work = new BackgroundWork();
    work.failed = () => {
      console.error("SelectBackgroundWork failed %o.", ex);
      const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null) 
          + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message,  MessageType.ERROR);
    }
    work.completed = (result) => {
      try {
        this.settings.petId = work.argument.petId;
        this.settings.save();
        this.userPetsView.hideView();
        this.gameController.showView();
      } catch (ex) {
        console.error("SelectBackgroundWork %o.", ex);
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null) 
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
  
  delete(petId) {
    const work = new BackgroundWork();
    work.failed = () => {
      console.error("DeleteBackgroundWork failed %o.", ex);
      const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null) 
          + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message,  MessageType.ERROR);
    }
    work.completed = (result) => {
      try {
        this.refresh();
      } catch (ex) {
        console.error("DeleteBackgroundWork %o.", ex);
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null) 
            + ": " + ex.toString();
        this.trayIcon.showTrayMessage(message,  MessageType.ERROR);
      }
    }
    work.doInBackground = () => {
      return this.petService.delete(work.argument);
    }
    work.argument = petId;
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
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null)
            + ": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    
    
    this.userPetsView.addCreateListener((sender, arg) => {
      try {
        this.create(arg);
      } catch(ex) {
        console.error("CreateListener %o.", ex);
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null)
            +": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    this.userPetsView.addSelectListener((sender, selectPetArg) => {
      try {
        this.select(selectPetArg);
      } catch(ex) {
        console.error("SelectListener %o.", ex);
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null)
            +": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    this.userPetsView.addDeleteListener((sender, deletePetArg) => {
      try {
        this.delete(deletePetArg);
      } catch (ex) {
        console.error("DeleteListener %o.", ex);
        const message = this.this.messageSource.getMessage(StringConstants.ERROR, null, null)
            +": " + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
  }
}

