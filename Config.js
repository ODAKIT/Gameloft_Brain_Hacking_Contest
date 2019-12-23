class GameConfig
{
	constructor()
	{
		this.isMigGamePortrait = true;

		this.CalculateScreenSize();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CalculateScreenSize()
	{
		if (this.isMigGamePortrait)
		{
			this.width	= 750;
			this.height	= 1334;
		}
		else
		{
			this.width	= 1334;
			this.height	= 750;
		}
	}
}
module.exports = new GameConfig();