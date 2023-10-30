
import HighlightGameObject from './HighlightGameObject.js';


export default class BuildMenuGameObject extends HighlightGameObject {

    inner = null;
    close = null;
    menuItems = null; //[]
    buildObjects = null; //[]
    names = null; //[]
    buildingMaterialObjects = null; //[]
    costs = null;  //[][] 
    selectedItemIndex = null;
    toolTip = null;
    toolTipLabel = null;
    toolTipInsufficientResources = null;
    toolTipCostLabels = null; //[]
};

    

