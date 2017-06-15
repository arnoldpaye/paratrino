#pragma strict

public var semaforo:GameObject;

function Start () {
}

function Update () {
	if (Input.GetKeyUp(KeyCode.R)) {
		NotifyState(semaforo, PhaseState.Stop);
	}
	if (Input.GetKeyUp(KeyCode.A)) {
		NotifyState(semaforo, PhaseState.Warn);
	}
	if (Input.GetKeyUp(KeyCode.V)) {
		NotifyState(semaforo, PhaseState.Go);
	}
	if (Input.GetKeyUp(KeyCode.Space)) {
		NotifyState(semaforo, PhaseState.Off);
	}
}

function NotifyState(controller:GameObject, newState:PhaseState) {
		controller.BroadcastMessage("ApplyState",newState,SendMessageOptions.DontRequireReceiver); 
}
