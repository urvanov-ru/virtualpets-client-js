import ServiceException from '../exception/ServiceException.js';
import NameIsBusyException from '../exception/NameIsBusyException.js';
import IncompatibleVersionException from '../exception/IncompatibleVersionException.js';
import ForbiddenException from '../exception/ForbiddenException.js';

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
                  return response.json().then((responseJson) => {
                    backgroundWork.completed(responseJson)
                  });
                  break;
                case 204: // HTTP status No Content
                  backgroundWork.completed(null)
                  break;
                }
              } else {
                response.json()
                  .then((responseJson) => {
                    let responseErrorCode;
                    try {
                      const problemDetail = responseJson;
                      responseErrorCode = problemDetail.detail;
                    } catch (problemDetailParseError) {
                      responseErrorCode = "unknown";
                    }
                    switch (responseErrorCode) {
                    case 'name_is_busy':
                      backgroundWork.failed(new NameIsBusyException());
                      break;
                    case 'incompatible_version':
                      backgroundWork.failed(new IncompatibleVersionException(problemDetail.properties.serverVersion, problemDetail.properties.clientVersion));
                      break;
                    default:
                      switch (response.status) {
                      case 403:
                        backgroundWork.failed(new ForbiddenException());
                        break;
                      default:
                        backgroundWork.failed(new ServiceException('Background work failed with HTTP status ' + response.status));
                        break;
                      }
                      
                      break;
                    }
                  });
              }
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
