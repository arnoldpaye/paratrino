#pragma strict
// This controller provides the automated phase logic for two light controlled intersecting roadways.

enum PhaseState { Walk, DontWalk, Stop, Warn, Go, Off, Flash }

public var directionOneSetController:GameObject; // Typically an Empty that is a parent of zero or more traffic light assets.
public var directionTwoSetController:GameObject; // Typically an Empty that is a parent of zero or more traffic light assets.
public var outOfOrder = false; // Used to bypass the normal control phasing and flash the lights instead.
public var primaryPhaseDuration = 20.0; // Default value for go and stop phase in seconds.
public var transitionPhaseDuration = 3.0; // Default value for transition phases in seconds.

// Array of PhaseStates that execute a complete traffic light control sequence. Each traffic direction has an offset phase sequence.
private var fourWaySequenceOne:PhaseState[] = [PhaseState.Walk, PhaseState.DontWalk, PhaseState.Stop, PhaseState.Go, PhaseState.Warn, PhaseState.Stop];
private var fourWaySequenceTwo:PhaseState[] = [PhaseState.Go, PhaseState.Warn, PhaseState.Stop, PhaseState.Walk, PhaseState.DontWalk, PhaseState.Stop];
private var stateIntervals:float[]; // Timing in seconds for each of the phases in the sequence.
private var outOfOrderInterval:float = 1.0; // Flash period in seconds.
private var timer:float = 0;
private var index = 0;
private var lastOutOfOrder = outOfOrder;

function Start () {
	// Set the interection control timing values based on the values given in the properties panel.
	stateIntervals = [primaryPhaseDuration,transitionPhaseDuration,transitionPhaseDuration,primaryPhaseDuration,transitionPhaseDuration,transitionPhaseDuration]; // timing in seconds for each of the phases in the sequence.
}

function Update () {
	timer -= Time.deltaTime;
	if(lastOutOfOrder != outOfOrder) {
		timer = 0; // Calcel the current phase.
		lastOutOfOrder = outOfOrder;
	}
	if(timer <= 0) {
		index ++;
		if(index >= stateIntervals.length) {
			index = 0;
		}
		if(outOfOrder) {
			timer = outOfOrderInterval;
			NotifyState(directionOneSetController,PhaseState.Flash);
			NotifyState(directionTwoSetController,PhaseState.Flash);
		} else {
			timer = stateIntervals[index];
			NotifyState(directionOneSetController, fourWaySequenceOne[index]);
			NotifyState(directionTwoSetController, fourWaySequenceTwo[index]);
		}
	}
}

function NotifyState(controller:GameObject, newState:PhaseState) {
		controller.BroadcastMessage("ApplyState",newState,SendMessageOptions.DontRequireReceiver); 
}