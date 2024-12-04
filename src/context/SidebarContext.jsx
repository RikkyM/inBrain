import { createContext, useReducer } from "react";

const SidebarContext = createContext();
const SidebarDispatchContext = createContext();

const SidebarReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR": {
      return {
        isOpen: !state.isOpen,
      };
    }
    default: {
        throw Error("Unknown action: " + action.type)
    }
  }
};

const SidebarProvider = ({ children }) => {
  const [sidebar, dispatch] = useReducer(SidebarReducer, { isOpen: false });

  return (
    <SidebarContext.Provider value={sidebar}>
      <SidebarDispatchContext.Provider value={dispatch}>
        {children}
      </SidebarDispatchContext.Provider>
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarDispatchContext, SidebarProvider };
