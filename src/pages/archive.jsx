import { useState } from "react";
import Search from "../components/Elements/Search";

const ArchvePages = () => {
	const [search, setSearch] = useState("");

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto bg-[#F6F7FB] font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<div className="h-full w-full overflow-auto bg-red-500 py-5 md:py-10">
				<div className="h-full">
					<div className="flex items-center justify-between px-4 py-1">
						<h2 className="text-3xl font-bold">Archive</h2>
						<Search value={search} state={setSearch} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArchvePages;
