#pragma strict
// This script provides the ability to manually set the light phase of the associated traffic light.

public var state: PhaseState; // Set this dropdown from the properties panel for the desired traffic light state.

private var lastState:PhaseState = PhaseState.Off;
private var phaseSequence;

function Update() {

	if( state != lastState) {
	
		switch (state) {
			case PhaseState.Walk:
				lastState = PhaseState.Walk;
				break;
			case PhaseState.DontWalk:
				lastState = PhaseState.DontWalk;
				break;
			case PhaseState.Stop:
				lastState = PhaseState.Stop;
				break;
			case PhaseState.Warn:
				lastState = PhaseState.Warn;
				break;
			case PhaseState.Go: 
				lastState = PhaseState.Go;
				break;
			case PhaseState.Off: 
				lastState = PhaseState.Off;
				break;
			case PhaseState.Flash: 
				lastState = PhaseState.Flash;
				break;
			default:
				Debug.Log("Unknown State");
		}
		NotifyState(state);
	}
}

function NotifyState(newState:PhaseState) {
		BroadcastMessage("ApplyState",newState,SendMessageOptions.DontRequireReceiver); 
}