import {mainContainerElement, setDeferredInstallPromptListener} from './container.js';

export default class StartView  {
  onPlay;
  #languageSelect;
  #installButton;
  #playButton;
  #containerDiv;
  #deferredInstallPrompt;
  
  constructor() {
    this.#containerDiv = document.createElement('div');
    this.#languageSelect = document.createElement('select');
    this.#installButton = document.createElement('button');
    this.#playButton = document.createElement('button');
    
    this.#containerDiv.style.width = '100%';
    this.#containerDiv.style.height = '100%';
    this.#containerDiv.style.display = 'none';
    this.#containerDiv.style.flexDirection = 'column';
    this.#languageSelect.style.display = 'block';
    this.#languageSelect.style.maxWidth = '200px';
    this.#languageSelect.add(new Option('English', 'en'));
    this.#languageSelect.add(new Option('Русский', 'ru'));
    this.#installButton.innerText = '<...loading...>';
    this.#installButton.style.display = 'block';
    this.#installButton.disabled = true;
    this.#installButton.style.maxWidth = '200px';
    this.#playButton.innerText = '<...loading...>';
    this.#playButton.style.display = 'block';
    this.#playButton.style.maxWidth = '200px';
    
    this.#languageSelect.addEventListener('change', this.#languageChanged.bind(this));
    this.#installButton.addEventListener('click', this.#installClicked.bind(this));
    this.#playButton.addEventListener('click', this.#playClicked.bind(this));
    
    this.#containerDiv.append(this.#languageSelect);
    this.#containerDiv.append(this.#installButton);
    this.#containerDiv.append(this.#playButton);
    mainContainerElement().append(this.#containerDiv);
    setDeferredInstallPromptListener((e) => {
      console.debug('deferredInstallPromptListener fired e=%o', e);
      this.#installButton.disabled =false;
      this.#deferredInstallPrompt = e;
    });
    this.#choosePreferredLanguage();
  }
  
  element() {
    return this.#containerDiv;
  }
  
  showView() {
    this.#containerDiv.style.display = 'flex';
  }
  
  hideView() {
    this.#containerDiv.style.display = 'none';
  }
  
  #choosePreferredLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    console.debug('User langage is %s (https://datatracker.ietf.org/doc/html/rfc5646).', userLang);
    const translations = new Set(['en', 'ru']);
    let preferredLanguage = 'en';
    if (translations.has(userLang)) {
      preferredLanguage = userLang;
    } 
    const shortedUserLang = userLang.split('-')[0]
    if (translations.has(shortedUserLang)) {
      preferredLanguage = shortedUserLang;
    }
    console.debug('Application translation was switched to %s.', preferredLanguage);
    this.#languageSelect.value = preferredLanguage;
    this.#loadLanguage(preferredLanguage);
  }
  
  #loadLanguage(lang) {
    fetch(`data/locales/${lang}/messages.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.debug('Translations loaded %o.', response);
        i18n.translator.add(response);
        this.#installButton.textContent = i18n('INSTALL');
        this.#playButton.textContent = i18n('PLAY');
      });
  }
  
  #languageChanged(event) {
    this.#loadLanguage(event.target.value);
  }
  
  #installClicked() {
      // hide our user interface that shows our A2HS button
      this.#installButton.disabled = true;
      // Show the prompt
      this.#deferredInstallPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.#deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.#deferredInstallPrompt = null;
      });
  }
  
  #playClicked() {
    this.hideView();
    this.onPlay(this.#languageSelect.selectedOptions[0].value);
  }
}