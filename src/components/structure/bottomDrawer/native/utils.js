export function normalizeSnapPoints(snapPoints, screenHeight) {
  return snapPoints.map((point) => {
    if (typeof point === 'string' && point.endsWith('%')) {
      const percentage = parseFloat(point) / 100;
      return screenHeight * percentage;
    }
    return point;
  });
}

export function findClosestSnapPoint(currentPosition, snapPoints, velocity = 0) {
  'worklet';
  // Reduced velocity impact for more stable snapping
  const velocityImpact = velocity * 0.03;
  const adjustedPosition = currentPosition + velocityImpact;

  let closestIndex = 0;
  let minDistance = Math.abs(snapPoints[0] - adjustedPosition);

  for (let i = 1; i < snapPoints.length; i++) {
    const distance = Math.abs(snapPoints[i] - adjustedPosition);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }

  // Increased velocity thresholds for more resistance
  // Only change snap points with strong swipe gestures

  // Bias towards opening more when swiping up very fast
  if (velocity < -1500 && closestIndex < snapPoints.length - 1) {
    closestIndex++;
  }
  // Bias towards closing when swiping down very fast
  else if (velocity > 1500 && closestIndex > 0) {
    closestIndex--;
  }

  // Add hysteresis: prefer staying at current position unless moved significantly
  // This prevents accidental snap point changes
  if (snapPoints.length > 1) {
    const currentSnapDistance = minDistance;
    // Require at least 20% of the distance between snap points to change
    const snapPointSpacing = Math.abs(snapPoints[Math.min(closestIndex + 1, snapPoints.length - 1)] - snapPoints[closestIndex]);
    if (currentSnapDistance < snapPointSpacing * 0.2) {
      // Stay at current snap point unless moved significantly
      return closestIndex;
    }
  }

  return closestIndex;
}

export function clamp(value, min, max) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}