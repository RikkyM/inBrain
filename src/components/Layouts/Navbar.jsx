import { useSidebar, useSidebarDispatch } from "../../hooks/useSidebar";

const Navbar = () => {
	const { isOpen } = useSidebar();
	const dispatch = useSidebarDispatch();

	return (
		<nav className="left-20 flex h-24 w-full items-center bg-transparent px-5 md:hidden">
			<h2 className="font-sfmono text-2xl font-semibold">inMemo.</h2>
			<button
				className={`absolute right-8 top-8 z-10 block flex items-center outline-none after:absolute after:left-1/2 after:top-1/2 after:-z-10 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-all after:duration-[.5s] ${isOpen ? "after:scale-[1.2]" : "after:scale-0"} after:rounded-full after:bg-black after:content-[''] md:hidden`}
				onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
			>
				<div className="relative size-7">
					<span
						className={`absolute top-2.5 block h-0.5 w-full bg-black transition-all ${isOpen && "translate-y-[2px] rotate-45 bg-white"}`}
					></span>
					<span
						className={`absolute bottom-2.5 block h-0.5 w-full bg-black transition-all ${isOpen && "-translate-y-[3px] -rotate-45 bg-white"}`}
					></span>
				</div>
			</button>
		</nav>
	);
};

export default Navbar;
