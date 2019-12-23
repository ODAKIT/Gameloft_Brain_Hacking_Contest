
class StateGameL2 extends PIXI.Container
{
	//Class sẽ bao gồm mọi tính năng liên quan đến các block
	/*
	1.Click vào các ô ăn điểm
	2.Xử lý animation tại các ô
	3.Dồn ô , tạo ô mới sau khi ăn điểm.
	*/
	constructor()
	{
		super();

		
		this.targetX	= -1;
		this.targetY	= -1;

		//Các khối block đều được lưu trong này
		this.block = [];
		this.blockHint =[];

		//Thời gian mà block sẽ tái tạo
		this.timeBlockAppear = 0;
		//Kiểm tra xem có tạo được block mới hay không
		this.IsNewBlock = false;
		//Màu ban đầu của block
		this.tint = null;

		//Vị trí block bắt đầu , Direc là khoảng cách giữa các block.
		this.curPosX = APP.GetWidth()/2-259;
		this.curPosY = APP.GetHeight()/2-50;
		this.Direc = 86;

		//đếm lượng ô loang
		this.count = 0
		
		this.isPlay = false;

		//Lấy lần click thứ 2
		this.isNewClick = false;
		//Lưu lại vị trí chuột click;
		this.xClick = null;
		this.yClick = null;
		//Kiểm tra có nên tạo special block không
		this.isSpecial = true;

		this.isLoad=false;

		//Lấy màu của khối click để loang
		this.getColorClick= null; 
		// QUY ƯỚC MÀU NHƯ SAU :
		/*
		0:Blue
		1:Green
		2:Yellow
		3:Pink
		*/

		//Mảng để lưu các vị trí i , j đã loang trên 3 block
		//Tác dụng dùng để xóa đi các block đã bị click loang.
		this.xArray = [];
		this.yArray = []
		this.colorArray = [];


		//Ma trận các block nhằm sử dụng vết dầu loang
		this.matrixBlock = new Array(8);
		for (var i = 0; i < 8; i++) 
			this.matrixBlock[i] = new Array(7);

		//Tạo ra một 2d block tạm để quét loang(là một mảng phụ trợ giúp trong việc dồn , truy quét tránh thay đổi matrix ban đầu)
		

		



		//các hoạt ảnh của animation khi click.
		this.clickAnim = [];
		this.curAnimation = null; //Trạng thái đầu tiên của animation


		//Số lượng anim tương ứng với số lượng block đã xóa
		this.animation = null;  //Animation khi click
		this.blockAnim = [];    // Mỗi block sẽ sở hữu 1 animation
		this.countAnim =0;
		this.timePlay = 0;     //Thời gian play Animation
		this.isAnimPlay=false;



		//UI  : Countdown , time frenzy , Frenzy bar
		this.timeBar = null;

		this.uiBrand = null;

		this.clock =null;

		this.scoreUI = null;

		this.frenzyTimeUI =null;

		this.frenzyTimeBar = null;

		this.score=0;

		this.home =null;

		this.time=Math.floor(new Date().getTime()/1000);

		//Background
		this.bg = null;
		this.interactive = true;
		const style = new PIXI.TextStyle({
			fill: [
				"black",
				"aqua"
			],
			fontFamily: "\"Lucida Sans Unicode\", \"Lucida Grande\", sans-serif",
			strokeThickness: 3
		});
		this.scoreText = new PIXI.Text('0', style);
		this.timeCountDown = new PIXI.Text('30',style);

		this.IsSwitch=false;
		
		//Thoi gian chuyen scene:
		this.timeSwitch=0;

	 	//tránh load 2 lần lỗi game

		//Các biến xử lý frenzy time
		this.isFrenzyTime = false;
		this.timeChangePos = 0;
		this.onlyTimefrenzy = false;


		//Nhắc nhở các block ăn đc:
		this.isRemind = true;
		this.isRemindnew=true;
		this.timeRemind=0;
		this.hand=null;
		this.timeOfGame=0;
		


		//Audio
		this.CountDown = new Audio('data/sound/Coutdown.m4a');
		this.gameover = null;

		this.isResetAllBlock = false;

		this.timeResetBlock=0;

		APP.AddChild(this);
	}

	 

	
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{

		APP.addChild(this);
		APP.alpha=1;
		this.timeSwitch=0;
		// AudioBackGround.pause();
		// AudioBackGround.currentTime = 0;
		if(this.isLoad==false)
		{

			//Load animation
			const loader = PIXI.loader;
	
			loader.add('hintx','data/image/hint.png');
			

		//Khởi tạo vận tốc cho mỗi khối
	
		


			loader.on("progress", this.LoadProgressHandler.bind(this));
			loader.on("error", this.LoadErrorHandler.bind(this));
			loader.on("complete", this.LoadCompleteHandler.bind(this));

			//load image
			loader.add('bluex', 'data/image/bluex.png')   //0
			loader.add('red', 'data/image/red.png') // 1
			loader.add('violet', 'data/image/violet.png')   // 2
			loader.add('yellowx', 'data/image/yellowx.png') // 3
			loader.add('bgx', 'data/common/background.jpg')
			loader.add('specialx','data/image/special.png') //5;
			loader.add('frenzyx','data/image/frenzy.png')  //8
			loader.add('timebarx','data/image/timebar.jpg')
			loader.add('uibrandx','data/image/ui-brand.png')
			loader.add('clockx','data/image/clock.png')
			loader.add('scoreUIx','data/image/score.png')
			loader.add('frenzyTimeUIx','data/image/score.png')
			loader.add('frenzyTimeBarx','data/image/frenzybar.png')
			loader.add('gameoverx','data/image/gameover.png')
			loader.add('gamehome','data/image/Home.png');
			
			for (var i = 1; i < 7; i++) 
			{
				this.clickAnim.push(new PIXI.Texture.from('data/animation/explosion/anim_'+i+'.png'));
			}
			for(let i = 0 ;i<7*7;i++)
			{
				this.animation = new PIXI.extras.AnimatedSprite(this.clickAnim);
				this.animation.animationSpeed = 0.3;
				this.animation.anchor.set(0.5);
				this.animation.visible=false;
				this.blockAnim.push(this.animation);

				
			
	
			}






			loader.load();
			}
		

	}

	Reset()
	{
		this.time=0;
		this.score=0;
		this.timeSwitch=0;
		for(let i = 0 ; i<7 ; i++)
			{
				for(let j = 0 ; j<7 ; j++)
				{	
						//nếu click chuột được đặt trong 1 block	
							let x = Math.floor((Math.random() * 4) + 0);
						if(x==0)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.bluex.texture;
						}
						else if(x==1)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.red.texture;
						}
							else if(x==2)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.yellowx.texture;
						}
						else if(x==3)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.violet.texture;
						}
						this.matrixBlock[i][j]=x;
						this.blockHint[i*7+j].visible=false;

					
				}
				
			}
			AudioBackGround.pause();
			AudioBackGround.currentTime = 0;
			this.CountDown.pause();
			this.CountDown.currentTime=0;

			this.isPlay=false;
			this.timeCountDown.text=30;
			this.isFrenzyTime=false;
			this.frenzyTimeBar.scale.x=0;
			this.gameover.alpha=0;
			

	}
	

//--------------------------------------------------------------------------UNLOAD-----------------------------------------------------------------------------------

	Unload()
	{
		AudioBackGround.pause();
		APP.RemoveChild(this);
	}

//----------------------------------------------------------CÀI ĐẶT THUẬT TOÁN XỬ LÝ CHÍNH TRONG GAME---------------------------------------------------------------------------//
/*
Thuật toán loang ma trận dùng đệ quy hay còn gọi là vết dầu loang
Phải gọi lại 4 lần(chưa tối ưu) , có thể tái sử dụng(chỉ tạo 1 hàm duy nhất) bằng cách dùng biến tạm nhưng bị lỗi max call stack
*/
	loangGreen(i,j)
	{			
				this.xArray.push(j);
				this.yArray.push(i);
				this.colorArray.push(this.matrixBlock[i][j]);
				this.matrixBlock[i][j]=-1;
				
		   		if(i<7 && this.matrixBlock[i+1][j] == 1 )
				{
				    this.loangGreen(i+1,j);
				    this.count++;
				}
		   		if(j<7 && this.matrixBlock[i][j+1] == 1 )
		   		{
				    this.loangGreen(i,j+1);
				    this.count++;

				}
		   		if(i>0 && this.matrixBlock[i-1][j] == 1 )
		   		{
			   		 this.loangGreen(i-1,j);
			  		 this.count++;

		   		}
		   		if(j>0 && this.matrixBlock[i][j-1] == 1 )
		   		{
			   		this.loangGreen(i,j-1);
			  	 	this.count++;
		   		}
			
	} 
	loangBlue(i,j)
	{
				this.xArray.push(j);
				this.yArray.push(i);
				this.colorArray.push(this.matrixBlock[i][j]);
				this.matrixBlock[i][j]=-1;
				
		   		if(i<7 && this.matrixBlock[i+1][j] == 0 )
				{
				    this.loangBlue(i+1,j);
				    this.count++;
				}
		   		if(j<7 && this.matrixBlock[i][j+1] == 0 )
		   		{
				    this.loangBlue(i,j+1);
				    this.count++;

				}
		   		if(i>0 && this.matrixBlock[i-1][j] == 0 )
		   		{
			   		 this.loangBlue(i-1,j);
			  		 this.count++;

		   		}
		   		if(j>0 && this.matrixBlock[i][j-1] == 0 )
		   		{
			   		this.loangBlue(i,j-1);
			  	 	this.count++;
		   		}
			
	} 
	loangYellow(i,j)
	{
			this.xArray.push(j);
			this.yArray.push(i);
			this.colorArray.push(this.matrixBlock[i][j]);
			this.matrixBlock[i][j]=-1;
				
		   		if(i<7 && this.matrixBlock[i+1][j] == 2 )
				{
				    this.loangYellow(i+1,j);
				    this.count++;
				}
		   		if(j<7 && this.matrixBlock[i][j+1] == 2 )
		   		{
				    this.loangYellow(i,j+1);
				    this.count++;

				}
		   		if(i>0 && this.matrixBlock[i-1][j] == 2 )
		   		{
			   		 this.loangYellow(i-1,j);
			  		 this.count++;

		   		}
		   		if(j>0 && this.matrixBlock[i][j-1] == 2 )
		   		{
			   		this.loangYellow(i,j-1);
			  	 	this.count++;
		   		}
			
	} 
	loangPink(i,j)
	{			
				this.xArray.push(j);
				this.yArray.push(i);
				this.colorArray.push(this.matrixBlock[i][j]);
				this.matrixBlock[i][j]=-1;
				
		   		if(i<7 && this.matrixBlock[i+1][j] == 3 )
				{
				    this.loangPink(i+1,j);
				    this.count++;
				}
		   		if(j<7 && this.matrixBlock[i][j+1] == 3 )
		   		{
				    this.loangPink(i,j+1);
				    this.count++;

				}
		   		if(i>0 && this.matrixBlock[i-1][j] == 3 )
		   		{
			   		 this.loangPink(i-1,j);
			  		 this.count++;

		   		}
		   		if(j>0 && this.matrixBlock[i][j-1] == 3 )
		   		{
			   		this.loangPink(i,j-1);
			  	 	this.count++;
		   		}
			
	} 
	loangSpecial(i,j)
	{			
				this.xArray.push(j);
				this.yArray.push(i);
				this.colorArray.push(this.matrixBlock[i][j]);
				this.matrixBlock[i][j]=-1;
				
		   		if(i<6)
				{
					this.xArray.push(j);
					this.yArray.push(i+1);
					if(this.matrixBlock[i+1][j]==5)
					{
						this.loangSpecial(i+1,j)

					}
				    this.matrixBlock[i+1][j]=-1;
				    this.count++;
				}
		   		if(j<6)
		   		{
					this.xArray.push(j+1);
					this.yArray.push(i);
					if(this.matrixBlock[i][j+1]==5)	
					{
						this.loangSpecial(i,j+1)

					}
					if(i<6)
					{
						this.xArray.push(j+1);
						this.yArray.push(i+1);
						if(this.matrixBlock[i+1][j+1]==5)
						{
							this.loangSpecial(i+1,j+1)

						}
						this.matrixBlock[i+1][j+1]=-1;
						this.count++;

					}
					this.matrixBlock[i][j+1]=-1;
				    this.count++;

				}
		   		if(i>0)
		   		{
					this.xArray.push(j);
					this.yArray.push(i-1);

					if(this.matrixBlock[i-1][j]==5)
					{
						this.loangSpecial(i-1,j)

					}
					if(j<6)
					{
						this.xArray.push(j+1);
						this.yArray.push(i-1);
						if(this.matrixBlock[i-1][j+1]==5)
						{
							this.loangSpecial(i-1,j+1)

						}
						this.matrixBlock[i-1][j+1]=-1;
						this.count++;
					}
					this.matrixBlock[i-1][j]=-1;
			  		this.count++;

		   		}
		   		if(j>0)
		   		{
					this.xArray.push(j-1);
					this.yArray.push(i);
					
					if(this.matrixBlock[i][j-1]==5)
					{
						this.loangSpecial(i,j-1)

					}
					if(i<6)
					{
						this.xArray.push(j-1);
						this.yArray.push(i+1);
						if(this.matrixBlock[i+1][j-1]==5)
						{
							this.loangSpecial(i+1,j-1)

						}
						this.matrixBlock[i+1][j-1]=-1;
						this.count++;
					}
					this.matrixBlock[i][j-1]=-1;
			  	 	this.count++;
				}
				if(i>0 && j>0)
				{
					this.xArray.push(j-1);
					this.yArray.push(i-1);
					if(this.matrixBlock[i-1][j-1]==5)
					{
						this.loangSpecial(i-1,j-1);
					}
					this.matrixBlock[i-1][j-1]=-1;
			  	 	this.count++;
				}
			
	}
	loangFrenzy()
	{
			for(let m = 0 ; m< 7 ; m++)
			{
				for(let n = 0 ; n<7 ; n++)
				{
					if(this.matrixBlock[m][n]==8)
					{
						for(let x = 0 ; x<7 ; x++)
						{
							this.matrixBlock[m][x]=-1;
							this.count++;
							this.xArray.push(x);
							this.yArray.push(m);
							this.colorArray.push(this.matrixBlock[m][x]);


							this.matrixBlock[x][n]=-1;
							this.count++;
							this.xArray.push(n);
							this.yArray.push(x);
							this.colorArray.push(this.matrixBlock[x][n]);
						}
						
						
					}
				}
			}
				
			
	} 
	


//------------------------------------------------------------------CÁC THAO TÁC XỬ LÝ CHÍNH TRONG GAME ----------------------------------------------------------------------------//
	//Hàm này là khi click vào một ô thì nó sẽ tiến hành check và ăn điểm
	ClickBlock()
	{
		
		if(this.targetX!=-1 || this.targetY!=-1)
		{
			if ((this.targetX>this.home.position.x-60 && this.targetX<this.home.position.x+60) && (this.targetY>this.home.position.y-60 && this.targetY<this.home.position.x+60))
			{
				this.targetY=-1;
				this.targetX=-1;
				this.Reset();
				StateManager.SwitchState(StateMenu);
			}
		}
		if ((this.targetX != -1 || this.targetY != -1) && this.isNewClick==false) 
		{
		
			this.count=0;
			for(let i = 0 ; i<7 ; i++)
			{
				for(let j = 0 ; j<7 ; j++)
					{	
						//nếu click chuột được đặt trong 1 block	
						if((this.targetX>this.block[i*7+j].position.x-43 && this.targetX<this.block[i*7+j].position.x+43) && (this.targetY>this.block[i*7+j].position.y-43 && this.targetY<this.block[i*7+j].position.y+43))
						{
							this.xClick=j;
							this.yClick=i;
							this.getColorClick = this.matrixBlock[i][j];
							if(this.getColorClick==-1)
								break;
							else
							{	
								this.xArray=[];
								this.yArray=[];
								this.colorArray=[];

								if(this.getColorClick==0)
									{
										this.loangBlue(i,j);
									}
								else if(this.getColorClick==1)
									{
										this.loangGreen(i,j);
									}
								else if(this.getColorClick==2)
									{
										this.loangYellow(i,j);
									}
								else if(this.getColorClick==3)
									{
										this.loangPink(i,j);
									}
								else if(this.getColorClick==5)
									{
										const audioNormal = new Audio('data/sound/SpecialBlock.mp3');
										audioNormal.play();
										this.loangSpecial(i,j);
										this.isSpecial=false;
										
									}
								else if(this.getColorClick==8)
									{	
										const audioNormal = new Audio('data/sound/frenzyBlock.mp3');
										audioNormal.play();
										this.loangFrenzy();
										
									}		
							}

							//Do hàm Input MouseUp xử lý chậm nên cập nhật tại đây đảm bảo code không gọi quá nhiều
							this.targetX = -1;
							this.targetY = -1;
						}
					}
				
				}
			


			//Sau khi loang xong thì bắt đầu xét các ô loang theo yêu cầu gameplay
			//Nếu số ô đã loang lớn hơn 3 ô lúc này tiến hành xóa + ăn điểm và tạo animation
			if(this.count+1>=3)
			{

				//Audio play

				if(this.isSpecial==true)
				{
				const audioNormal = new Audio('data/sound/NormalBlock.mp3');
				audioNormal.play();
				}
				




				this.timeRemind=0;
				this.isNewClick=true;
				for(let i = 0 ; i<this.xArray.length ; i++)
					this.block[this.yArray[i]*7+this.xArray[i]].texture=null;

				

				for(let i = 0 ; i<this.xArray.length ; i++)
				{
					this.blockAnim[this.yArray[i]*7+this.xArray[i]].visible=true;
					this.blockAnim[this.yArray[i]*7+this.xArray[i]].play();
				}
				this.isAnimPlay=true;
				this.IsNewBlock=true;
				CreateNewBlockLV2(this.xArray,this.yArray,this.block,this.matrixBlock);

				//An remind di
				if(this.isRemind==false)
				{
					for(let i = 0 ; i<49 ; i++)
						this.blockHint[i].visible=false;
					this.isRemind=true;
				}

				//An remind new game
				if(this.isRemindnew==false)
				{
					for(let i = 0 ; i < 49 ; i++)
					{
						this.block[i].tint=this.tint;
					}
				}
				//tạo ra block special
				
				if(this.count+1>=5 && this.isSpecial==true)
				{
					
						if(this.isFrenzyTime==false)
						{
							this.block[this.yClick*7+this.xClick].texture=PIXI.loader.resources.specialx.texture
							this.matrixBlock[this.yClick][this.xClick]=5;
						}
						else
						{
							this.block[this.yClick*7+this.xClick].texture=PIXI.loader.resources.frenzyx.texture
							this.matrixBlock[this.yClick][this.xClick]=8;
						}
					
				}
				//tạo ra block frenzy
				if(this.frenzyTimeBar.scale.x<1 && this.isFrenzyTime==false)
				{
					if(this.count+1>=5 && this.getColorClick==5)
					{
						this.frenzyTimeBar.scale.x+=(this.count+1)*0.02;
					}
					else
					{
						this.frenzyTimeBar.scale.x+=(this.count+1)*0.01;
					}
					if(this.frenzyTimeBar.scale.x>1)
					{
						this.frenzyTimeBar.scale.x=1;
						this.isFrenzyTime=true;
						const audio = new Audio('data/sound/FrenzyMode.mp3');
						audio.play();
					}
				}
				
				//TÍNH ĐIỂM :
				this.score+=(this.count+1)*10 + (this.count+1)*5;
			}
			//nếu chỉ tồn tại 2 block loang nhau ,  thì trả về giá trị block ban đầu.
			else
			{
					for(let i = 0 ; i<this.xArray.length ; i++)
						this.matrixBlock[this.yArray[i]][this.xArray[i]]=this.colorArray[i];


					this.xArray=[];
					this.yArray=[];
					this.colorArray=[];
			}
			
		}
	}


	CheckTimeReturnMenuScene(deltaTime)
	{
		if(this.timeOfGame<=1)
		{
			if(this.score<10000)
			{
				this.gameover.alpha+=0.05;
			}
			this.timeSwitch+=deltaTime*1.5;
			APP.alpha-=0.015
			if(this.timeSwitch>3 && this.score>10000)
			{
				this.timeOfGame=30;
				Score = this.score;
				this.Reset();
				StateManager.SwitchState(StateLV3);	
			}
			else if(this.timeSwitch>3 && this.score<10000)
			{
				this.timeOfGame=30;
				Score = this.score;
				this.Reset();
				StateManager.SwitchState(this);	
			}
	
		}
	}



	//Hàm UI action là các thao tác ta có thể nhìn thấy khi các UI làm việc
	ResetFrenzy()
	{
		for(let i = 0 ; i<7  ; i++)
			for(let j = 0 ; j<7 ; j++)
				{

					if(this.matrixBlock[i][j]==8)
						{
							let x = Math.floor((Math.random() * 4) + 0);
							this.matrixBlock[i][j]=x;
							if(x==0)
							{
								this.block[i*7+j].texture = PIXI.loader.resources.bluex.texture;
							}
							else if(x==1)
							{
								this.block[i*7+j].texture = PIXI.loader.resources.red.texture;
							}
							else if(x==2)
							{
								this.block[i*7+j].texture = PIXI.loader.resources.yellowx.texture;
							}
							else if(x==3)
							{
								this.block[i*7+j].texture = PIXI.loader.resources.violet.texture;
							}
						}
							this.timeChangePos=0;
							this.onlyTimefrenzy=false;
					}
	}

	ResetAllBlock()
	{
		for(let i = 0 ; i<7 ; i++)
			{
				for(let j = 0 ; j<7 ; j++)
				{	
						//nếu click chuột được đặt trong 1 block	

							let x = Math.floor((Math.random() * 4) + 0);
						if(x==0)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.bluex.texture;
						}
						else if(x==1)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.red.texture;
						}
							else if(x==2)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.yellowx.texture;
						}
						else if(x==3)
						{
							this.block[i*7+j].texture = PIXI.loader.resources.violet.texture;
						}
						this.matrixBlock[i][j]=x;
						
					
				}
				
			}
	}


	ChangeFrenzyToSpecial()
	{
		for(let i = 0 ; i<7  ; i++)
			for(let j = 0 ; j<7 ; j++)
				{
					if(this.matrixBlock[i][j]==8)
						{
							this.matrixBlock[i][j]=5;
							
								this.block[i*7+j].texture = PIXI.loader.resources.specialx.texture;
						
						}
					}
	}
	ChangeSpecialToFrenzy()
	{
		for(let i = 0 ; i<7  ; i++)
			for(let j = 0 ; j<7 ; j++)
				{
					if(this.matrixBlock[i][j]==5)
						{
							this.matrixBlock[i][j]=8;
							
								this.block[i*7+j].texture = PIXI.loader.resources.frenzyx.texture;
						
						}
					}
	}
	




	FrenzyTime(deltaTime)
	{
		if(this.isFrenzyTime)
			{
				this.ChangeSpecialToFrenzy()

				if(this.timeChangePos<1.5)
				{
					if(this.onlyTimefrenzy==false)
						{
							for(let i = 0 ; i<4 ; i++)
								{
									let x = Math.floor((Math.random() * 7) + 0);
									let y = Math.floor((Math.random() * 7) + 0);
									this.block[y*7+x].texture=PIXI.loader.resources.frenzyx.texture
									this.matrixBlock[y][x]=8;
								}
						this.onlyTimefrenzy=true;
						}
						this.timeChangePos+=deltaTime*1.5;
				}
				else
				{
					this.ResetFrenzy();
					
				}
								
			}
	}




	UIAction()
	{
		if(this.isPlay)
		{
			 this.timeCountDown.text = 30-(Math.floor(new Date().getTime()/1000)-this.time);
			 if(this.frenzyTimeBar.scale.x>0 && this.isFrenzyTime==true)
				{
					this.frenzyTimeBar.scale.x-=0.0025;
					
				}
				else
				{
					this.isFrenzyTime=false;
					this.ChangeFrenzyToSpecial();
				}
		}
	this.scoreText.text=this.score + '/10000';
	}
	




	RemindBlock()
	{
		//Cac block special va frenzy uu tien xet truoc
		for(let i = 0 ; i<7 ; i++)
		{
			for(let j = 0 ; j<7 ; j++)
			{	
				let color = this.matrixBlock[i][j];
				if(color == 8)
				{
						this.blockHint[i*7+j].visible=true;
						this.blockHint[i*7+j].alpha=1;
						
					
					this.isRemind=false;
				
					return;
				}
			}
		}
		for(let i = 0 ; i<7 ; i++)
		{
			for(let j = 0 ; j<7 ; j++)
			{	
				let color = this.matrixBlock[i][j];
				if(color ==5)
				{
						this.blockHint[i*7+j].visible=true;
						this.blockHint[i*7+j].alpha=1;
						
					
					this.isRemind=false;
				
					return;
				}
			}
		}
	   for(let i = 0 ; i<7 ; i++)
		{
			for(let j = 0 ; j<7 ; j++)
			{	
				let color = this.matrixBlock[i][j];
				if(color==0)
				{
					this.loangBlue(i,j);
				}
			else if(color==1)
				{
					this.loangGreen(i,j);
				}
			else if(color==2)
				{
					this.loangYellow(i,j);
				}
			else if(color==3)
				{
					this.loangPink(i,j);
				}
			

				if(this.count+1>=3)
				{
			

					for(let k = 0 ; k<this.xArray.length ; k++)
					{
						this.blockHint[this.yArray[k]*7+this.xArray[k]].visible=true;
						this.blockHint[this.yArray[k]*7+this.xArray[k]].alpha=1;
						this.matrixBlock[this.yArray[k]][this.xArray[k]]=this.colorArray[k];
					}
					
					this.isRemind=false;
				
					return;
				}
				else
				{
					if(i==6 && j==6)
					{
						this.isResetAllBlock=true;
					}
				}
				for(let k = 0 ; k<this.xArray.length ; k++)
				{
						this.matrixBlock[this.yArray[k]][this.xArray[k]]=this.colorArray[k];
				}
				this.count=0;
				this.xArray= [];
				this.yArray= [];
				this.colorArray=[]
					
			}
		}
	}
	
	
	



//-------------------------------------------------------------------------UPDATE FRAME--------------------------------------------------------------------------------------//

	Update(deltaTime)
	{
		AudioBackGround.play();
		
		this.timeOfGame=30-(Math.floor(new Date().getTime()/1000)-this.time);
		if(this.timeOfGame<=5 && this.isPlay)
		{
			this.CountDown.play();
		}
		//Thời gian kết thúc trò chơi
		if(this.isPlay)
		{
			this.CheckTimeReturnMenuScene(deltaTime);
		}		

		//Thao tac click
		this.ClickBlock();
		if(this.isPlay)
			this.FrenzyTime(deltaTime);



		//-------New block appear , effect xuất hiện block mới------
		if(this.timeBlockAppear<0.6 && this.IsNewBlock==true)
		{
			this.timeBlockAppear+=deltaTime*1.5;
			RotateNewBlock(this.xArray,this.yArray,this.block);		
		}


		//-------------------------Mọi thứ sẽ reset về bạn đầu vì mọi animation đều đã thao tác xong--------------------
		else if(this.timeBlockAppear>0.3)
			{	
				ResetRotate(this.xArray,this.yArray,this.block);
				this.IsNewBlock= false;
				this.timeBlockAppear=0;
				this.count=0;
				this.timePlay=0;
				this.xArray=[];
				this.yArray=[];
				this.colorArray=[];
				this.isNewClick=false;
				this.isSpecial=true;
				//Kết thúc một chuỗi sự kiện
			}
		
		ResetScale(this.xArray,this.yArray,this.block);


     //------------Animation Start , sau khi đã ăn điểm.----------------
		if(this.isAnimPlay)
		{
			if(this.timePlay<0.5)
			{
				this.timePlay+=deltaTime*2;

			}
			else
			{	
				for(let i = 0 ; i<this.xArray.length ; i++)
				{
					this.blockAnim[this.yArray[i]*7+this.xArray[i]].visible=false;
					this.blockAnim[this.yArray[i]*7+this.xArray[i]].gotoAndStop(0);
				}

				
				this.isAnimPlay=false;
				
				

			}
		}
		else
		{
			this.count=0;
			this.timePlay=0;
		}



		//Xu ly truong hop khong con match 3 nao
		if(this.isResetAllBlock==true)
		{
			RotateAll(this.block);
			this.timeResetBlock+=deltaTime*2;
			
		}
		if(this.timeResetBlock>=2)
		{
			this.ResetAllBlock();
			RotateResetAll(this.block);
			this.timeResetBlock=0;
			this.isResetAllBlock=false;

		}

		



		//-----------------Xử lý UI----------------;

			
			if(this.timeRemind>3)
			{
				if(this.isRemind)
				{
					this.RemindBlock();
				}
				for(let i = 0 ; i<49 ; i++)
				{
					this.blockHint[i].alpha-=0.02;
					if(this.blockHint[i].alpha<0)
						this.blockHint[i].alpha=1;
				}
			
			}
		
		
		


		this.UIAction();

		
		this.timeRemind+=deltaTime*1.5;



	}












//---------------------------------------------------------------------CÁC PHƯƠNG THỨC LOAD----------------------------------------------------------------------

	LoadProgressHandler(loader, resource)
	{
		switch (resource.name)
		{
			
			
			case "bgx":
			{
				this.bg = new PIXI.Sprite(PIXI.loader.resources.bg.texture);
				this.bg.anchor.set(0.5, 0.5);
				this.bg.position.set(APP.GetWidth()/2, APP.GetHeight()/2);
				break;
			}
			case "timebarx":
			{
				this.timeBar = new PIXI.Sprite(PIXI.loader.resources.timebarx.texture);
				this.timeBar.anchor.set(0.5, 0.5);
				this.timeBar.scale.x +=0.25;

				this.timeBar.position.set(APP.GetWidth()/2, APP.GetHeight()/2-300);

				break;
			}

			case "uibrandx":
			{
				this.uiBrand = new PIXI.Sprite(PIXI.loader.resources.uibrandx.texture);
				this.uiBrand.anchor.set(0.5, 0.5);
				this.uiBrand.position.set(APP.GetWidth()/2, APP.GetHeight()/2-500);
				//this.uiBrand.scale.y*=0.8;

				break;
			}
			case "clockx":
			{
				this.clock = new PIXI.Sprite(PIXI.loader.resources.clockx.texture);
				this.clock.anchor.set(0.5, 0.5);
				this.clock.position.set(APP.GetWidth()/2-320 , APP.GetHeight()/2-300);

				break;
			}
			case "scoreUIx":
			{
				this.scoreUI = new PIXI.Sprite(PIXI.loader.resources.scoreUIx.texture);
				this.scoreUI.anchor.set(0.5, 0.5);
				this.scoreUI.position.set(APP.GetWidth()/2-180 , APP.GetHeight()/2-300);
		
				break;
			}
			case "frenzyTimeUIx":
			{
				this.frenzyTimeUI = new PIXI.Sprite(PIXI.loader.resources.frenzyTimeUIx.texture);
				this.frenzyTimeUI.anchor.set(0.5, 0.5);
				this.frenzyTimeUI.position.set(APP.GetWidth()/2+80 , APP.GetHeight()/2-300);
		
				break;
			}
			case "frenzyTimeBarx":
			{
				this.frenzyTimeBar = new PIXI.Sprite(PIXI.loader.resources.frenzyTimeBarx.texture);
				this.frenzyTimeBar.position.set(APP.GetWidth()/2+70+50 , APP.GetHeight()/2-320);
				this.frenzyTimeBar.scale.x=0;
		
				break;
			}
			case "gameoverx":
				{
					this.gameover = new PIXI.Sprite(PIXI.loader.resources.gameover.texture)
					this.gameover.position.set(APP.GetWidth()/2-250 , APP.GetHeight()/2-100);
					this.gameover.alpha=0;
					
				}
			case "gamehome":
				{
					this.home = new PIXI.Sprite(PIXI.loader.resources.home.texture)
					this.home.position.set(APP.GetWidth()/2-1002/2+50, APP.GetHeight()/2-1334/2+50);
					this.home.scale.set(0.5);
					this.home.anchor.set(0.5);
				}
		}
	}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadErrorHandler(error)
	{
		console.log("LoadErrorHandler: " + error);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadCompleteHandler()
	{

		if(this.isLoad==false)
		{
			this.addChild(this.bg);
			this.addChild(this.timeBar);
			this.addChild(this.uiBrand);
			this.addChild(this.clock);
			this.addChild(this.scoreUI);
			this.addChild(this.frenzyTimeUI);
			this.addChild(this.frenzyTimeBar);
			this.addChild(this.scoreText);
			this.addChild(this.home);
			this.scoreText.anchor.set(0.5);
			this.scoreText.position.set(APP.GetWidth()/2-50 , APP.GetHeight()/2-300)
			this.addChild(this.timeCountDown);
			this.timeCountDown.anchor.set(0.5);
			this.timeCountDown.position.set(APP.GetWidth()/2-250 , APP.GetHeight()/2-300);

			for(let i = 0 ; i<7 ; i++)
			{
				for(let j = 0 ; j<7 ; j++)
				{
					//Random Block:  0 Blue , 1 Green , 2 Yellow , 3 Pink
					let x = Math.floor((Math.random() * 4) + 0);
					if(x==0)
					{
						this.block.push(new PIXI.Sprite(PIXI.loader.resources.bluex.texture));
					}
					else if(x==1)
					{
						this.block.push(new PIXI.Sprite(PIXI.loader.resources.red.texture));
					}
					else if(x==2)
					{
						this.block.push(new PIXI.Sprite(PIXI.loader.resources.yellowx.texture));
					}
					else if(x==3)
					{
						this.block.push(new PIXI.Sprite(PIXI.loader.resources.violet.texture));
					}
					this.matrixBlock[i][j]=x;
					this.blockAnim[i*7+j].position.set(this.curPosX+j*this.Direc,this.curPosY+i*this.Direc);
					
					//Ô nhắc
					this.blockHint.push(new PIXI.Sprite(PIXI.loader.resources.hint.texture))
					this.blockHint[i*7+j].position.set(this.curPosX+j*this.Direc,this.curPosY+i*this.Direc);
					this.blockHint[i*7+j].anchor.set(0.5);
					this.blockHint[i*7+j].visible=false;

					//Ô trò chơi
					this.block[i*7+j].anchor.set(0.5);
					this.block[i*7+j].position.set(this.curPosX+j*this.Direc,this.curPosY+i*this.Direc);
					this.addChild(this.block[i*7+j]);
					this.addChild(this.blockHint[i*7+j]);

				}

			}
			this.tint=this.block[0].tint;

			for(let j = 0 ; j<7 ; j++)
			{
				this.matrixBlock[7][j]=100;
			}
			//console.table(this.matrixTemp);

			this.addChild(this.animation);
			for(let i = 0 ; i<7*7 ; i++)
			{
				this.addChild(this.blockAnim[i]);

			}
		}
		AudioBackGround.pause();
		AudioBackGround.play();
		this.addChild(this.gameover);


		

		


	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (Input.IsTouchDown(event))
		{
			if(this.isPlay==false)
			{
				this.time=Math.floor(new Date().getTime()/1000);
			}
			this.isPlay=true;
			this.isLoad=true;

			this.targetX = Input.touchX;
			this.targetY = Input.touchY;
			this.animation.play();
		}
		else if (Input.IsTouchUp(event))
		{
			this.targetX = -1;
			this.targetY = -1;
			this.count=0;

			
		
		}
	}
}



module.exports = new StateGameL2();