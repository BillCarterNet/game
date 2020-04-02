import {gameConfig} from './gameConfig.js';

function addRule(selector, rule) {

    // https://stackoverflow.com/questions/1679577/get-document-stylesheets-by-name-instead-of-index
    let stylesheet = document.querySelector(`link[href$="/css/game.css"]`);
  
    if (stylesheet) {
        stylesheet = stylesheet.sheet;
    
        if (stylesheet.addRule) {
          stylesheet.addRule(selector, rule);
        } else if (stylesheet.insertRule) {
          stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
        }
      }
          
}
       
function addCanvas() {

    addRule('canvas', `width: ${gameConfig.window.width}px;`); 
    addRule('canvas', `height: ${gameConfig.window.height}px;`);     

}

function addGameArea() {

    addRule('div.gameArea', 'position: relative;');
    addRule('div.gameArea', `width: ${gameConfig.window.width}px;`);
    addRule('div.gameArea', `height: ${gameConfig.window.height}px;`);
    addRule('div.gameArea', 'background-image: url("../images/background.jpg");');

}

function addHudClass() {

    addRule('.hud', 'position: absolute;');
    addRule('.hud', 'border: 2px solid #d3d3d3;');
    addRule('.hud', 'color: white;');
    addRule('.hud', 'text-align: center;');
    addRule('.hud', 'background: rgba(0, 0, 0, 0.5);');

}

function addTableClass() {

    addRule('.table', 'align: center');
    addRule('.table', 'width: 175px;');
    addRule('.table', 'text-align: center;');
    addRule('h2', 'margin-top: 2px;');
    addRule('h2', 'margin-bottom: 5px;');
    //addRule('.table', 'margin-left: 5%;');
    //addRule('.table', 'margin-right: 5%;');

}

function addPlayerHud() {

    addRule('#playerHud', 'top: 0;')
    addRule('#playerHud', 'left: 0;')
    addRule('#playerHud', 'width: 200px;')
    // addRule('#playerHud', 'height: 200px;')

}

function addMessageArea() {

    addRule('#messageArea', 'top: 200px;');
    addRule('#messageArea', 'right: 200px;');
    addRule('#messageArea', 'left: 400px;');
    addRule('#messageArea', 'width: 480px;');
    //addRule('#messageArea', 'height: 200px;');

}

function addDebugHud() {

    addRule('#debugHud', 'top: 0;');
    addRule('#debugHud', 'right: 0;');
    //addRule('#debugHud', 'width: 200px;');
    //addRule('#debugHud', 'height: 500px;');
    addRule('#debugHud', 'font-size: 10px;');
    addRule('#tableContainer', 'margin: 5px;');
    addRule('#tableContainer', 'text-align: center;');
    addRule('h1', 'margin: 5px;');

}

function addPlayerHealthBarContainer() {

    addRule('#healthBarContainer', 'margin-left: 10%;');
    addRule('#healthBarContainer', 'margin-right: 10%;');
    addRule('#healthBarContainer', 'border: 1px solid #d3d3d3;');
    addRule('#healthBarContainer', 'height: 20px;');

}
  
function addPlayerHealthBar() {

    addRule('#healthBar', 'background-color: rgba(0, 200, 0, 0.5)');
    addRule('#healthBar', 'height: 20px;');
    addRule('#healthBar', 'width: 100%;');

}

let cssSetup = {

    addCss: function() {

        addCanvas();
        addGameArea();
        addHudClass();
        addTableClass();
        addPlayerHud();
        addMessageArea();
        addDebugHud();
        addPlayerHealthBarContainer();
        addPlayerHealthBar();

    },

    setHealth: function (x) {

        if (x <= 0) {x = 0};
        if (x >= 100) {x = 100};
        addRule('#healthBar', `width: ${x}%;`);        

    }

};

export {cssSetup};

