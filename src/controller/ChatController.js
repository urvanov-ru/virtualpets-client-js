
export default class ChatController extends ChatController {

  chatView;
  lastChatMessageId = null;
  trayIcon;
  messageSource;
  chatService;
  connectionInfo;
  authenticationController;
  backgroundWorkManager;

  showView() {
    this.chatView.showView();
  }

  hideView() {
    this.chatView.hideView();
  }

//  private class SendBackgroundWork extends
//      BackgroundWork<SendChatMessageArg, SendChatMessageResult, Object> {
//
//    @Override
//    public SendChatMessageResult doInBackground() throws Exception {
//      return chatService.sendMessage(getArgument());
//    }
//
//    @Override
//    public void completed(SendChatMessageResult result) {
//      if (result.isSuccess()) {
//      } else {
//        trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
//      }
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("SendBackgroundWork", ex);
//      chatView.stopWaitAnimation();
//      trayIcon.setConnectionAlive(true);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//  };

  sendMessage(sendChatMessageArg) {
    const work = new SendBackgroundWork();
    work.doInBackground = () => {
      return chatService.sendMessage(work.argument);
    };
    work.completed = (sendChatMessageResult) => {
      if (result.success) {
      } else {
        this.trayIcon.showTrayMessage(result.message, MessageType.ERROR);
      }
    };
    work.failed = (exception) => {
      console.error("SendBackgroundWork %o", exception);
      this.chatView.stopWaitAnimation();
      this.trayIcon.connectionAlive = true;
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + exception;
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = sendChatMessageArg;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    work.connectionExceptionSettings = ces;
    work.view = chatView;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  initialize() {
    this.chatView.addSendListener((sender, sendChatMessageArg) => {
      try {
        this.sendMessage(arg);
      } catch (exception) {
        console.error("SendListener %o", exception);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR, null, null);
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
    this.chatView.addInitializationCompletedListener((sender, data) => {
      try {
        this.startRefresh();
      } catch (exception) {
        console.error("InitializationCompletedListener %o", exception);
        const message = this.messageSource.getMessage(
            StringConstants.ERROR, null, null);
        this.trayIcon.showTrayMessage(message, MessageType.ERROR);
      }
    });
  }

//  private class RefreshBackgroundWork extends
//      BackgroundWork<RefreshChatArg, RefreshChatResult, Object> {
//
//    @Override
//    public RefreshChatResult doInBackground() throws Exception {
//      Thread.sleep(15000);
//      return chatService.getMessages(getArgument());
//    }
//
//    @Override
//    public void completed(RefreshChatResult result) {
//      try {
//        if (result.isSuccess()) {
//          lastChatMessageId = result.getLastChatMessageId();
//          chatView.addMessages(result.getChatMessages());
//        } else {
//          trayIcon.showTrayMessage(result.getMessage(),
//              MessageType.ERROR);
//        }
//        startRefresh();
//      } catch (Exception ex) {
//        log.error("RefreshBackgroundWork", ex);
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
//      if (ex instanceof ConnectionException) {
//        trayIcon.setConnectionAlive(false);
//      } else {
//        log.error("RefreshBackgroundWork failed", ex);
//        String message = messageSource.getMessage(
//            StringConstants.ERROR, null, null)
//            + ": "
//            + ex.toString();
//        trayIcon.showTrayMessage(message, MessageType.ERROR);
//      }
//      startRefresh();
//    }
//  }

  startRefresh() {
    if (this.authenticationController.authenticated) {
      const work = new RefreshBackgroundWork();
      work.doInBackground = () => {
        // set timer
        return this.chatService.getMessages(work.argument);
      };
      work.completed = (refreshChatResult) => {
        try {
          if (refreshChatResult.success) {
            lastChatMessageId = refreshChatResult.lastChatMessageId;
            this.chatView.addMessages(refreshChatResult.chatMessages);
          } else {
            this.trayIcon.showTrayMessage(refreshChatResult.message,
                MessageType.ERROR);
          }
          this.startRefresh();
        } catch (exeption) {
          console.error("RefreshBackgroundWork %o", exception);
          const message = this.messageSource.getMessage(
              StringConstants.ERROR, null, null)
              + ": "
              + exception;
          this.trayIcon.showTrayMessage(message, MessageType.ERROR);
        }
      };
      work.failed = (exception) => {
        if (exception instanceof ConnectionException) {
          this.trayIcon.connectionAlive = false;
        } else {
          console.error("RefreshBackgroundWork failed %o", exception);
          const message = this.messageSource.getMessage(
              StringConstants.ERROR, null, null)
              + ": "
              + exception;
         this.trayIcon.showTrayMessage(message, MessageType.ERROR);
        }
        this.startRefresh();
      };
      const refreshChatArg = new RefreshChatArg();
      refreshChatArg.lastChatMessageId = lastChatMessageId;
      work.argument = refreshChatArg;
      work.view = chatView;
      const ces = new ConnectionExceptionSettings();
      ces.restart = false;
      work.connectionExceptionSettings = ces;
      this.backgroundWorkManager.startBackgroundWork(work);
    }
  }


  addPrivateChat(addPrivateChatArg) {
    this.chatView.addPrivateChat(addPrivateChatArg);
  }

}
