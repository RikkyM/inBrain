import { useContext } from "react";
import { SidebarContext, SidebarDispatchContext } from "../context/SidebarContext";

const useSidebar = () => {
  return useContext(SidebarContext);
};

const useSidebarDispatch = () => {
  return useContext(SidebarDispatchContext);
};


export { useSidebar, useSidebarDispatch }