import { createSelector } from 'reselect';

import {
  ADD_PROJECT,
  ADD_FACTOR1_CONFIG,
  ADD_FACTOR1_DATA,
  ADD_FACTOR2_DATA
} from './actions.js';

const INITIAL_STATE = {
  projects:[],
  factor1Configs:[],
  factor1Datas:[],
  factor2Datas:[],

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

      case ADD_FACTOR1_DATA:
      return {
        ...state,
        factor1Datas: [...state.factor1Datas, action.factor1Data]
      };

      case ADD_FACTOR2_DATA:
      return {
        ...state,
        factor2Datas: [...state.factor2Datas, action.factor2Data]
      };
    default:
      return state;
  }
};
