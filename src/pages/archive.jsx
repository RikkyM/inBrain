import { useState } from "react";
import Search from "../components/Elements/Search";
import { useCrudNote, useCrudNoteDispatch } from "../hooks/useCrudNote";
import Card from "../components/Elements/Card";
import {  useToastDispatch } from "../hooks/useToast";

const ArchivePages = () => {
	const [search, setSearch] = useState("");
	const { data } = useCrudNote();
	const showToast = useToastDispatch();
	const dispatch = useCrudNoteDispatch();

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

	const handleUnarchiveNotes = () => {
		const updatedNotes = { ...data };

		const notesByCategory = allNotes.reduce((acc, note) => {
			if (!acc[note.category]) {
				acc[note.category] = [];
			}
			acc[note.category].push(note);
			return acc;
		}, {});

		Object.keys(notesByCategory).forEach((category) => {
			updatedNotes[category] = updatedNotes[category].map((note) =>
				notesByCategory[category].some(
					(archivedNote) => archivedNote.id === note.id,
				)
					? { ...note, archive: false }
					: note,
			);
		});

		dispatch({ type: "UPDATE_NOTE", payload: updatedNotes });
		showToast("Note unarchived successfully.", "success");
	};

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
										<Card note={note} archive={handleUnarchiveNotes} />
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
