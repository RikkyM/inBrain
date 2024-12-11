import { useState } from "react";
import Search from "../components/Elements/Search";
import { useCrudNote } from "../hooks/useCrudNote";
import Card from "../components/Elements/Card";

const ArchivePages = () => {
	const [search, setSearch] = useState("");
	const { data } = useCrudNote();

	const allNotes = Object.entries(data).flatMap(([category, categoryNotes]) => {
		return categoryNotes
			.filter(
				(note) =>
					note.archive &&
					(search === "" ||
						note.title.toLowerCase().includes(search.toLowerCase())),
			)
			.map((note) => {
				return { ...note, category };
			});
	});

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto bg-[#F6F7FB] font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<div className="h-full w-full overflow-auto py-5 md:py-10">
				<div className="flex h-full flex-col">
					<div className="flex items-center justify-between px-4 py-1">
						<h2 className="text-3xl font-bold">Archive</h2>
						<Search value={search} state={setSearch} />
					</div>
					<div className="h-full w-full flex-1 overflow-auto p-4">
						<div
							className={`h-full ${allNotes.length === 0 ? "flex items-center justify-center" : "columns-2 gap-4 space-y-4 lg:columns-3 xl:columns-4 2xl:columns-5"}`}
						>
							{allNotes.length === 0 ? (
								<div className="text-center text-xl text-gray-500">
									{search !== ""
										? `No results found for "${search}"`
										: "No archived notes"}
								</div>
							) : (
								allNotes.map((note, index) => (
									<div key={`${index}`} className="break-inside-avoid">
										<Card note={note} />
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArchivePages;
