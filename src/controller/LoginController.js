import BackgroundWork from '../rest/multithreading/BackgroundWork.js';

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
  #serverAddress;
  authenticationController;
  backgroundWorkManager;
  #settings;
  #version;

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
    work.doInBackground = (function() {
      this.publicService.getServers(work.argument);
    }).bind(this);
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
    const arg = new GetServersArg();
    arg.version = version;
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

//private void login(LoginArg arg) {
//  LoginBackgroundWork work = new LoginBackgroundWork();

//  authenticationController.setCredentials(arg.getLogin(),
//      arg.getPassword());
//  work.setArgument(arg);
//  settings.setLastName(arg.getLogin());
//  work.setView(loginView);
//  ConnectionExceptionSettings ces = new ConnectionExceptionSettings();
//  ces.setRestart(true);
//  work.setConnectionExceptionSettings(ces);
//  backgroundWorkManager.startBackgroundWork(work);
//}

//public void loginCompleted(LoginResult result) {
//  if (result.isSuccess()) {
//    authenticationController.setAuthenticated(true);
//    authenticationController.clearCredentials();
//    userPetsController.showView();
//    chatController.showView();
//    usersOnlineController.showView();
//    loginView.hideView();
//    settings.setUnid(result.getUnid());
//    settings.setUserId(result.getUserId());
//  } else {
//    trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
//  }
//}

  initialize() {
    this.loginView.addLoginListener((sender, loginArg) => {
      try {
        login(arg);
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
      registerController.showView();
      registerController.setHost(data);
    });

    this.loginView
        .addRecoverPasswordListener((sender, data) => {
            recoverPasswordController.showView();
            recoverPasswordController.host = data;
        });
    this.loginView.addSocialLoginListener((sender, data) => {
        const arg = new RecoverSessionArg();
        arg.unid = uniqueIdentifier;
        arg.version = version;
        this.restoreSessionLoop(arg);
    });
    this.loginView.addRestoreSessionListener((sender, data) => {
        const arg = new RecoverSessionArg();
        arg.unid = settings.unid;
        arg.version = version;
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

}
