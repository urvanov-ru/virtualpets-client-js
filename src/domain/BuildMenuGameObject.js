
import GameObject from './GameObject.js';


export default class BuildMenuGameObject extends GameObject {

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

    

