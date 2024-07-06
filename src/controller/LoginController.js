// localization
import StringConstants from '../localization/StringConstants.js';
import MessageSource from '../localization/MessageSource.js';

// rest
import BackgroundWork from '../rest/multithreading/BackgroundWork.js';
import ConnectionExceptionSettings from '../rest/multithreading/ConnectionExceptionSettings.js';

// rest domain
import GetServersArg from '../rest/domain/GetServersArg.js';
import ServerInfo from '../rest/domain/ServerInfo.js';

// rest exception
import IncompatibleVersionException from '../rest/exception/IncompatibleVersionException.js';
import ForbiddenException from '../rest/exception/ForbiddenException.js';

// tray icon
import MessageType from '../trayicon/MessageType.js';

export default class LoginController {

  loginView;
  userService;
  publicService;
  messageSource;
  registerController;
  recoverPasswordController;
  userPetsController;
  chatController;
  usersOnlineController;
  serverAddress;
  authenticationController;
  backgroundWorkManager;
  settings;
  version;

  constructor() {
  }

  showView() {
    this.loginView.showView();
    this.loadServers();
    this.getServerTechnicalInfo();
  }

//  private class LoadServersBackgroundWork extends
//      BackgroundWork<GetServersArg, ServerInfo[], Void> {
//
//    @Override
//    public ServerInfo[] doInBackground() throws Exception {
//      return publicService.getServers(getArgument());
//    }
//
//    @Override
//    public void completed(ServerInfo[] result) {
//      try {
//        ServerInfo[] servers = new ServerInfo[1];
//        servers[0] = new ServerInfo();
//        servers[0].address = serverAddress;
//        servers[0].locale = "";
//        servers[0].name = "";
//        loginView.setServers(servers);
//        String socialLoginUrl = "/site/signin?unid="
//            + URLEncoder.encode(uniqueIdentifier, "UTF-8")
//            + "&type=";
//        loginView.setSocialLoginUrl(socialLoginUrl);
//      } catch (Exception ex) {
//        log.error(ex.toString());
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      if (ex instanceof IncompatibleVersionException) {
//        IncompatibleVersionException ive = (IncompatibleVersionException) ex;
//        String serverVersion = ive.getServerVersion();
//        String message = messageSource.getMessage(
//            StringConstants.INCOMPATIBLE_VERSION, null, null);
//        message = String.format(message, serverVersion);
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      } else {
//        log.error("LoadServersBackgroundWork failed. ", ex);
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//    }
//  }

  loadServers() {
    const work = new BackgroundWork();
    work.doInBackground = this.publicService.getServers.bind(this.publicService, work.argument);
    work.failed = (function(ex) {
      if (ex instanceof IncompatibleVersionException) {
        const serverVersion = ex.serverVersion;
        const message = this.messageSource.getMessage(
            StringConstants.INCOMPATIBLE_VERSION, serverVersion, null);
        trayIcon.showTrayMessage(message, MessageType.ERROR);
      } else {
        console.error("LoadServersBackgroundWork failed %s. ", ex);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR)
            + ": "
            + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    }).bind(this);
    work.completed = (serversResponse) => {
    try {
        console.debug('serversResponse = %o', serversResponse);
        const servers = [];
        for (let serverInfo of serversResponse) {
          serverInfo.url = serverInfo.url;
          serverInfo.locale = serverInfo.locale;
          serverInfo.name = serverInfo.name;
          servers.push(serverInfo);
        }
        this.loginView.setServers(servers);
      } catch (ex) {
        console.error(ex.toString());
        const message = this.messageSource.getMessage(
            StringConstants.ERROR)
            + ": "
            + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    }
    const arg = new GetServersArg();
    arg.version = this.version;
    work.argument = arg;
    work.view = this.loginView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

//  private class RestoreSessionLoopBackgroundWork extends
//      BackgroundWork<RecoverSessionArg, LoginResult, Void> {
//
//    @Override
//    public LoginResult doInBackground() throws Exception {
//      return publicService.recoverSession(getArgument());
//    }
//
//    @Override
//    public void completed(LoginResult result) {
//      if (result.isSuccess()) {
//        loginCompleted(result);
//      } else {
//        restoreSessionLoop(getArgument());
//      }
//   }
//
//    @Override
//    public void failed(Exception ex) {
//      if (ex instanceof IncompatibleVersionException) {
//        IncompatibleVersionException ive = (IncompatibleVersionException) ex;
//        String serverVersion = ive.getServerVersion();
//        String message = messageSource.getMessage(
//            StringConstants.INCOMPATIBLE_VERSION, null, null);
//        message = String.format(message, serverVersion);
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      } else {
//        log.error("RestoreSessionLoopBackgroundWork failed..", ex);
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//    }
//  }

  hideView() {
    this.loginView.hideView();
  }

//public void restoreSessionLoop(RecoverSessionArg arg) {
//  RestoreSessionLoopBackgroundWork work = new RestoreSessionLoopBackgroundWork();
//  work.setArgument(arg);
//  work.setView(loginView);
//  ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
//  ces.setRestart(true);
//  work.setConnectionExceptionSettings(ces);
//  backgroundWorkManager.startBackgroundWork(work);
//}

//private class RestoreSessionBackgroundWork extends
//    BackgroundWork<RecoverSessionArg, LoginResult, Void> {

//  @Override
//  public LoginResult doInBackground() throws Exception {
//    return publicService.recoverSession(getArgument());
//  }

//  @Override
//  public void completed(LoginResult result) {
//    try {
//      if (result.isSuccess()) {
//        loginCompleted(result);
//      } else {
//        settings.setUnid("");
//        settings.save();
//      }
//    } catch (Exception ex) {
//      log.error("RestoreSessionBackgroundWork.", ex);
//      String message = messageSource.getMessage(
//          StringConstants.ERROR, null, null)
//          + ": "
//          + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }

//  @Override
//  public void failed(Exception ex) {
//    if (ex instanceof IncompatibleVersionException) {
//      IncompatibleVersionException ive = (IncompatibleVersionException) ex;
//      String serverVersion = ive.getServerVersion();
//      String message = messageSource.getMessage(
//          StringConstants.INCOMPATIBLE_VERSION, null, null);
//      message = String.format(message, serverVersion);
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    } else {
//      log.error("RestoreSessionBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(
//          StringConstants.ERROR, null, null)
//          + ": "
//          + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }
//}

//public void restoreSession(RecoverSessionArg arg) {
//  RestoreSessionBackgroundWork work = new RestoreSessionBackgroundWork();
//  work.setArgument(arg);
//  work.setView(loginView);
//  ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
//  ces.setRestart(true);
//  work.setConnectionExceptionSettings(ces);
//  backgroundWorkManager.startBackgroundWork(work);
//}

//private class LoginBackgroundWork extends
//    BackgroundWork<LoginArg, LoginResult, Object> {

//  @Override
//  public LoginResult doInBackground() throws Exception {
//    return userService.login(getArgument());
//  }

//  @Override
//  public void completed(LoginResult result) {
//    loginCompleted(result);
//  }

//  @Override
//  public void failed(Exception ex) {
//    if (ex instanceof IncompatibleVersionException) {
//      IncompatibleVersionException ive = (IncompatibleVersionException) ex;
//      String serverVersion = ive.getServerVersion();
//      String message = messageSource.getMessage(
//          StringConstants.INCOMPATIBLE_VERSION, null, null);
//      message = String.format(message, serverVersion);
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    } else {
//      log.error("LoginBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(
//          StringConstants.ERROR, null, null)
//          + ": "
//          + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  }
//}


  #login(loginArg) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.userService.login(work.argument);
    }
    work.completed = this.#loginCompleted.bind(this);
    work.failed = (ex) => {
      if (ex instanceof IncompatibleVersionException) {
        const serverVersion = ex.serverVersion;
        const message = this.messageSource.getMessage(
            StringConstants.INCOMPATIBLE_VERSION, {
              serverVersion: serverVersion
            });
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      } else if (ex instanceof ForbiddenException) {
        const message = this.messageSource.getMessage(
            StringConstants.FORBIDDEN);
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      } else {
        console.error("LoginBackgroundWork failed %o.", ex);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR)
            + ": "
            + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    }
    this.authenticationController.setCredentials(
        loginArg.login,
        loginArg.password);
    work.argument = loginArg;
    this.settings.lastName = loginArg.login;
    work.view = this.loginView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  #loginCompleted(loginResult) {
    if (loginResult.success) {
      this.authenticationController.authenticated = true;
      this.authenticationController.clearCredentials();
      this.userPetsController.showView();
      //this.chatController.showView();
      //this.usersOnlineController.showView();
      //this.loginView.hideView();
      this.settings.unid = loginResult.unid;
      this.settings.userId = loginResult.userId;
    } else {
      this.trayIcon.showTrayMessage(loginResult.message, MessageType.ERROR);
    }
  }

  initialize() {
    this.loginView.addLoginListener((sender, loginArg) => {
      try {
        this.#login(loginArg);
      } catch (ex) {
        console.error("LoginListener %s.", ex);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR, null, null)
            + ": "
            + ex.toString();
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });

    this.loginView.addRegisterListener((sender, data) => {
      this.registerController.showView();
      this.registerController.host = data;
    });

    this.loginView
        .addRecoverPasswordListener((sender, data) => {
            this.recoverPasswordController.showView();
            this.recoverPasswordController.host = data;
        });
    //this.loginView.addSocialLoginListener((sender, data) => {
    //    const arg = new RecoverSessionArg();
    //    arg.unid = uniqueIdentifier;
    //    arg.version = this.version;
    //    this.restoreSessionLoop(arg);
    //});
    this.loginView.addRestoreSessionListener((sender, data) => {
        const arg = new RecoverSessionArg();
        arg.unid = settings.unid;
        arg.version = this.version;
        this.restoreSession(arg);
    });
  }

//private class ServerTechnicalInfoBackgroundWork extends
//    BackgroundWork<Void, ServerTechnicalInfo, Void> {

//  @Override
//  public ServerTechnicalInfo doInBackground() throws Exception {
//    return publicService.getServerTechnicalInfo();
//  }

//  @Override
//  public void completed(ServerTechnicalInfo result) {
//    Map<?, ?> infoMap = result.getInfo();
//    if (infoMap.isEmpty()) {
//      log.info("ServerTechnicalInfo is empty.");
//    } else {
//      log.info("ServerTechnicalInfo:");
//      for (Entry<?, ?> entry : infoMap.entrySet()) {
//        log.info(entry.getKey() + ": " + entry.getValue() + "\n");
//      }
//    }
//  }

//  @Override
//  public void failed(Exception ex) {
//    log.error("ServerTechnicalInfo failed.", ex);
//  }
//}

//private void getServerTechnicalInfo() {
//  ServerTechnicalInfoBackgroundWork work = new ServerTechnicalInfoBackgroundWork();
//  ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
//  ces.setRestart(true);
//  work.setConnectionExceptionSettings(ces);
//  backgroundWorkManager.startBackgroundWork(work);
//}


  getServerTechnicalInfo() {
    const work = new BackgroundWork();
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    work.doInBackground = this.publicService.getServerTechnicalInfo.bind(this.publicService);
    work.failed = function(ex) {
      console.error(ex);
    }
    work.completed = function(info) {
      console.log(info);
    }
  }
}
