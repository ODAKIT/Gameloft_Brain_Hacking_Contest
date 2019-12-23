class LoadingState extends PIXI.Container 
{
    constructor()
    {
        super();

        this.targetY=-1;
        this.targetX=-1;
        this.isLoad=false;
 
        this.loadbar=null;
        this.loadbarStart=null;
        this.bgLoad=null;

        this.isPlay=false;

        this.timeLoad=0;
        const style = new PIXI.TextStyle({
            fill: "yellow",
            fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold",
            strokeThickness: 3
        });
        this.text1 = new PIXI.Text('Tips : \n1.Combo 5 block sẽ tạo ra một special booster.', style);
        this.text2 = new PIXI.Text('2.Một Special Booster sẽ ăn combo 8 block xung quanh nó', style);
        this.text3 = new PIXI.Text('3.Làm đầy thanh năng lượng để nhận frenzy mod', style);
        this.text4 = new PIXI.Text('4.Trong trạng thái frenzy mod , combo 5 block = 1 frenzy booster', style);
        this.text5 = new PIXI.Text('5.Cái thanh loading dưới này chỉ để cho đẹp :))', style);
        this.text6 = new PIXI.Text('HÃY CỐ GẮNG ĐẠT SỐ ĐIỂM CAO NHẤT NHÉ , GOOD LUCK!', style);


      
    }

//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Load() 
    {
        //Load vào resource

        


        APP.addChild(this);
        APP.alpha=1;


        if(this.isLoad==false)
        {
        const loader = PIXI.loader;
        loader.on("progress", this.LoadProgressHandler.bind(this));
		loader.on("error", this.LoadErrorHandler.bind(this));
		loader.on("complete", this.LoadCompleteHandler.bind(this));
        loader.add('loadbar', 'data/bar_2.png')
        loader.add('loadbarstart','data/bar_1.png')
        loader.add('bgLoad','data/common/background.jpg');
        this.isLoad=true;
        loader.load();

        }
       
        


		
    }

//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Unload() 
    {
        APP.RemoveChild(this);

    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    Update(deltaTime) 
    {
        if(this.isPlay)
        {
        
        
            this.loadbarStart.scale.x+=0.0005;

        
        
        if(this.loadbarStart.scale.x>=0.39 && gameMode==2)
        {
            this.targetX = -1;
            this.targetY = -1;
            StateManager.SwitchState(StateGame);
            this.loadbarStart.scale.x=0;
            
        }
        else if(this.loadbarStart.scale.x>=0.39 && gameMode==1)
        {
            this.targetX = -1;
            this.targetY = -1;
            StateManager.SwitchState(StateGameRank);
            this.loadbarStart.scale.x=0;
            
        }

        //ShowTip
        if(this.text1.alpha<1)
        {
            this.text1.alpha+=0.0075;
        }
        if(this.text1.alpha>=1)
        {
            this.text2.alpha+=0.0075;
        }
        if(this.text2.alpha>=1)
        {
            this.text3.alpha+=0.0075;
        }
        if(this.text3.alpha>=1)
        {
            this.text4.alpha+=0.0075;
        }
        if(this.text4.alpha>=1)
        {
            this.text5.alpha+=0.0075;
        }
        if(this.text5.alpha>=1)
        {
            this.text6.alpha+=0.01;
        }
        }

    }


//---------------------------------------------------------------------------------------------------------------------------------------------------//

    LoadProgressHandler(loader, resource) 
    {

        switch (resource.name)
		{
			case "bgLoad":
			{
				this.bgLoad = new PIXI.Sprite(PIXI.loader.resources.bgLoad.texture);
				this.bgLoad.anchor.set(0.5, 0.5);
				this.bgLoad.position.set(APP.GetWidth()/2, APP.GetHeight()/2);
				break;
            }
			case "loadbar":
			{
				this.loadbar = new PIXI.Sprite(PIXI.loader.resources.loadbar.texture);
                this.loadbar.position.set(APP.GetWidth()/2-400, APP.GetHeight()/2);
                this.loadbar.scale.set(0.4);

				break;
            }

            case "loadbarstart":
			{
				this.loadbarStart = new PIXI.Sprite(PIXI.loader.resources.loadbarstart.texture);
                this.loadbarStart.position.set(APP.GetWidth()/2-390, APP.GetHeight()/2);
                this.loadbarStart.scale.set(0.4);
                this.loadbarStart.scale.x=0;


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
        this.addChild(this.bgLoad);
        this.addChild(this.loadbar);
        this.addChild(this.loadbarStart);
        this.isPlay=true;
        this.text1.position.set(APP.GetWidth()/2-500, APP.GetHeight()/2-500);
        this.text2.position.set(APP.GetWidth()/2-500, APP.GetHeight()/2-380);
        this.text3.position.set(APP.GetWidth()/2-500, APP.GetHeight()/2-300);
        this.text4.position.set(APP.GetWidth()/2-500, APP.GetHeight()/2-200);
        this.text5.position.set(APP.GetWidth()/2-500, APP.GetHeight()/2-100);
        this.text6.position.set(APP.GetWidth()/2-450, APP.GetHeight()/2+200);
        this.text1.alpha=0;
        this.text2.alpha=0;
        this.text3.alpha=0;
        this.text4.alpha=0;
        this.text5.alpha=0;
        this.text6.alpha=0;




        this.addChild(this.text1);
        this.addChild(this.text2);
        this.addChild(this.text3);
        this.addChild(this.text4);
        //this.addChild(this.text5);
        this.addChild(this.text6);





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

module.exports = new LoadingState();