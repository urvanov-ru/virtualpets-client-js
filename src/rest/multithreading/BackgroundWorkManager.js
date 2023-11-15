
export default class BackgroundWorkManager {

  startBackgroundWork(backgroundWork) {
    if (!backgroundWork.doInBackground) {
      throw new Error('doInBackground is not set.');
    }
    const view = backgroundWork.view;
    if (view != null && view.startWaitAnimation) {
      view.startWaitAnimation();
    }
    try {
      const delayms = backgroundWork.connectionExceptionSettings.attemptNumber > 0 ?  backgroundWork.connectionExceptionSettings.delay : 0;
      this.delay(delayms).then(() => backgroundWork.doInBackground())
          .then((response) => {
              if (response.ok) {
                if (view != null && view.stopWaitAnimation) {
                  view.stopWaitAnimation();
                }
                switch (response.status) {
                case 200: // HTTP status OK
                  return response.json();
                  break;
                case 204: // HTTP status No Content
                  return null;
                  break;
                }
              } else {
                throw new Error('Background work failed with HTTP status ' + response.status);
              }
          })
          .then((responseJson) => {
            backgroundWork.completed(responseJson);
          });
    } catch (error) {
      console.error(error);
      const ces = backgroundWork.connectionExceptionSettings;
      if (ces.restart) {
        ces.incAttemptNumber();
        this.startBackgroundWork(backgroundWork);
      } else {
        if (view != null && view.stopWaitAnimation) {
          view.stopWaitAnimation();
        }
        backgroundWork.failed(error);
      }
    }
  }
  
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
