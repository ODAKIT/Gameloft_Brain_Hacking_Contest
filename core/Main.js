require('pixi.js');

global.GameDefine	= require('../GameDefine');
global.GameConfig	= require('../Config');
global.Input		= require('./Input');
global.StateManager	= require('./StateManager');
global.APP			= require('./Application');
global.StateGame	= require('../game/StateGame');
global.StateMenu	= require('../game/StateMenu');
global.StatePlayAgain	= require('../game/StateEndGame');
global.LoadingState	= require('../game/LoadingState');	
global.StateLV2	    = require('../game/StateLV2');	
global.StateLV3      =require('../game/StateLV3')
global.StateGameRank = require('../game/StateGameRank')

global.Score = 0;
global.AudioBackGround = new Audio('data/sound/bgsound.mp3');
global.gameMode = 0;


function GameLoop(deltaTime)
{
	deltaTime = deltaTime / (60 * APP.ticker.speed);
	APP.Update(deltaTime);
	APP.Render();
}

window.main = function()
{
	APP.Init(GameLoop);
	StateManager.PushState(StateMenu);
	


}