export function sortTriangles(triangles) {
  if (triangles.lengs < 1 || triangles.length > 1000000)
    return {
      status: 'failed',
      reason: 'number of trianles should be between 1 and 1000000'
    };
  let areas = [];
  for (var i = 0; i < triangles.length; i++) {
    const t = triangles[i];
    const verticesNames = t.vertices.toLowerCase().split('');
    const a = t[verticesNames[0]];
    const b = t[verticesNames[1]];
    const c = t[verticesNames[2]];
    if (a === undefined || b === undefined || c === undefined)
      return {
        status: 'failed',
        reason: `triangle ${t.vertices} not a valid triangle object`
      };
    if (!isValidTriangle(a, b, c))
      return {
        status: 'failed',
        reason: `triangle ${t.vertices} is not a valid triangle`
      };

    const p = (a + b + c) / 2;
    areas.push([i, Math.sqrt(p * (p - a) * (p - b) * (p - c))]);
  }
  areas.sort((a, b) => {
    return b[1] - a[1];
  });
  let result = [];
  for (var i = 0; i < areas.length; i++) {
    result.push(triangles[areas[i][0]].vertices);
  }
  return result;
}

function isValidTriangle(a, b, c) {
  return a <= b + c && b <= c + a && c <= a + b;
}