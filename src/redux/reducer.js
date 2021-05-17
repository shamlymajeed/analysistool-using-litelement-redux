import { createSelector } from 'reselect';

import {
  ADD_PROJECT,
  ADD_FACTOR1_CONFIG
} from './actions.js';

const INITIAL_STATE = {
  projects:[],
  factor1Configs:[]
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.project]
      };
      
      case ADD_FACTOR1_CONFIG:
      return {
        ...state,
        factor1Configs: [...state.factor1Configs, action.factor1Config]
      };
    default:
      return state;
  }
};
