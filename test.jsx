import React, { useState } from "react";
import { useCrudNote, useCrudNoteDispatch } from "../hooks/useCrudNote";

const HomePage = () => {
	const { data } = useCrudNote();
	const dispatch = useCrudNoteDispatch();
	const [input, setInput] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [newCategory, setNewCategory] = useState("");

	// Initialize categories from existing data or use default
	const [categories, setCategories] = useState(() => {
		const existingCategories = Object.keys(data);
		return existingCategories.length > 0 ? existingCategories : [];
	});

	console.log(categories);

	// const handleAddNote = () => {
	// 	if (selectedCategory && input.trim()) {
	// 		const newNotes = {
	// 			...data,
	// 			[selectedCategory]: {
	// 				...(data[selectedCategory] || {}),
	// 				[Object.keys(data[selectedCategory] || {}).length + 1]: {
	// 					id: Object.entries(data[selectedCategory] || {}).length + 1,
	// 					title: input.trim(),
	// 				},
	// 			},
	// 		};
	// 		dispatch({
	// 			type: "ADD_NOTE",
	// 			payload: newNotes,
	// 		});
	// 		// Reset input after adding note
	// 		setInput("");
	// 		setSelectedCategory("");
	// 	}
	// };

	const handleAddCategory = () => {
		// Update categories list
		setCategories((prevCategories) => [...prevCategories, newCategory]);

		// Update data structure with new category
		const updatedData = {
			...data,
			[newCategory]: {},
		};

		dispatch({
			type: "ADD_CATEGORY",
			payload: updatedData,
		});

		// Reset new category input
		setNewCategory("");
	};

	const handleOnChangeInput = (e) => {
		setInput(e.target.value);
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	const handleNewCategoryChange = (e) => {
		setNewCategory(e.target.value);
	};

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto bg-[#F6F7FB] p-4 font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<h1 className="mb-4 text-2xl font-bold">Catatan Aplikasi</h1>

			{/* Note Addition Section */}
			<div className="mb-4 flex flex-col space-y-2">
				<input
					type="text"
					value={input}
					onChange={handleOnChangeInput}
					placeholder="Masukkan catatan"
					className="rounded border p-2"
				/>
				<select
					value={selectedCategory}
					onChange={handleCategoryChange}
					className="rounded border p-2"
				>
					<option value="">Pilih Kategori</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				<button
					// onClick={handleAddNote}
					className="rounded bg-blue-500 p-2 text-white"
					disabled={!selectedCategory || !input.trim()}
				>
					Tambah Catatan
				</button>
			</div>

			{/* Category Addition Section */}
			<div className="mb-4 flex flex-col space-y-2">
				<input
					type="text"
					value={newCategory}
					onChange={handleNewCategoryChange}
					placeholder="Tambah Kategori Baru"
					className="rounded border p-2"
				/>
				<button
					onClick={handleAddCategory}
					className="rounded bg-green-500 p-2 text-white"
					disabled={
						!newCategory.trim() ||
						categories.includes(newCategory.trim().toLowerCase())
					}
				>
					Tambah Kategori
				</button>
			</div>

			{/* Saved Notes Section */}
			<div className="mt-4">
				<h2 className="mb-2 text-xl font-semibold">Catatan yang Tersimpan:</h2>
				{Object.entries(data).map(([category, notes]) => (
					<div key={category} className="mb-4">
						<h3 className="font-bold capitalize">{category}</h3>
						{Object.values(notes).length > 0 ? (
							<ul className="list-disc pl-5">
								{Object.values(notes).map((note) => (
									<li key={note.id} className="ml-2">
										{note.title}
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-500">Tidak ada catatan</p>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default HomePage;
