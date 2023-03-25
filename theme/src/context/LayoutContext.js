import React from "react";

const defaultState = {isSidebarOpened: false};

const LayoutStateContext = React.createContext(defaultState);
LayoutStateContext.displayName = 'LayoutState';
const LayoutDispatchContext = React.createContext(null);
LayoutDispatchContext.displayName = 'LayoutDispatch';

function layoutReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    case "ON_SIDEBAR":
      return { ...state, isSidebarOpened: true };
    case "OFF_SIDEBAR":
      return { ...state, isSidebarOpened: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function LayoutProvider({ children }) {
  const [state, dispatch] = React.useReducer(layoutReducer, defaultState);
  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  const context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  const context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar, onSidebar, offSidebar };

// ###########################################################
function toggleSidebar(dispatch) {
  dispatch({
    type: "TOGGLE_SIDEBAR",
  });
}
function onSidebar(dispatch) {
  dispatch({
    type: "ON_SIDEBAR",
  });
}
function offSidebar(dispatch) {
  dispatch({
    type: "OFF_SIDEBAR",
  });
}
