import { useState } from "react";
import { useSidebar, useSidebarDispatch } from "../../hooks/useSidebar";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
	const location = useLocation();
	const { isOpen } = useSidebar();
	const dispatch = useSidebarDispatch();
	const [isHover, setIsHover] = useState(null);

	const navLinks = [
		{ path: "/", label: "Home" },
		{ path: "/category", label: "Category" },
	];

	return (
		<div
			className={`absolute left-0 top-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-white transition-all duration-[.5s] md:relative md:w-80 ${
				isOpen && "w-screen"
			}`}
		>
			<div className="font-sfmono flex h-full w-screen flex-col justify-between px-3 pb-14 pt-24 md:w-full md:py-10">
				<div className="flex h-full flex-col gap-10 px-4">
					<h2 className="font-sfmono whitespace-nowrap text-5xl font-extrabold md:text-2xl">
						inBrain.
					</h2>
					<div className="flex h-full flex-col gap-5">
						<div className="flex justify-between">
							<h2 className="text-lg font-semibold capitalize text-gray-400 md:text-sm">
								navigation
							</h2>
						</div>
						<ul className="no-scrollbar relative h-full space-y-4 text-3xl font-semibold md:space-y-2 md:text-xl">
							{navLinks.map((link) => (
								<li key={link.path} className="relative w-full py-2">
									<Link
										to={link.path}
										onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
										onMouseEnter={() => setIsHover(link.path)}
										onMouseLeave={() => setIsHover(null)}
										className={`${isHover && isHover !== link.path && location.pathname === link.path ? "after:scale-0" : isHover === link.path || location.pathname === link.path ? "after:scale-100 md:after:scale-75" : "after:scale-0"} block h-full w-full after:absolute after:right-0 after:top-1/2 after:size-3 after:-translate-y-1/2 after:rounded-full after:bg-black after:transition-transform after:duration-[.5s] after:content-[''] md:after:-left-5`}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="relative flex h-20 items-end whitespace-nowrap justify-between gap-1 px-4 text-[0.75rem] md:flex-col md:items-start md:justify-end md:text-xs">
					<p>&#169;2024 Note App</p>
					<p>Site by Rikky Mahendra</p>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;