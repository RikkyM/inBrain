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

	const showToast = (text, type = "default") => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		const resetToast = () => ({
			open: false,
			text: "",
			backgroundColor: TOAST_TYPES.default,
			isAnimating: false,
			isRemoving: false,
		});

		setToast(resetToast());

		timerRef.current = setTimeout(() => {
			setToast({
				open: true,
				text,
				backgroundColor: TOAST_TYPES[type] || TOAST_TYPES.default,
				isAnimating: true,
				isRemoving: false,
			});

			timerRef.current = setTimeout(() => {
				setToast((prev) => ({
					...prev,
					isAnimating: false,
					isRemoving: true,
				}));

				setTimeout(() => setToast(resetToast()), 300);
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
