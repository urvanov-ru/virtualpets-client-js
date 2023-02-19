
export default class MenuItem {
  text = null;
  clickedListeners = [];// new ArrayList<ClickedListener>();
    
  addClickedListener(clickedListener) {
    clickedListeners.push(clickedListener); // clickedListeners.add(clickedListener);
  }
    
  fireClicked(arg) {	
    clickedListeners.forEach(listener => listener.clicked(arg));
  }
}
