import ConnectionExceptionSettings from './ConnectionExceptionSettings.js';

export default class BackgroundWork {
  argument;
  connectionExceptionSettings = new ConnectionExceptionSettings();
  view;

  doInBackground() {
    throw new Error('doInBackground should be implemented in a child class.');
  }
  
  completed(result) {
    throw new Error('Completed should be implemented in a child class.');
  }

  /**
   * Override it in a child class.
   */  
  failed(exception) {
    console.error(exception);
  }

}
