import { useState, useRef, useEffect } from "react";
import { useCrudNote, useCrudNoteDispatch } from "../../hooks/useCrudNote";
import { useToastDispatch } from "../../hooks/useToast";

const CrudNote = ({ editingNote = null, editingNoteCategory = "" }) => {
	const { modal } = useCrudNote();
	const dispatch = useCrudNoteDispatch();
	const showToast = useToastDispatch();
	const [characterCount, setCharacterCount] = useState(0);
	const modalRef = useRef(null);
	const [titleInput, setTitleInput] = useState("");
	const [bodyInput, setBodyInput] = useState("");
	const [categorySelect, setCategorySelect] = useState("");
	const { data } = useCrudNote();
	const titleInputRef = useRef(null);

	const formatDate = () => {
		const date = new Date();
		return (
			date.toLocaleDateString("en-CA", {
				year: "numeric",
				month: "numeric",
				day: "numeric",
			}) +
			" " +
			date
				.toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					hour12: false,
				})
				.replace(/\./g, ":")
		);
	};

	const handleTextareaChange = (e) => {
		e.target.style.height = "auto";
		e.target.style.height = `${e.target.scrollHeight}px`;

		const characterCountWithoutSpaces = e.target.value.replace(
			/\s/g,
			"",
		).length;
		setCharacterCount(characterCountWithoutSpaces);
	};

	useEffect(() => {
		if (editingNote && modalRef.current) {
			const textarea = modalRef.current.querySelector("textarea");
			if (textarea) {
				textarea.style.height = "auto";
				textarea.style.height = `${textarea.scrollHeight}px`;
			}
		}
	}, [editingNote, bodyInput]);

	useEffect(() => {
		if (editingNote) {
			setTitleInput(editingNote.title);
			setBodyInput(editingNote.body);
			setCategorySelect(editingNoteCategory);
			setCharacterCount(editingNote.body.replace(/\s/g, "").length);
		} else {
			setTitleInput("");
			setBodyInput("");
			setCategorySelect("");
			setCharacterCount(0);
		}
	}, [editingNote, editingNoteCategory]);

	useEffect(() => {
		if (!modal) {
			setTitleInput("");
			setBodyInput("");
			setCategorySelect("");
			setCharacterCount(0);
		}
	}, [modal]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				modal &&
				modalRef.current &&
				!modalRef.current.contains(event.target)
			) {
				dispatch({ type: "TOGGLE_BOX" });
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [modal, dispatch]);

	useEffect(() => {
		if (modal) {
			titleInputRef.current.focus();
		}
	}, [modal]);

	const handleSaveNotes = () => {
		if (
			(titleInput.trim() !== "" || bodyInput.trim() !== "") &&
			categorySelect !== ""
		) {
			if (editingNote) {
				const updatedNotes = { ...data };

				updatedNotes[editingNoteCategory] = updatedNotes[
					editingNoteCategory
				].filter((note) => note.id !== editingNote.id);

				updatedNotes[categorySelect] = [
					...(updatedNotes[categorySelect] || []),
					{
						...editingNote,
						title: titleInput.trim(),
						body: bodyInput.trim(),
						archive: false,
						timestamp: formatDate(),
					},
				];

				dispatch({ type: "UPDATE_NOTE", payload: updatedNotes });
				dispatch({ type: "TOGGLE_BOX" });
				showToast("Note updated successfully.", "success");
			} else {
				const newNotes = {
					...data,
					[categorySelect]: [
						...(data[categorySelect] || []),
						{
							id: (data[categorySelect] || []).length + 1,
							title: titleInput.trim(),
							body: bodyInput.trim(),
							archive: false,
							timestamp: formatDate(),
						},
					],
				};
				dispatch({ type: "ADD_NOTE", payload: newNotes });
				dispatch({ type: "TOGGLE_BOX" });
				showToast("Note added successfully.", "success");
			}
		}
	};

	const handleDeleteNotes = () => {
		if (
			(titleInput.trim() !== "" || bodyInput.trim() !== "") &&
			categorySelect !== ""
		) {
			const updatedNotes = { ...data };

			updatedNotes[categorySelect] = updatedNotes[categorySelect].filter(
				(note) => note.id !== editingNote.id,
			);

			dispatch({ type: "UPDATE_NOTE", payload: updatedNotes });

			dispatch({ type: "TOGGLE_BOX" });

			showToast("Note deleted successfully.", "success");
		}
	};

	const handleArchiveNotes = () => {
		if (editingNote) {
			const updatedNotes = { ...data };

			// Update the note's archive status to true in its current category
			updatedNotes[editingNoteCategory] = updatedNotes[editingNoteCategory].map(
				(note) =>
					note.id === editingNote.id ? { ...note, archive: true } : note,
			);

			dispatch({ type: "UPDATE_NOTE", payload: updatedNotes });
			dispatch({ type: "TOGGLE_BOX" });
			showToast("Note archived successfully.", "success");
		}
	};

	return (
		<div
			ref={modalRef}
			className={`absolute right-0 top-0 h-screen w-0 ${modal && "w-screen md:w-[50vw]"} no-scrollbar z-40 overflow-auto whitespace-nowrap border-l border-black/20 bg-white font-sfmono shadow-sm transition-all duration-[.5s]`}
		>
			<div className="h-auto min-h-full w-auto w-screen p-5 md:w-[50vw]">
				<div className="flex h-10 items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							onClick={() => dispatch({ type: "TOGGLE_BOX" })}
							className="size-5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-full w-full"
								viewBox="0 0 2048 2048"
							>
								<path
									fill="currentColor"
									d="M2048 1088H250l787 787l-90 90L6 1024L947 83l90 90l-787 787h1798v128z"
								/>
							</svg>
						</button>
						{editingNote && (
							<button onClick={handleArchiveNotes} className="size-5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-full w-full"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1.5"
										d="M10.5 11.5h3M20 8v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8m17 0V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3h18Z"
									/>
								</svg>
							</button>
						)}
					</div>
					{(titleInput.trim() !== "" || bodyInput.trim() !== "") &&
						categorySelect !== "" && (
							<div className="flex gap-5">
								<button
									onClick={handleDeleteNotes}
									className="relative h-6 capitalize text-red-500"
								>
									{editingNote && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-full w-full"
											viewBox="0 0 48 48"
										>
											<path
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M31.945 7.624L28.84 4.5h-9.68l-3.105 3.124H8.872v4.647h30.256V7.624h-7.183zm-19.901 4.647h23.95v28.124A3.106 3.106 0 0 1 32.89 43.5H15.15a3.106 3.106 0 0 1-3.105-3.105V12.271h0ZM24 17.886v20m6-20v20m-12-20v20"
											/>
										</svg>
									)}
								</button>
								<button
									onClick={handleSaveNotes}
									className={`capitalize ${editingNote ? "text-blue-500" : "text-green-500"}`}
								>
									{editingNote ? "update" : "save"}
								</button>
							</div>
						)}
				</div>
				<div className="h-auto w-full">
					<label
						htmlFor="title"
						className="flex w-full flex-col gap-1 px-3 pt-3"
					>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title..."
							value={titleInput}
							onChange={(e) => setTitleInput(e.target.value)}
							className="break-all rounded px-3 py-2 text-2xl outline-none"
							autoComplete="false"
							ref={titleInputRef}
						/>
						<div className="flex w-full select-none flex-col items-start justify-between gap-4 px-3 pb-4 text-[.65rem] font-semibold text-gray-400 lg:flex-row lg:items-center">
							<div className="flex gap-4">
								<label htmlFor="category">
									<select
										name="category"
										id="category"
										value={categorySelect || ""}
										onChange={(e) => setCategorySelect(e.target.value)}
										className="bg-transparent capitalize outline-none"
									>
										<option value="">select category</option>
										{Object.keys(data).map((item, index) => (
											<option key={index} value={item}>
												{item}
											</option>
										))}
									</select>
								</label>
								<span>|</span>
								<p>{characterCount} character</p>
							</div>
							{editingNote && (
								<div className="flex gap-3">
									<div className="pl-1">
										{editingNote &&
											new Date(editingNote.timestamp).toLocaleDateString(
												"id-ID",
												{
													year: "numeric",
													month: "long",
													day: "numeric",
												},
											)}
									</div>
									<div className="">
										{editingNote &&
											new Date(editingNote.timestamp)
												.toLocaleTimeString("id-ID")
												.replace(/\./g, ":")}
									</div>
								</div>
							)}
						</div>
					</label>
					<label
						htmlFor="body"
						className="flex h-auto w-full flex-col gap-1 px-3"
					>
						<textarea
							name="body"
							id="body"
							onInput={handleTextareaChange}
							value={bodyInput}
							onChange={(e) => setBodyInput(e.target.value)}
							placeholder="type description..."
							autoComplete="false"
							className="h-auto resize-none rounded px-4 py-2 outline-none placeholder:capitalize"
						></textarea>
					</label>
				</div>
			</div>
		</div>
	);
};

export default CrudNote;
