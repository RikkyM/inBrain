import { createContext, useReducer } from "react";

const ToastContext = createContext();
const ToastDispatchContext = createContext();

const ToastReducer = (state, action) => {
	switch (action.type) {
		case "TOAST": {
			return {
				show: action.payload?.show ?? !state.show,
			};
		}
		default: {
			throw Error("Unknown action: " + action.type);
		}
	}
};

const ToastProvider = ({ children }) => {
	const [toast, dispatch] = useReducer(ToastReducer, { show: false });

	return (
		<ToastContext.Provider value={toast}>
			<ToastDispatchContext.Provider value={dispatch}>
				{children}
			</ToastDispatchContext.Provider>
		</ToastContext.Provider>
	);
};

export { ToastProvider, ToastContext, ToastDispatchContext };
