import { useState, useRef, useEffect } from "react";
import { useCrudNote, useCrudNoteDispatch } from "../../hooks/useCrudNote";

const CrudNote = () => {
	const { modal } = useCrudNote();
	const dispatch = useCrudNoteDispatch();
	const [characterCount, setCharacterCount] = useState(0);
	const modalRef = useRef(null);
	const [titleInput, setTitleInput] = useState("");
	const [bodyInput, setbodyInput] = useState("");
	const [categorySelect, setCategorySelect] = useState("");
	const data = ["personal", "money", "private"];

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
		if (!modal) {
			setTitleInput("");
			setbodyInput("");
			setCategorySelect("");
		}
	}, [modal, titleInput, bodyInput, categorySelect]);

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

	const handleNotif = () => {
		alert(
			`Berhasil Disimpan\n\nDetail Catatan:\nJudul: ${titleInput}\nKategori: ${categorySelect}\nIsi: ${bodyInput}`,
		);
		alert(
			"Data belum benar-benar tersimpan, aplikasi sedang dalam tahap pengembangan",
		);
		dispatch({ type: "TOGGLE_BOX" });
	};

	return (
		<div
			ref={modalRef}
			className={`absolute right-0 top-0 h-screen w-0 ${modal && "w-screen md:w-[50vw]"} no-scrollbar z-20 overflow-auto whitespace-nowrap bg-white font-sfmono shadow-sm transition-all duration-[.5s]`}
		>
			<div className="h-auto min-h-full w-auto p-5 md:w-[50vw]">
				<div className="flex h-10 items-center justify-between">
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
					{titleInput.trim() !== "" && categorySelect !== "" && (
						<button onClick={handleNotif} className="capitalize">
							simpan
						</button>
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
							placeholder="Judul..."
							value={titleInput}
							onChange={(e) => setTitleInput(e.target.value)}
							className="break-all rounded px-3 py-2 text-2xl outline-none"
						/>
						<div className="flex w-max select-none items-center justify-between gap-4 px-3 pb-4 text-xs font-semibold text-gray-400">
							<label htmlFor="category">
								<select
									name="category"
									id="category"
									value={categorySelect || ""}
									onChange={(e) => setCategorySelect(e.target.value)}
									className="capitalize outline-none"
								>
									<option value="">pilih kategori</option>
									{data.map((item, index) => (
										<option key={index} value={item}>
											{item}
										</option>
									))}
								</select>
							</label>
							<span>|</span>
							<p>{characterCount} karakter</p>
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
							onChange={(e) => setbodyInput(e.target.value)}
							placeholder="mulai mengetik..."
							className="h-auto resize-none rounded px-4 py-2 outline-none placeholder:capitalize"
						></textarea>
					</label>
				</div>
			</div>
		</div>
	);
};

export default CrudNote;
