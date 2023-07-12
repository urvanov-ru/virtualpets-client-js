
export default class BackgroundWorkManager {

  startBackgroundWork(backgroundWork) {
    BaseView view = backgroundWork.getView();
    if (view != null) {
      view.startWaitAnimation();
    }
    try {
      backgroundWork.doInBackground()
          .then((response) {
              if (response.ok) {
                const view = bw.view;
                if (view != null) {
                  view.stopWaitAnimation();
                }
                backgroundWork.completed(response.json());
              } else {
                throw new Error('Background work failed with HTTP status ' + response.status);
              }
          });
    } catch (error) {
      const ces = bw.connectionExceptionSettings;
      if (ces.restart) {
        ces.incAttemptNumber();
        this.startBackgroundWork(bw);
      } else {
        const view = bw.view;
        if (view != null) {
          view.stopWaitAnimation();
        }
        backgroundWork.failed(error);
      }
    }
  }
}
