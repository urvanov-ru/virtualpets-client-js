
export default class MenuItem {
  text = null;
  #clickedListeners = [];// new ArrayList<ClickedListener>();
    
  addClickedListener(clickedListener) {
    this.#clickedListeners.push(clickedListener); // clickedListeners.add(clickedListener);
  }
    
  fireClicked(arg) {	
    this.#clickedListeners.forEach(listener => listener.clicked(arg));
  }
}
