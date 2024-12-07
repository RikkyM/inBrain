import { useToast } from "../../../hooks/useToast";

const Toast = () => {
	const { open, text, backgroundColor, isAnimating, isRemoving } = useToast();

	if (!open) return null;

	return (
		<div
			className={`fixed bottom-5 left-5 right-5 z-50 mx-auto max-w-[400px] rounded px-6 py-4 text-sm text-white shadow transition-all duration-300 md:bottom-4 md:left-auto md:right-4 ${backgroundColor} ${
				isAnimating
					? "animate-slideIn"
					: isRemoving
						? "animate-slideOut"
						: "opacity-0"
			}`}
		>
			{text}
		</div>
	);
};

export default Toast;
