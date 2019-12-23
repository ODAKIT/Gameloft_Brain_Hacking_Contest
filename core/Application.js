const GameConfig = require('../Config');

class Application extends PIXI.Container
{
	constructor()
	{
		super();

		this.ticker			= PIXI.ticker.shared;
		this.offsetX		= 0;
		this.offsetY		= 0;
		this.interactive 	= true;
		this.renderer 		= PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

		this.Resize();

		this.on("pointerup", this.TouchHandler);
		this.on("pointerdown", this.TouchHandler);
		this.on("pointermove", this.TouchHandler);

		window.addEventListener("keydown", this.KeyHandler, false);
		window.addEventListener("keyup", this.KeyHandler, false);

		document.body.appendChild(this.renderer.view);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init(gameLoop)
	{
		this.ticker.add(gameLoop);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetWidth()
	{
		if (this.rotation == 0)
		{
			return this.renderer.width;
		}
		else
		{
			return this.renderer.height;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetHeight()
	{
		if (this.rotation == 0)
		{
			return this.renderer.height;
		}
		else
		{
			return this.renderer.width;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	AddChild(stage)
	{
		this.addChild(stage);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	RemoveChild(stage)
	{
		this.removeChild(stage);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resize()
	{
		if (GameConfig.isMigGamePortrait)
		{
			this.ratio = window.innerWidth / window.innerHeight;
			this.renderer.resize(GameConfig.height * this.ratio, GameConfig.height);

			this.offsetX = (this.renderer.width - GameConfig.width) / 2;
			this.offsetY = 0;
		}
		else
		{
			this.ratio = window.innerHeight / window.innerWidth;
			this.renderer.resize(GameConfig.width, GameConfig.width * this.ratio);

			this.offsetX = 0;
			this.offsetY = (this.renderer.height - GameConfig.height) / 2;
		}

		this.renderer.view.setAttribute("style", `width:${window.innerWidth}px; height:${window.innerHeight}px`);
		if (window.VPaid)
		{
			this.renderer.view.style.width = window.innerWidth;
			this.renderer.view.style.height = window.innerHeight;
			this.renderer.view.style.zIndex = 999999;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Align(stage)
	{
		stage.position.set(this.renderer.width / 2, this.renderer.height / 2);
		stage.pivot.set(this.GetWidth() / 2, this.GetHeight() / 2);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		StateManager.Update(deltaTime);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Render()
	{
		this.renderer.render(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (StateManager.stateNext == null)
		{
			Input.Update(event);
			StateManager.TouchHandler(event);
			Input.Reset(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	KeyHandler(event)
	{
		StateManager.KeyHandler(event);
		if (event.target === document.body)
		{
			event.preventDefault();
		}
	}
}
module.exports = new Application();