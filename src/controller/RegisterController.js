// multithreading
import BackgroundWork from '../api/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../api/multithreading/ConnectionExceptionSettings.js';
import NameIsBusyException from '../api/exception/NameIsBusyException.js';
import IncompatibleVersionException from '../api/exception/IncompatibleVersionException.js';

// localization
import StringConstants from '../localization/StringConstants.js';

// trayicon
import MessageType from '../trayicon/MessageType.js';

export default class RegisterController {

  registerView;
  trayIcon;
  messageSource;
  userService;
  publicService;
  authenticationController;
  backgroundWorkManager;

  showView() {
    this.registerView.showView();
  }
  
  set callback(callback) {
    this.registerView.callback = callback;
  }

  hideView() {
    this.registerView.hideView();
  }

  //private class RegisterBackgroundWork extends
  //    BackgroundWork<RegisterArgument, Void, Object> {

  //  @Override
  //  public Void doInBackground() throws Exception {
  //    publicService.register(getArgument());
  //    return null;
  //  }

  //  @Override
  //  public void completed(Void result) {
  //    registerView.hideView();
  //  }
  //  
//    @Override
//    public void failed(Exception ex) {
//      if (ex instanceof NameIsBusyException) {
//        String message = messageSource.getMessage(StringConstants.NAME_IS_BUSY, null, null);
//        trayIcon.showTrayMessage(message, MessageType.INFO);
//      } else if (ex instanceof IncompatibleVersionException) {
//        IncompatibleVersionException ive = (IncompatibleVersionException)ex;
//        String message = messageSource.getMessage(StringConstants.INCOMPATIBLE_VERSION, null, null);
//        message = String.format(message, ive.getServerVersion());
//        trayIcon.showTrayMessage(message, MessageType.INFO);
//      } else {
//        log.error("RegisterBackgroundWork failed.", ex);
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//    }
//  };

  #register(registerArgument) {
    this.authenticationController.clearCredentials();
    
    const work = new BackgroundWork();
    work.argument = registerArgument;
    work.doInBackground = this.publicService.register.bind(this.publicService, work.argument);
    work.completed = () => {
      this.registerView.hideView();
    };
    work.failed = (ex) => {
      if (ex instanceof NameIsBusyException) {
        const message = this.messageSource.getMessage(StringConstants.NAME_IS_BUSY, null, null);
        this.trayIcon.showTrayMessage(message, MessageType.INFO);
      } else if (ex instanceof IncompatibleVersionException) {
        const message = messageSource.getMessage(StringConstants.INCOMPATIBLE_VERSION, null, null);
        message = String.format(message, ex.serverVersion);
        this.trayIcon.showTrayMessage(message, MessageType.INFO);
      } else {
        console.error("RegisterBackgroundWork failed %o.", ex);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR, null, null)
            + ": "
            + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    }; 
    

    work.view = this.registerView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  initialize() {
    this.registerView
        .addRegisterListener((sender,registerArgument) => {
            try {
              this.#register(registerArgument);
            } catch (ex) {
              console.error("RegisterListener %o.", ex);
              const message = this.messageSource.getMessage(
                  StringConstants.ERROR, null, null);
              this.trayIcon.showTrayMessage(message, MessageType.ERROR);
            }
          }
        );
  }

}
