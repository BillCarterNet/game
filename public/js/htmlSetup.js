import { gameState } from './gameState.js';

function addDivToBody(divId, divClass) {

    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    document.body.appendChild(element); 

};

function addDivToDiv(divIdToAddTo, divId, divClass) {

    let targetDiv = document.getElementById(divIdToAddTo);
    let element = document.createElement('div');
    element.setAttribute('id', divId); 
    element.setAttribute('class', divClass);
    targetDiv.appendChild(element);

};

function populatePlayerHud() {

    const playerHud = document.getElementById('playerHud');

    let healthLabel = document.createElement('p');
    healthLabel.innerText = 'Health';
    playerHud.appendChild(healthLabel);

    let healthBarContainer = document.createElement('div');
    healthBarContainer.setAttribute('id', 'healthBarContainer');
    playerHud.appendChild(healthBarContainer);

    let healthBar = document.createElement('div');
    healthBar.setAttribute('id', 'healthBar');
    healthBarContainer.appendChild(healthBar);

    let thrustLabel = document.createElement('p');
    thrustLabel.innerText = 'Thrust';
    playerHud.appendChild(thrustLabel);

    let thrustBarContainer = document.createElement('div');
    thrustBarContainer.setAttribute('id', 'thrustBarContainer');
    playerHud.appendChild(thrustBarContainer);

    let thrustBar = document.createElement('div');
    thrustBar.setAttribute('id', 'thrustBar');
    thrustBarContainer.appendChild(thrustBar);

    let scoreLabel = document.createElement('p');
    scoreLabel.innerText = 'Score';
    playerHud.appendChild(scoreLabel);

    let score = document.createElement('p');
    score.setAttribute('id', 'playerScore');
    score.innerText = '0';
    playerHud.appendChild(score);

    let levelLabel = document.createElement('p');
    levelLabel.innerText = 'Level';
    playerHud.appendChild(levelLabel);

    let level = document.createElement('p');
    level.setAttribute('id', 'playerLevel');
    level.innerText = gameState.level;
    playerHud.appendChild(level);


}

function populateMessageArea() {

  const messageArea = document.getElementById('messageArea');

  messageArea.setAttribute('hidden', 'true');

  let h1 = document.createElement('h1');
  h1.setAttribute('id', 'messageAreaH1');
  messageArea.appendChild(h1);

  let p = document.createElement('p');
  p.setAttribute('id', 'messageAreaP');
  messageArea.appendChild(p);

}

function populateDebugArea() {

    const debugArea = document.getElementById('debugHud');
    debugArea.setAttribute('hidden', 'true');
    const headingsLevel = ['LEVEL', 'Tiles', 'Blocks', 'Holes', 'Normal'];
    const headingsPlayer = ['VECTOR', 'X', 'Y', 'Z', ];
    const headingsCamera = ['VECTOR', 'X', 'Y', 'Z', ];
    const headingsGameState = ['STATE', 'VALUE', ];
    const headingsFrame = ['FRAME (count)', 'TIME (ms)', 'FPS (lifetime)', 'FPS (last frame)', ];
    const headingConfig = ['STATE', 'VALUE', ];
    const title = document.createElement('h1');
    title.innerText = '-[DEBUG]-';
    debugArea.appendChild(title);
    let table = createTable('LEVEL', 'level', 1, 5, headingsLevel);
    debugArea.appendChild(table);
    table = createTable('PLAYER', 'player', 2, 4, headingsPlayer);
    debugArea.appendChild(table);
    table = createTable('CAMERA', 'camera', 2, 4, headingsCamera);
    debugArea.appendChild(table);
    table = createTable('GAME STATE', 'gameState', 6, 2, headingsGameState);
    debugArea.appendChild(table);
    table = createTable('PERFORMANCE', 'frame', 1, 4, headingsFrame);
    debugArea.appendChild(table);
    table = createTable('CONFIG', 'config', 6, 2, headingConfig);
    debugArea.appendChild(table);

}

function createTable(title, id, rows, cols, headings) {

    let tableContainer = document.createElement('div');
    tableContainer.setAttribute('id', 'tableContainer');
    let tableTitle = document.createElement('h2');
    tableTitle.innerText = title;
    tableContainer.appendChild(tableTitle);
    
    let table = document.createElement('table');
    table.setAttribute('id', id);
    table.setAttribute('class', 'table');

    let row = document.createElement('tr');
    table.appendChild(row);
    for (let j = 0; j < cols; j++) {
        let heading = document.createElement('th');
        heading.innerText = headings[j];
        row.appendChild(heading);
    }

    for (let i = 0; i < rows; i++) {
        row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < cols; j++) {
            let data = document.createElement('td');
            data.setAttribute('id', `${id}_row_${i}_col_${j}`);
            row.appendChild(data);
        }
    }
    tableContainer.appendChild(table);
    return tableContainer;
}

function writePlayerArea(state) {

    let h1 = document.getElementById('messageAreaH1');
    let p = document.getElementById('messageAreaP');
    let text = '';
    
    switch (state) {
        case 'preGame':
            h1.innerText = 'A game by William Carter';
            text = '<u>Controls</u><br><br>';
            text += 'o / p - move camera X + / -<br>';
            text += 'i / k - move camera Y + / -<br>';
            text += 'u / j - move camera Z + / -<br>';
            text += '<br>';
            text += 'd - toggle debug window<br>';
            text += 'h - skip level<br>';
            text += 't - toggle player look<br>';
            text += 'm - upward impuls<br>';
            text += '<br>';
            text += 'r / f / v - gameSpeed +0.1 / -0.1 / 0'
            text += '<br><br><strong>Press any key to start</strong>';
            break;
        case 'gameOver':
            h1.innerText = 'GAME OVER';
            text += 'Please try again';
            break;
    }

    p.innerHTML = text;



}

let htmlSetup = {

    addHtml: function() {

        addDivToBody('gameArea', 'gameArea');
        addDivToDiv('gameArea', 'playerHud', 'hud');
        addDivToDiv('gameArea', 'debugHud', 'hud');
        addDivToDiv('gameArea', 'messageArea', 'hud');
        populatePlayerHud();
        populateMessageArea();
        populateDebugArea();

    },

    writeDebugValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    writeHudValue: function(id, value) {

        const element = document.getElementById(id);
        element.innerText = value;

    },

    populatePlayerArea: function(state) {

        switch (state) {
            case 'preGame':
                writePlayerArea('preGame');
                break;
            case 'gameOver':
                writePlayerArea('gameOver');
                break;
            default:
                break;

        }

    },

};

export {htmlSetup};

