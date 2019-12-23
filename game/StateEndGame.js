class StatePlayAgain extends PIXI.Container 
{
    constructor()
    {
        super();

       this.targetY=-1;
       this.targetX=-1;
        this.isLoad = false;
        this.bgScore = null;
        this.returnMenu = null;

        this.returnMenu=null;

        this.bgHeight = 1334;
        this.bgWidth = 1002;
        this.isPlay=false
        this.timeSwitch=0;;


        const style = new PIXI.TextStyle({
            fill: [
                "white",
                "black"
            ],
            fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
            fontSize: 150,
            fontStyle: "italic",
            fontWeight: "bold",
            strokeThickness: 3
        });
        this.score = 0;
        this.scoreText = new PIXI.Text('Your score \n   '+this.score, style);
        
      
    }

//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Load() 
    {
        //Load vào resource

        

        AudioBackGround.pause();
        AudioBackGround.currentTime = 0;
        APP.addChild(this);


        if(this.isLoad==false)
        {
        const loader = PIXI.loader;
        loader.on("progress", this.LoadProgressHandler.bind(this));
		loader.on("error", this.LoadErrorHandler.bind(this));
		loader.on("complete", this.LoadCompleteHandler.bind(this));
        loader.add('bgScore', 'data/common/background.jpg')
        loader.add('returnMenu','data/common/menu.png')
        this.isLoad=true;
        loader.load();

        }
        this.isPlay=false;
        this.timeSwitch=0;
        APP.alpha=1;
        


		
    }

//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Unload() 
    {
        APP.RemoveChild(this);

    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Update(deltaTime) 
    {
        AudioBackGround.pause();
        AudioBackGround.currentTime = 0;
        if(this.isPlay==true)
        {
        this.timeSwitch+=deltaTime*2;
        APP.alpha-=0.008;
        }
        if(this.targetX!=-1 || this.targetY!=-1)
        {
            if((this.targetX>this.returnMenu.position.x-183 && this.targetX<this.returnMenu.position.x+183) && (this.targetY>this.returnMenu.position.y-56 && this.targetY<this.returnMenu.position.y+56))
            {
               this.isPlay=true;
            }
        }
        if(this.timeSwitch>3)
        {
            StateManager.SwitchState(StateMenu);
            this.targetX = -1;
            this.targetY = -1;
            
        }
        this.score = Score;
        this.scoreText.text = 'Your score \n   '+this.score;
    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    LoadProgressHandler(loader, resource) 
    {

        switch (resource.name)
		{
			
			
			case "bgScore":
			{
				this.bgScore = new PIXI.Sprite(PIXI.loader.resources.bgScore.texture);
				this.bgScore.anchor.set(0.5, 0.5);
				this.bgScore.position.set(APP.GetWidth()/2, APP.GetHeight()/2);
				break;
            }
            case "returnMenu":
			{
				this.returnMenu = new PIXI.Sprite(PIXI.loader.resources.returnMenu.texture);
                this.returnMenu.position.set(APP.GetWidth()/2-50 , APP.GetHeight()/2+200);
                this.returnMenu.anchor.set(0.5);
				break;
            }

			
		}
    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    LoadErrorHandler() 
    {
		console.log("LoadErrorHandler: " + error);

    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//


    LoadCompleteHandler() 
    {

        this.addChild(this.bgScore);
        this.scoreText.position.set(APP.GetWidth()/2,APP.GetHeight()/2-300);
        this.scoreText.anchor.set(0.5);
        this.addChild(this.scoreText);
        this.addChild(this.returnMenu);


    }

//---------------------------------------------------------------------------------------------------------------------------------------------------//

   TouchHandler(event)
	{
		if (Input.IsTouchDown(event))
		{
			this.targetX = Input.touchX;
            this.targetY = Input.touchY;
         
		}
		else if (Input.IsTouchUp(event))
		{

			this.targetX = -1;
            this.targetY = -1;
		}
	}
}

module.exports = new StatePlayAgain();