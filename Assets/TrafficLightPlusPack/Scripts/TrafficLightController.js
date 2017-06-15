#pragma strict
// This script is responsible for switching out the emission texture for the traffic light lamp illumination.

// The five texture slots correspond to the automation states needed for traffic light phase control.
public var walkEmissionTexture:Texture;
public var dontwalkEmissionTexture:Texture;
public var StopEmissionTexture:Texture;
public var WarnEmissionTexture:Texture;
public var GoEmissionTexture:Texture;

public var lightsEnabled = true; // You can disable a light if requried.
public var flashInterval:float = 1.0; // When lights are flashing this value is the flash period in seconds.

private var mat: Material;
private var timer:float;
private var toggleOn = true;
private var currentState: PhaseState;

function Start () {
	mat = GetComponent.<Renderer>().material;
	timer = flashInterval;
}

function Update () {
	timer -= Time.deltaTime;
	if(timer <= 0) {
		timer = flashInterval;
		toggleOn = !toggleOn;
		ApplyState(currentState);
	}
}

function ApplyEmissionTexture(texture: Texture) {
	mat.SetTexture('_EmissionMap', texture);
	mat.SetColor("_EmissionColor", lightsEnabled?Color.white:Color.black); // Use this to turn off the lights as necessary
	mat.EnableKeyword("_EMISSION");
}

function ApplyState(newState:PhaseState) {
	currentState = newState;
	lightsEnabled = true;
	switch (newState) {
		case PhaseState.Walk:
			if(walkEmissionTexture != null ) {
				ApplyEmissionTexture(walkEmissionTexture);
			}
			break;
		case PhaseState.DontWalk:
			if(dontwalkEmissionTexture != null) {
				ApplyEmissionTexture(dontwalkEmissionTexture);
			}
			break;
		case PhaseState.Stop:
			if(StopEmissionTexture != null) {
				ApplyEmissionTexture(StopEmissionTexture);
			}
			break;
		case PhaseState.Warn:
			if(WarnEmissionTexture != null) {
				ApplyEmissionTexture(WarnEmissionTexture);
			}
			break;
		case PhaseState.Flash:
			if(!toggleOn) {
				lightsEnabled = false;
			}
			if(WarnEmissionTexture != null) {
				ApplyEmissionTexture(WarnEmissionTexture);
			}
			break;
		case PhaseState.Go:
			if(GoEmissionTexture != null) {
				ApplyEmissionTexture(GoEmissionTexture);
			}
			break;
		case PhaseState.Off:
			lightsEnabled = false;
			if(StopEmissionTexture != null) {
				ApplyEmissionTexture(StopEmissionTexture);
			}
			break;
		default:
			Debug.Log("Unknown Traffic Light State");
	}
}