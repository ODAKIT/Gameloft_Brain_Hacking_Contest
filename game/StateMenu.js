class StateMenu extends PIXI.Container 
{
    constructor()
    {
        super();

        this.buttonNormal = null;
        this.buttonTower = null;
        this.bgMenu=null;
        this.targetX =-1;
        this.targetY = -1;
        this.isLoad = false;
        this.isLoadComplete=false;
        this.timeSwitch = 0;
        this.isPlay = false;
        this.block = [];
        this.matrixGameLoft = [
            [1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0	,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],   //52x5
        ]
	 	// 	   [0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            // [0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0],
            // [0,1,0,1,1,1,0,0,1,1,1,1,1,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,0,0,1,0,0],
            // [0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0],
            // [0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0],   //52x5
        this.curPosx = APP.GetWidth()/2-350;
        this.curPosy = APP.GetHeight()/2-500;
        this.direc = 20;


        this.Logo = null;
        

    }

    RandomColor()
    {
        for(let i = 0 ; i<5 ; i++)
        {
            for(let j = 0 ; j<47 ; j++)
            {
                if(this.matrixGameLoft[i][j]==1)
                    {
                        let x = Math.floor((Math.random() * 4) + 0);

                        if(x==0)
                        {
                            this.block[i*7+j].texture= PIXI.loader.resources.blockblue.texture;                        
                        }
                        else if(x==1)
                        {
                            this.block[i*7+j].texture= PIXI.loader.resources.blockgreen.texture;                        
                        }
                        else if(x==2)
                        {
                            this.block[i*7+j].texture= PIXI.loader.resources.blockyellow.texture;                        
                        }
                        else if(x==3)
                        {
                            this.block[i*7+j].texture= PIXI.loader.resources.blockpink.texture;                        
                        }   

                    }
            }
        }
    }
    
//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Load() 
    {
        //Load vào resource

        


        APP.addChild(this);


        if(this.isLoad==false)
        {
        const loader = PIXI.loader;
        loader.on("progress", this.LoadProgressHandler.bind(this));
		loader.on("error", this.LoadErrorHandler.bind(this));
		loader.on("complete", this.LoadCompleteHandler.bind(this));
        loader.add('bgMenu', 'data/common/backgroundMenu.jpg')
        loader.add('normal','data/common/normal.png')
        loader.add('blockblue', 'data/image/blue.png')   //0
        loader.add('blockgreen', 'data/image/green.png') // 1
        loader.add('blockpink', 'data/image/pink.png')   // 2
        loader.add('blockyellow', 'data/image/yellow.png') // 3
        loader.add('logo','data/image/gameloft.png')
        loader.add('tower','data/common/tower.png');
        this.isLoad=true;
        loader.load();

        }
        this.timeSwitch=0;
        this.isPlay=false;
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
        if(this.isPlay==true)
        {
            this.timeSwitch+=deltaTime*2;
            APP.alpha-=0.008;
        }
        if(this.targetX!=-1 || this.targetY!=-1)
        {
            if((this.targetX>this.buttonNormal.position.x-182 && this.targetX<this.buttonNormal.position.x+182) && (this.targetY>this.buttonNormal.position.y-56 && this.targetY<this.buttonNormal.position.y+56))
            {
                gameMode =1;
               this.isPlay=true;
            }
            if((this.targetX>this.buttonTower.position.x-182 && this.targetX<this.buttonTower.position.x+182) && (this.targetY>this.buttonTower.position.y-56 && this.targetY<this.buttonTower.position.y+56))
            {
                gameMode=2;
                this.isPlay=true;
            }
        }
        if(this.timeSwitch>3 && gameMode==2)
        {
            StateManager.SwitchState(LoadingState);
            //MenuToGame=false;
            this.targetX = -1;
            this.targetY = -1;
            
        }
        else if(this.timeSwitch>3 && gameMode==1)
        {
            StateManager.SwitchState(LoadingState);
            //MenuToGame=false;
            this.targetX = -1;
            this.targetY = -1;
            
        }

        if(this.isLoadComplete==true)
        {
            this.RandomColor();
        }
       
    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    LoadProgressHandler(loader, resource) 
    {

        switch (resource.name)
		{
			
			
			case "bgMenu":
			{
				this.bgMenu = new PIXI.Sprite(PIXI.loader.resources.bgMenu.texture);
				this.bgMenu.anchor.set(0.5, 0.5);
				this.bgMenu.position.set(APP.GetWidth()/2, APP.GetHeight()/2);
				break;
            }
            case "normal":
			{
				this.buttonNormal = new PIXI.Sprite(PIXI.loader.resources.normal.texture);
                this.buttonNormal.anchor.set(0.5, 0.5);
                this.buttonNormal.position.set(APP.GetWidth()/2-200, APP.GetHeight()/2+400);
				break;
            }
            case "logo":
			{
				this.logo = new PIXI.Sprite(PIXI.loader.resources.logo.texture);
                this.logo.anchor.set(0.5, 0.5);
                this.logo.scale.set(0.3);
				this.logo.position.set(APP.GetWidth()/2-1002/2+50, APP.GetHeight()/2-1334/2+50);
				break;
            }
            case "tower":
			{
				this.buttonTower = new PIXI.Sprite(PIXI.loader.resources.tower.texture);
                this.buttonTower.anchor.set(0.5, 0.5);
				this.buttonTower.position.set(APP.GetWidth()/2+200, APP.GetHeight()/2+400);
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

        this.addChild(this.bgMenu);
        this.addChild(this.buttonNormal);
        this.addChild(this.buttonTower);

        for(let i = 0 ; i<5 ; i++)
            {
                for(let j = 0 ; j<47 ; j++)
                {
                    if(this.matrixGameLoft[i][j]==1)
                    {
                        let x = Math.floor((Math.random() * 4) + 0);

                        if(x==0)
                        {
                            this.block[i*7+j]= (new PIXI.Sprite(PIXI.loader.resources.blockblue.texture));                        
                        }
                        else if(x==1)
                        {
                            this.block[i*7+j]=(new PIXI.Sprite(PIXI.loader.resources.blockgreen.texture));                        
                        }
                        else if(x==2)
                        {
                            this.block[i*7+j]=(new PIXI.Sprite(PIXI.loader.resources.blockyellow.texture));                        
                        }
                        else if(x==3)
                        {
                            this.block[i*7+j]=(new PIXI.Sprite(PIXI.loader.resources.blockpink.texture));                        
                        }   
                        this.block[i*7+j].position.set(this.curPosx+j*this.direc,this.curPosy+i*this.direc)
                        this.block[i*7+j].scale.set(0.2);
                        this.block[i*7+j].anchor.set(0.5);
                        this.addChild(this.block[i*7+j]);

                    }
                }
            }

        this.isLoadComplete=true;

        this.addChild(this.logo);



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

module.exports = new StateMenu();