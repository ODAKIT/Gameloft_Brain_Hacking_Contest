class StateManager
{
	constructor()
	{
		this.stateDeep	= -1;
		this.stateStack	= [];
		this.stateNext	= null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PushState(state)
	{
		state.Load();
		this.stateStack[++this.stateDeep] = state;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PopState()
	{
		if (this.stateDeep > 0)
		{
			this.stateStack[this.stateDeep].Unload();
			this.stateDeep--;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SwitchState(state)
	{
		this.stateStack[this.stateDeep].Unload();
		this.stateStack[this.stateDeep] = state;
		state.Load();
		//state.LoadCompleteHandler();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].TouchHandler)
		{
			this.stateStack[this.stateDeep].TouchHandler(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	KeyHandler(event)
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].KeyHandler)
		{
			this.stateStack[this.stateDeep].KeyHandler(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsEmpty()
	{
		return this.stateDeep == -1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCurrentState()
	{
		return this.stateStack[this.stateDeep];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		if (!this.IsEmpty())
		{
			this.stateStack[this.stateDeep].Update(deltaTime);
		}
	}
}
module.exports = new StateManager();
