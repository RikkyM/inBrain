import { useState } from "react";
import { useCrudNote, useCrudNoteDispatch } from "../../hooks/useCrudNote";

const CrudNote = () => {
	const { modal } = useCrudNote();
	const dispatch = useCrudNoteDispatch();
	const [characterCount, setCharacterCount] = useState(0)

	const handleTextareaChange = (e) => {
		e.target.style.height = "auto";
		e.target.style.height = `${e.target.scrollHeight}px`;

		const characterCountWithoutSpaces = e.target.value.replace(
			/\s/g,
			"",
		).length;
		setCharacterCount(characterCountWithoutSpaces);
	};

	return (
		<div
			className={`absolute right-0 top-0 h-screen w-0 ${modal && "w-screen md:w-[50vw]"} no-scrollbar z-20 overflow-auto whitespace-nowrap bg-transparent bg-white shadow-sm transition-all duration-[.5s]`}
		>
			<div className="h-screen w-screen bg-white p-5 md:w-[50vw]">
				<div className="flex items-center justify-between">
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
				</div>
				<form className="h-auto w-full">
					<label
						htmlFor="title"
						className="flex w-full flex-col gap-1 px-3 pt-3"
					>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Judul..."
							className="break-all rounded px-3 py-2 text-2xl outline-none"
						/>
						<div className="select-none px-3 pb-4">
							<p className="text-xs font-bold text-gray-300">
								{characterCount} karakter
							</p>
						</div>
					</label>
					<label
						htmlFor="body"
						className="flex h-auto w-full flex-col gap-1 p-3"
					>
						<textarea
							name="body"
							id="body"
							style={{
								height: "auto",
								minHeight: "76vh",
							}}
							onInput={handleTextareaChange}
							placeholder="mulai mengetik..."
							className="resize-none rounded px-3 py-2 outline-none placeholder:capitalize"
						></textarea>
					</label>
				</form>
			</div>
		</div>
	);
};

export default CrudNote;
