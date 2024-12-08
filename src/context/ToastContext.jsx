import { createContext, useState, useRef } from "react";

const ToastContext = createContext(null);
const ToastDispatchContext = createContext(null);

const TOAST_TYPES = {
	success: "bg-green-500",
	error: "bg-red-500",
	warning: "bg-yellow-500",
	info: "bg-blue-500",
	default: "bg-gray-800",
};

const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({
		open: false,
		text: "",
		backgroundColor: TOAST_TYPES.default,
		isAnimating: false,
		isRemoving: false,
	});
	const timerRef = useRef(null);

	const showToast = (text, type = 'default') => {
		// Reset any existing timers
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Reset state
		setToast({
			open: false,
			text: "",
			backgroundColor: TOAST_TYPES.default,
			isAnimating: false,
			isRemoving: false,
		});

		// Trigger toast sequence
		timerRef.current = setTimeout(() => {
			setToast({
				open: true,
				text: text,
				backgroundColor: TOAST_TYPES[type] || TOAST_TYPES.default,
				isAnimating: true,
				isRemoving: false,
			});

			// Hide toast after 2 seconds
			timerRef.current = setTimeout(() => {
				setToast((prev) => ({
					...prev,
					isAnimating: false,
					isRemoving: true,
				}));

				// Remove toast completely
				setTimeout(() => {
					setToast({
						open: false,
						text: "",
						backgroundColor: TOAST_TYPES.default,
						isAnimating: false,
						isRemoving: false,
					});
				}, 300);
			}, 3500);
		}, 50);
	};

	return (
		<ToastContext.Provider value={toast}>
			<ToastDispatchContext.Provider value={showToast}>
				{children}
			</ToastDispatchContext.Provider>
		</ToastContext.Provider>
	);
};

export { ToastProvider, ToastContext, ToastDispatchContext };
