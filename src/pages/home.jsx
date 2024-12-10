import { useCrudNote, useCrudNoteDispatch } from "../hooks/useCrudNote";
import { useCategories } from "../hooks/useCategories";
import { useToastDispatch } from "../hooks/useToast";
import Card from "../components/Elements/Card";
import { useState } from "react";
import CrudNote from "../components/Layouts/CrudNote";
import Search from "../components/Elements/Search";

const iconPlus = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		viewBox="0 0 16 16"
	>
		<path
			fill="currentColor"
			d="M8.25 3a.5.5 0 0 1 .5.5v3.75h3.75a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8.75v3.75a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5V8.75H3.5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1 .5-.5h3.75V3.5a.5.5 0 0 1 .5-.5z"
		/>
	</svg>
);

const HomePage = () => {
	const { data, modal } = useCrudNote();
	const dispatchCrudNote = useCrudNoteDispatch();
	const showToast = useToastDispatch();
	const [editingNote, setEditingNote] = useState(null);
	const [editingNoteCategory, setEditingNoteCategory] = useState("");
	const [search, setSearch] = useState("");
	const {
		categoryInput,
		setCategoryInput,
		sizeCategory,
		notes,
		modalCategory,
		modalCatRef,
		handleModalCategory,
		handleSubmitCategory,
		handleCategoryToggle,
		allNotes,
		selectedCategories,
	} = useCategories(data, dispatchCrudNote, showToast, search);

	const handleEditNote = (note, category) => {
		setEditingNote(note);
		setEditingNoteCategory(category);
		dispatchCrudNote({ type: "TOGGLE_BOX" });
	};

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<button
				onClick={() => {
					setEditingNote(null);
					setEditingNoteCategory("");
					dispatchCrudNote({ type: "TOGGLE_BOX" });
				}}
				className="group fixed bottom-7 right-7 z-[15] flex size-14 items-center overflow-hidden rounded-full border border-blue-500 bg-blue-200 p-2 text-sm text-blue-600 shadow-sm transition-all duration-[.5s] md:hover:w-36"
			>
				<div className="ml-3 whitespace-nowrap font-bold capitalize opacity-0 transition-all delay-0 duration-[.25s] md:group-hover:mr-1 md:group-hover:opacity-100 md:group-hover:delay-[.5s] md:group-hover:duration-[.5s]">
					add note
				</div>
				<div className="absolute right-2 size-10 flex-shrink-0">{iconPlus}</div>
			</button>
			<div
				className={`h-full w-full overflow-auto py-5 md:py-10 ${modal ? "pointer-events-none" : "pointer-events-auto"}`}
			>
				<div className="h-full">
					<div className="flex items-center justify-between px-4 py-1">
						<h2 className="text-3xl font-bold">Home</h2>
						<Search value={search} state={setSearch} />
					</div>
					<div className="no-scrollbar select-none items-start justify-start gap-2 overflow-auto p-4">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center gap-2">
								<button
									onClick={handleModalCategory}
									className="relative size-10 rounded-full border border-blue-500 bg-blue-200 p-2 text-blue-600 shadow-sm outline-none"
								>
									<span className="absolute left-1/2 top-1/2 h-0.5 w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />
									<span
										className={`absolute left-1/2 top-1/2 h-0.5 w-[15px] -translate-x-1/2 -translate-y-1/2 transition-all duration-[.5s] ${modalCategory ? "-rotate-0" : "-rotate-90"} rounded-full bg-blue-600`}
									/>
								</button>
							</div>
							<div className="flex flex-1 gap-3">
								{notes.length > 0 &&
									notes.map((item, index) => (
										<div key={index + 1}>
											<input
												type="checkbox"
												id={`${item}`}
												className="peer hidden"
												checked={selectedCategories.includes(item)}
												onChange={() => handleCategoryToggle(item)}
											/>
											<label
												htmlFor={`${item}`}
												className="h-full w-full cursor-pointer rounded-full border border-blue-500 bg-blue-200 px-4 py-3 text-sm font-semibold capitalize text-blue-600 shadow-sm peer-checked:bg-blue-600 peer-checked:text-blue-100 md:py-2.5 md:text-base"
											>
												{item}
											</label>
										</div>
									))}
							</div>
						</div>
						<form
							onSubmit={handleSubmitCategory}
							ref={modalCatRef}
							style={{ height: sizeCategory ? `${sizeCategory}px` : 0 }}
							className="w-full overflow-hidden rounded-md transition-all duration-[.5s] md:max-w-[470px]"
						>
							<div className="flex h-max w-full items-center justify-center gap-2 p-3">
								<label htmlFor="category" className="flex w-full flex-col">
									<input
										type="text"
										name="category"
										id="category"
										placeholder="Category Name..."
										value={categoryInput}
										onChange={(e) => setCategoryInput(e.target.value)}
										className="rounded border border-black bg-transparent px-3 py-2 text-sm outline-none"
									/>
								</label>
								<button
									type="submit"
									className="flex items-center justify-center whitespace-nowrap rounded border border-blue-500 bg-blue-200 px-3 py-2 text-sm font-semibold capitalize text-blue-600 shadow-sm"
								>
									add category
								</button>
							</div>
						</form>
					</div>
					<div
						className={`w-full p-4 text-gray-500 ${allNotes.length > 0 ? "h-max" : "h-full"}`}
					>
						{data && Object.keys(data).length === 0 ? (
							<div className="flex h-full w-full flex-col items-center justify-center gap-2">
								<img
									src="/img/not_found_note.png"
									alt="Notes not created"
									className="w-full max-w-[150px]"
								/>
								<p className="text-center text-base md:text-xl">
									Start adding your categories{" "}
								</p>
							</div>
						) : allNotes.filter((note) => !note.archive).length === 0 &&
						  search !== "" ? (
							<div className="flex h-full w-full flex-col items-center justify-center gap-2">
								<img
									src="/img/not_found_note.png"
									alt="No search results"
									className="w-full max-w-[150px]"
								/>
								<p className="break-all text-center text-base md:text-xl">
									No notes found for &quot;{search}&quot;
								</p>
							</div>
						) : allNotes.filter((note) => !note.archive).length > 0 ? (
							<div className="columns-2 gap-4 space-y-4 lg:columns-3 xl:columns-4 2xl:columns-5">
								{allNotes
									.filter((note) => !note.archive)
									.map((note, index) => {
										const category = Object.keys(data).find((cat) =>
											data[cat].some((n) => n.id === note.id),
										);

										console.log("Note being rendered:", { note, category });

										return (
											<div key={index} className="break-inside-avoid">
												<Card
													note={note}
													onClick={() => {
														console.log("Card clicked:", { note, category });
														handleEditNote(note, category);
													}}
												/>
											</div>
										);
									})}
							</div>
						) : (
							<div className="flex h-full w-full flex-col items-center justify-center gap-2">
								<p className="text-center text-base md:text-xl">
									Start adding your first notes
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<CrudNote
				editingNote={editingNote}
				editingNoteCategory={editingNoteCategory}
			/>
		</div>
	);
};

export default HomePage;
