import { useToast } from "../../../hooks/useToast";
import "./style.css";

const Toast = () => {
	const { show } = useToast();

	return (
		<>
			<div
				className={`fixed right-5 transition-all duration-300 ${show ? "bottom-5 opacity-100" : "bottom-20 opacity-0"} rounded bg-green-500 px-4 py-2 text-white shadow-lg`}
			>
				Toast Tampil
			</div>
		</>
	);
};

export default Toast;
