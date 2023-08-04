import i18n from 'roddeh-i18n';

// rest
import BackgroundWorkManager from './rest/multithreading/BackgroundWorkManager.js';

// rest domain
import PetType from './rest/domain/PetType.js';

// rest service
import PublicService from './rest/service/PublicService.js';
import UserService from './rest/service/UserService.js';

// domain
import RoomData from './domain/RoomData.js';

// view
import {mainContainerScale, fireDeferredInstallPrompt, mainContainerElement} from './view/container.js';
import StartView from './view/StartView.js';
import ViewImplFactory from './view/component/ViewImplFactory.js';
import GameView from './view/GameView.js';
import LoginView from './view/LoginView.js';
import RegisterView from './view/RegisterView.js';

import MessageSource from './localization/MessageSource.js';

// settings
import LocalStorageSettings from './settings/LocalStorageSettings.js';

// resources
import ResourceManager from './resources/ResourceManager.js';
import RoomLoadWorker from './resources/RoomLoadWorker.js';

// controller
import RoomController from './controller/RoomController.js';
import LoginController from './controller/LoginController.js';
import RegisterController from './controller/RegisterController.js';
import GameController from './controller/GameController.js';
import AuthenticationController from './controller/AuthenticationController.js';

import TrayIcon from './trayicon/TrayIcon.js';

document.addEventListener("DOMContentLoaded", function(event) {
  
  const startView = new StartView();
  startView.onPlay = init;
  startView.showView();
  
  
  
  
});



function init(selectedLanguage) {

  const VERSION = '0.21';
  const SERVER_URL = 'http://localhost:8081/virtualpets-server/site';
  
  const settings = new LocalStorageSettings();
  settings.language = selectedLanguage;
  const roomData = new RoomData();
  const gameView = new GameView(mainContainerElement());
  const loginView = new LoginView();
  const registerView = new RegisterView();
  
  const resourceManager = new ResourceManager();
  const roomLoadWorker = new RoomLoadWorker(resourceManager, mainContainerScale, PetType.CAT); 
  const gameController = new GameController();
  const loginController = new LoginController();
  const registerController = new RegisterController();
  const authenticationController = new AuthenticationController();
  const viewImplFactory = new ViewImplFactory();
  const messageSource = new MessageSource();
  const trayIcon = new TrayIcon();
  const backgroundWorkManager = new BackgroundWorkManager();
  const publicService = new PublicService();
  const userService = new UserService();
  

  gameView.resourceManager = resourceManager;
  gameView.viewImplFactory = viewImplFactory;
  gameView.trayIcon = trayIcon;
  loginView.messageSource = messageSource;
  loginView.resourceManager = resourceManager;
  loginView.settings = settings;
  loginView.trayIcon = trayIcon;
  registerView.version = VERSION;
  registerView.settings = settings;
  registerView.messageSource = messageSource;
  registerView.resourceManager = resourceManager;
  
  gameController.gameView = gameView;
  gameController.messageSource = messageSource;
  
  loginController.loginView = loginView;
  loginController.trayIcon = trayIcon;
  loginController.version = VERSION;
  loginController.backgroundWorkManager = backgroundWorkManager;
  loginController.publicService = publicService;
  loginController.settings = settings;
  loginController.messageSource = messageSource;
  loginController.serverAddress = SERVER_URL;
  loginController.registerController = registerController;
  loginController.authenticationController = authenticationController;
  loginController.userService = userService;
  
  registerController.registerView = registerView;
  registerController.trayIcon = trayIcon;
  registerController.messageSource = messageSource;
  registerController.userService = userService;
  registerController.publicService = publicService;
  registerController.authenticationController = authenticationController;
  registerController.backgroundWorkManager = backgroundWorkManager;
  
  
  publicService.serverUrl = SERVER_URL;
  publicService.version = VERSION;
    
  viewImplFactory.resourceManager = resourceManager;
  
  registerController.initialize();
  loginController.initialize();
  
  //gameController.showView();
  
  loginController.showView();
}


   // Register service worker to control making site work offline
   
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/projects/games/virtualpets/sw.js')
      .then((registration) => { console.log('Service worker registered:', registration); });
  }
  window.addEventListener('beforeinstallprompt', (e) => {
    console.debug('beforeinstallprompt ');
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    
    fireDeferredInstallPrompt(e);
    
  });
