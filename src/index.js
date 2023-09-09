import i18n from 'roddeh-i18n';

// rest
import RestClient from './rest/service/RestClient.js';
import BackgroundWorkManager from './rest/multithreading/BackgroundWorkManager.js';

// rest domain
import PetType from './rest/domain/PetType.js';

// rest service
import PublicService from './rest/service/PublicService.js';
import UserService from './rest/service/UserService.js';
import PetService from './rest/service/PetService.js';

// domain
import RoomData from './domain/RoomData.js';

// view
import {mainContainerScale, fireDeferredInstallPrompt, mainContainerElement} from './view/container.js';
import StartView from './view/StartView.js';
import ViewImplFactory from './view/component/ViewImplFactory.js';
import GameView from './view/GameView.js';
import LoginView from './view/LoginView.js';
import RegisterView from './view/RegisterView.js';
import UserPetsView from './view/UserPetsView.js';
import CreatePetView from './view/CreatePetView.js';
import ProgressInfoPanel from './view/component/ProgressInfoPanel.js';

// localization
import MessageSource from './localization/MessageSource.js';

// settings
import LocalStorageSettings from './settings/LocalStorageSettings.js';

// resources
import ResourceManager from './resources/ResourceManager.js';
import RoomLoadWorker from './resources/RoomLoadWorker.js';
import ResourceLoader from './resources/ResourceLoader.js';

// controller
import RoomController from './controller/RoomController.js';
import LoginController from './controller/LoginController.js';
import RegisterController from './controller/RegisterController.js';
import GameController from './controller/GameController.js';
import AuthenticationController from './controller/AuthenticationController.js';
import UserPetsController from './controller/UserPetsController.js';
import CreatePetController from './controller/CreatePetController.js';

import TrayIcon from './trayicon/TrayIcon.js';

document.addEventListener("DOMContentLoaded", function(event) {
  
  const startView = new StartView();
  startView.onPlay = init;
  startView.showView();
});



function init(selectedLanguage) {

  const VERSION = '0.21';
  const SERVER_URL = 'http://localhost:8081/virtualpets-server';
  
  const settings = new LocalStorageSettings();
  settings.language = selectedLanguage;
  const roomData = new RoomData();
  const gameView = new GameView(mainContainerElement());
  const loginView = new LoginView();
  const registerView = new RegisterView();
  const userPetsView = new UserPetsView();
  const progressInfoPanel = new ProgressInfoPanel();
  const createPetView = new CreatePetView();
  const resourceManager = new ResourceManager();
  const roomLoadWorker = new RoomLoadWorker(resourceManager, mainContainerScale, PetType.CAT);
  const resourceLoader = new ResourceLoader(); 
  const gameController = new GameController();
  const loginController = new LoginController();
  const registerController = new RegisterController();
  const authenticationController = new AuthenticationController();
  const userPetsController = new UserPetsController();
  const createPetController = new CreatePetController();
  const viewImplFactory = new ViewImplFactory();
  const messageSource = new MessageSource();
  const trayIcon = new TrayIcon();
  const backgroundWorkManager = new BackgroundWorkManager();
  const publicService = new PublicService();
  const userService = new UserService();
  const petService = new PetService();
  const restClient = new RestClient();
  

  gameView.resourceManager = resourceManager;
  gameView.viewImplFactory = viewImplFactory;
  gameView.trayIcon = trayIcon;
  gameView.progressInfoPanel = progressInfoPanel;
  
  loginView.messageSource = messageSource;
  loginView.resourceManager = resourceManager;
  loginView.settings = settings;
  loginView.trayIcon = trayIcon;
  loginView.version = VERSION;
  
  registerView.version = VERSION;
  registerView.settings = settings;
  registerView.messageSource = messageSource;
  registerView.resourceManager = resourceManager;
  
  userPetsView.resourceManager = resourceManager;
  userPetsView.settings = settings;
  userPetsView.trayIcon = trayIcon;
  userPetsView.messageSource = messageSource;
  
  createPetView.resourceManager = resourceManager;;
  createPetView.messageSource = messageSource;
  createPetView.settings = settings;
  createPetView.trayIcon = trayIcon;
  
  
  gameController.gameView = gameView;
  gameController.messageSource = messageSource;
  gameController.backgroundWorkManager = backgroundWorkManager;
  gameController.roomService = roomService;
  
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
  loginController.userPetsController = userPetsController;
  
  registerController.registerView = registerView;
  registerController.trayIcon = trayIcon;
  registerController.messageSource = messageSource;
  registerController.userService = userService;
  registerController.publicService = publicService;
  registerController.authenticationController = authenticationController;
  registerController.backgroundWorkManager = backgroundWorkManager;
  
  authenticationController.restClient = restClient;
  
  userPetsController.userPetsView = userPetsView;
  userPetsController.trayIcon = trayIcon;
  userPetsController.messageSource = messageSource;
  userPetsController.petService = petService;
  userPetsController.createPetController = createPetController;
  userPetsController.settings = settings;
  userPetsController.gameController = gameController;
  userPetsController.backgroundWorkManager = backgroundWorkManager;
  
  createPetController.createPetView = createPetView;
  createPetController.trayIcon = trayIcon;
  createPetController.messageSource = messageSource;
  createPetController.petService = petService;
  createPetController.backgroundWorkManager = backgroundWorkManager;
  createPetController.userPetsController = userPetsController;
  
  
  publicService.serverUrl = SERVER_URL;
  publicService.version = VERSION;
  
  restClient.serverUrl = SERVER_URL;
  restClient.version = VERSION;
  restClient.settings = settings;
  
  userService.restClient = restClient;
  
  petService.restClient = restClient;
    
  viewImplFactory.resourceManager = resourceManager;
  
  resourceLoader.resourceManager = resourceManager;
  
  registerController.initialize();
  loginController.initialize();
  userPetsController.initialize();
  createPetController.initialize();
  
  resourceLoader.process = function(progressInfoList) {
    const lastProgressInfo = progressInfoList[progressInfoList.length - 1];
    if (lastProgressInfo != null) {
      progressInfoPanel.progressInfo = lastProgressInfo;
    }
  }
  resourceLoader.done = function() {
    progressInfoPanel.hideView();
    loginController.showView();
  }
  progressInfoPanel.showView();
  resourceLoader.loadResourcesInBackground();
  //gameController.showView();
  
  
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
