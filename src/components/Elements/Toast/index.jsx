import { useToast, useToastDispatch } from "../../../hooks/useToast";

const Toast = () => {
    const { show } = useToast();
    // const dispatch = useToastDispatch();

	return <div className={`fixed right-5 transition-all duration-[.3s] ${show ? "bottom-0" : "-bottom-10"}`}>adasdl</div>;
};

export default Toast;
