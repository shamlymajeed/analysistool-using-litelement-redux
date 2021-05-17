import nanoid from 'nanoid';
export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_FACTOR1_CONFIG = 'ADD_FACTOR1_CONFIG';

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
