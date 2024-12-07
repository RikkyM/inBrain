import { useContext } from "react";
import { ToastContext, ToastDispatchContext } from "../context/ToastContext";

const useToast = () => {
	return useContext(ToastContext);
};

const useToastDispatch = () => {
	return useContext(ToastDispatchContext);
};

export { useToast, useToastDispatch };
