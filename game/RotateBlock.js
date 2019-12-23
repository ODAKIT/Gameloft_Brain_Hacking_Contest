function CreateNewBlock(xArray,yArray,block,matrixBlock)
{
	for(let i = 0 ; i<xArray.length ; i++)
		{
				//Random Block:  0 Blue , 1 Green , 2 Yellow , 3 Pink
				let x = Math.floor((Math.random() * 4) + 0);
				if(x==0)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.blue.texture;
				}
				else if(x==1)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.green.texture;
				}
				else if(x==2)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.yellow.texture;
				}
				else if(x==3)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.pink.texture;
				}
				matrixBlock[yArray[i]][xArray[i]]=x;
				block[yArray[i]*7+xArray[i]].anchor.set(0.5);
				block[yArray[i]*7+xArray[i]].scale.set(0.00000005);

			

		}
}

function CreateNewBlockRankGame(xArray,yArray,block,matrixBlock)
{
	for(let i = 0 ; i<xArray.length ; i++)
		{
				//Random Block:  0 Blue , 1 Green , 2 Yellow , 3 Pink
				let x = Math.floor((Math.random() * 4) + 0);
				if(x==0)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.bluer.texture;
				}
				else if(x==1)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.greenr.texture;
				}
				else if(x==2)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.yellowr.texture;
				}
				else if(x==3)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.pinkr.texture;
				}
				matrixBlock[yArray[i]][xArray[i]]=x;
				block[yArray[i]*7+xArray[i]].anchor.set(0.5);
				block[yArray[i]*7+xArray[i]].scale.set(0.00000005);

			

		}
}


function CreateNewBlockLV2(xArray,yArray,block,matrixBlock)
{
	for(let i = 0 ; i<xArray.length ; i++)
		{
				//Random Block:  0 Blue , 1 Green , 2 Yellow , 3 Pink
				let x = Math.floor((Math.random() * 4) + 0);
				if(x==0)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.bluex.texture;
				}
				else if(x==1)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.red.texture;
				}
				else if(x==2)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.yellowx.texture;
				}
				else if(x==3)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.violet.texture;
				}
				matrixBlock[yArray[i]][xArray[i]]=x;
				block[yArray[i]*7+xArray[i]].anchor.set(0.5);
				block[yArray[i]*7+xArray[i]].scale.set(0.00000005);

			

		}
}

function CreateNewBlockLV3(xArray,yArray,block,matrixBlock)
{
	for(let i = 0 ; i<xArray.length ; i++)
		{
				//Random Block:  0 Blue , 1 Green , 2 Yellow , 3 Pink
				let x = Math.floor((Math.random() * 2) + 0);
				if(x==0)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.grey.texture;
				}
				else if(x==1)
				{
					block[yArray[i]*7+xArray[i]].texture=PIXI.loader.resources.dark.texture;
				}
				matrixBlock[yArray[i]][xArray[i]]=x;
				block[yArray[i]*7+xArray[i]].anchor.set(0.5);
				block[yArray[i]*7+xArray[i]].scale.set(0.00000005);

			

		}
}
function RotateNewBlock(xArray,yArray,block)
{
    
	for(let i = 0 ; i<xArray.length ; i++)
			block[yArray[i]*7+xArray[i]].rotation+=0.5;
}
function ResetRotate(xArray,yArray,block)
{
	for(let i = 0 ; i<xArray.length ; i++)
			block[yArray[i]*7+xArray[i]].rotation=0;
}

function ResetScale(xArray,yArray,block)
{
	for(let i = 0 ; i<xArray.length ; i++)
			if(block[yArray[i]*7+xArray[i]].scale.x<1 && block[yArray[i]*7+xArray[i]].scale.y<1 )
			{
				block[yArray[i]*7+xArray[i]].scale.x+=0.05
				block[yArray[i]*7+xArray[i]].scale.y+=0.05

			}
}

function RotateAll(block)
{
	for(let i = 0 ; i<7 ; i++)
	{
		for(let j = 0 ; j<7 ; j++)
		{
			block[i*7+j].rotation+=0.3;
		}
	}
}

function RotateResetAll(block)
{
	for(let i = 0 ; i<7 ; i++)
	{
		for(let j = 0 ; j<7 ; j++)
		{
			block[i*7+j].rotation=0;
		}
	}
}