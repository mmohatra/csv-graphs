import { format, parse } from "date-fns";
import { getDataValidationErrors } from "./core";

export const PT_JSCODE = 0;
/*
data: array of dictionary
pipeline : {
    type: 
    code: in case od PT_JSCODE
}
*/

export function executeDataPipeline(data, pipeline, onSuccess, onError) {
  try {
    const pipelineType = pipeline.type;
    let returnedData = [];
    if (pipelineType === PT_JSCODE) {
      returnedData = executeJSPipeline(data, pipeline);
    } else {
      throw new Error("Unable to determine pipeline type.");
    }

    const errors = getDataValidationErrors(returnedData);
    if (!errors !== null) {
      throw new Error(errors);
    }
    onSuccess(returnedData);
  } catch (e) {
    onError(e);
  }
}

function executeJSPipeline(data, pipeline) {
  if (
    pipeline.code === undefined ||
    pipeline.code === null ||
    pipeline.code === ""
  ) {
    return data;
  }
  const func = new Function("data", "parse", "format", pipeline.code);
  return func(data, parse, format);
}
