import nanoid from 'nanoid';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_FACTOR1_CONFIG = 'ADD_FACTOR1_CONFIG';
export const ADD_FACTOR1_DATA = 'ADD_FACTOR1_DATA';
export const ADD_FACTOR2_DATA = 'ADD_FACTOR2_DATA';

export const addProject = (id,projectName,subjectName,factor1Name,factor2Name) => {
  return {
    type: ADD_PROJECT,
    project: {
      id,
      projectName,
      subjectName,
      factor1Name,
      factor2Name
    }
  };
};

export const addFactor1Config = (projectId,lowValues,highValues) => {
  return {
    type: ADD_FACTOR1_CONFIG,
    factor1Config: {
      projectId,
      lowValues,
      highValues
    }
  };
};

export const addfactor1Data = (projectId,dataArray) => {
  return {
    type: ADD_FACTOR1_DATA,
    factor1Data: {
      'projectId':projectId,
      'factor1Data':dataArray
    }
  };
};

export const addfactor2Data = (projectId,dataArray) => {
  return {
    type: ADD_FACTOR2_DATA,
    factor2Data: {
      'projectId':projectId,
      'factor2Data':dataArray
    }
  };
};
