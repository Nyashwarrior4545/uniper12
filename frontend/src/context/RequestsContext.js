
//RequestContext.js

import { createContext, useReducer } from 'react'

export const RequestsContext = createContext()

export const requestsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return {
        requests: action.payload
      };

    case 'CREATE_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.payload]
      };

    case 'DELETE_REQUEST':
      return {
        requests: state.requests.filter((req) => req._id !== action.payload._id)
      };

    case 'UPDATE_REQUEST':
      return {
        requests: state.requests.map((req) =>
          req._id === action.payload._id ? action.payload : req
        )
      };

    default:
      return state;
  }
};


export const RequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestsReducer, {
    requests: [] // Initialize with an empty array
  });
  
  return (
    <RequestsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RequestsContext.Provider>
  );
};
