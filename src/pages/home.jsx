import { useCrudNote, useCrudNoteDispatch } from "../hooks/useCrudNote";
import { useCategories } from "../hooks/useCategories";
import { useToastDispatch } from "../hooks/useToast";
import { useState } from "react";

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
	const { data } = useCrudNote();
	const dispatchCrudNote = useCrudNoteDispatch();
	const showToast = useToastDispatch();
	const {
		categoryInput,
		setCategoryInput,
		sizeCategory,
		notes,
		modalCategory,
		modalCatRef,
		handleModalCategory,
		handleSubmitCategory,
	} = useCategories(dispatchCrudNote, showToast);

	const [selectedCategories, setSelectedCategories] = useState([]);

	const handleCategoryToggle = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((cat) => cat !== category)
				: [...prev, category],
		);
	};

	const allNotes = Object.entries(data).flatMap(([category, categoryNotes]) =>
		selectedCategories.length === 0 || selectedCategories.includes(category)
			? categoryNotes.map((note) => ({
					...note,
					category,
				}))
			: [],
	);

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<button
				onClick={() => dispatchCrudNote({ type: "TOGGLE_BOX" })}
				className="group fixed bottom-5 right-5 flex h-14 w-14 items-center overflow-hidden rounded-full bg-blue-200 p-2 text-sm text-blue-600 shadow-sm transition-all duration-[.5s] md:hover:w-36"
			>
				<div className="ml-3 whitespace-nowrap font-bold capitalize opacity-0 transition-all delay-0 duration-[.25s] md:group-hover:mr-1 md:group-hover:opacity-100 md:group-hover:delay-[.5s] md:group-hover:duration-[.5s]">
					add note
				</div>
				<div className="absolute right-2 size-10 flex-shrink-0">{iconPlus}</div>
			</button>
			<div className="h-full w-full overflow-auto py-5 md:py-10">
				<div>
					<h2 className="px-4 text-3xl font-bold">Home</h2>
					<div className="no-scrollbar flex select-none flex-col items-start justify-center gap-2 overflow-auto p-4">
						<div className="flex items-center gap-3">
							<div className="flex items-center justify-center">
								<button
									onClick={handleModalCategory}
									className="relative size-10 rounded-full bg-blue-200 p-2 text-blue-600 shadow-sm outline-none"
								>
									<span className="absolute left-1/2 top-1/2 h-0.5 w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600" />
									<span
										className={`absolute left-1/2 top-1/2 h-0.5 w-[15px] -translate-x-1/2 -translate-y-1/2 -rotate-90 transition-all duration-[.5s] ${modalCategory && "-rotate-0"} rounded-full bg-blue-600`}
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
												className="h-full w-full cursor-pointer rounded-full bg-blue-200 px-4 py-3 text-sm font-semibold capitalize text-blue-600 shadow-sm peer-checked:bg-blue-600 peer-checked:text-blue-100 md:py-2.5 md:text-base"
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
							style={{ height: sizeCategory ? `${sizeCategory + 12}px` : 0 }}
							className="w-full overflow-hidden rounded-md transition-all duration-[.5s] md:max-w-[470px]"
						>
							<div className="flex h-full w-full flex-col gap-2 p-3">
								<label htmlFor="category" className="flex flex-col">
									<input
										type="text"
										name="category"
										id="category"
										placeholder="Category Name..."
										value={categoryInput}
										onChange={(e) => setCategoryInput(e.target.value)}
										className="rounded border border-black/20 bg-transparent px-3 py-2 text-sm outline-none"
									/>
								</label>
								<button
									type="submit"
									className="w-full rounded bg-blue-200 p-3 text-sm font-semibold capitalize text-blue-600"
								>
									add category
								</button>
							</div>
						</form>
					</div>
					<div className="w-full p-4 text-gray-500">
						<div className="columns-2 gap-4 space-y-4 lg:columns-3 xl:columns-4 2xl:columns-5">
							{allNotes.map((note, index) => (
								<div
									key={index}
									className="relative break-inside-avoid-column rounded-lg border border-gray-300 bg-white p-3 shadow-sm"
								>
									{/* Title with conditional styling and placeholder */}
									<h4
										className={`mb-2 text-lg font-semibold ${note.title ? "" : "select-none text-transparent"}`}
									>
										{note.title || "Untitled"}
									</h4>

									{/* Body with truncation */}
									<div className="relative max-h-[500px] overflow-hidden">
										<p className="line-clamp-[12] break-words text-xs leading-relaxed text-gray-600">
											{note.body}
										</p>
										{note.body ? note.body.length > 500 && (
											<div className="absolute bottom-0 left-0 h-10 w-full">
												<span className="absolute bottom-0 right-0 bg-white text-xs">
													...
												</span>
											</div>
										) : <div className="text-xs">No text</div>}
									</div>

									{/* Category */}
									<p className="mt-5 text-right text-[.7rem] capitalize text-gray-400">
										{note.category}
									</p>
								</div>
							))}

							{allNotes.length === 0 && (
								<div className="px-1 text-gray-500">No notes found</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
