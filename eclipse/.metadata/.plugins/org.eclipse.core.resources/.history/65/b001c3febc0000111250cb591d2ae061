/**
 * 
 */
package peasy2d;

import peasy2d.PeasyCam.AbstractInterp;

class InterpolationManager {
	private AbstractInterp currentInterpolator = null;

	protected synchronized void startInterpolation(final AbstractInterp interpolation) {
		cancelInterpolation();
		currentInterpolator = interpolation;
		currentInterpolator.start();
	}

	protected synchronized void cancelInterpolation() {
		if (currentInterpolator != null) {
			currentInterpolator.cancel();
			currentInterpolator = null;
		}
	}

}