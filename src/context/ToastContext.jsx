import { createContext, useState, useRef } from "react";

const ToastContext = createContext(null);
const ToastDispatchContext = createContext(null);

const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState({
		open: false,
		text: "",
		backgroundColor: "bg-gray-800",
		isAnimating: false,
		isRemoving: false,
	});
	const timerRef = useRef(null);

	const showToast = (text, backgroundColor = "bg-gray-800") => {
		// Reset any existing timers
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		// Reset state
		setToast({
			open: false,
			text: "",
			backgroundColor: "bg-gray-800",
			isAnimating: false,
			isRemoving: false,
		});

		// Trigger toast sequence
		timerRef.current = setTimeout(() => {
			setToast({
				open: true,
				text: text,
				backgroundColor: backgroundColor,
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
						backgroundColor: "bg-gray-800",
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
