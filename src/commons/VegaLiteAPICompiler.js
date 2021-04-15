const vl = require("vega-lite-api");

export function compileVegaLiteAPI(code, onError, onSuccess) {
  try {
    const func = new Function("vl", code);
    const spec = func(vl);

    onSuccess(JSON.parse(spec.toString()));
  } catch (e) {
    onError(e);
  }
}
