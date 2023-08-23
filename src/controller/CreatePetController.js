export default class CreatePetControllerImpl extends CreatePetController {

  createPetView;
  trayIcon;
  messageSource;
  petService;
  backgroundWorkManager;
  userPetsController;

  showView() {
    this.createPetView.showView();
  }

  hideView() {
    this.createPetView.hideView();
  }

//  private class CreateBackgroundWork extends
//      BackgroundWork<CreatePetArg, CreatePetResult, Object> {
//
//    @Override
//    public CreatePetResult doInBackground() throws Exception {
//      return petService.create(getArgument());
//    }
//
//    @Override
//    public void completed(CreatePetResult result) {
//      if (result.isSuccess()) {
//        createPetView.hideView();
//        userPetsController.refresh();
//      } else {
//        trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
//      }
//    }
//
//    @Override
//    public void failed(Exception ex) {
//      log.error("CreateBackgroundWork failed.", ex);
//      String message = messageSource.getMessage(StringConstants.ERROR,
//          null, null) + ": " + ex.toString();
//      trayIcon.showTrayMessage(message, MessageType.ERROR);
//    }
//
//  }

  #create(createPetArg) {
    const work = new BackgroundWork();
    work.doInBackground = () => {
      return this.petService.create(work.argument);
    };
    work.completed = (createPetResult) => {
      if (createPetResult.success) {
        this.createPetView.hideView();
        this.userPetsController.refresh();
      } else {
        this.trayIcon.showTrayMessage(result.getMessage(), MessageType.ERROR);
      }
    };
    work.failed = (ex) => {
      console.error("CreateBackgroundWork failed %o.", ex);
      const message = this.messageSource.getMessage(StringConstants.ERROR,
          null, null) + ": " + ex.toString();
      this.trayIcon.showTrayMessage(message, MessageType.ERROR);
    };
    work.argument = arg;
    work.view = createPetView;
    const ces = new ConnectionExceptionSettings();
    ces.restart = true;
    this.backgroundWorkManager.startBackgroundWork(work);
  }

  initialize() {
    this.createPetView
        .addCreateListener((sender, createPetArg) => {
          try {
            if (createPetArg.name == null
                || "" == createPetArg.name) {
              this.trayIcon.showTrayMessage(this.messageSource
                  .getMessage(StringConstants.FILL_NAME,
                      null, null), MessageType.ERROR);
            } else
              this.#create(arg);
          } catch (ex) {
            console.error("CreateListener %o.", ex);
            const message = this.messageSource.getMessage(
                StringConstants.ERROR, null, null)
                + ": "
                + ex.toString();
            this.trayIcon.showTrayMessage(message, MessageType.ERROR);
          }
        });
  }
}
