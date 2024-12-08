import { useEffect, useRef, useState } from "react";

export const useCategories = (data, dispatch, showToast) => {
	const [modalCategory, setModalCategory] = useState(false);
	const [sizeCategory, setSizeCategory] = useState(0);
	const [categoryInput, setCategoryInput] = useState("");
	const modalCatRef = useRef(null);
	const [notes, setNotes] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	useEffect(() => {
		const storeNotes = JSON.parse(localStorage.getItem("notes")) || {};
		setNotes(Object.keys(storeNotes));
	}, []);

	const handleModalCategory = () => {
		setModalCategory(!modalCategory);
		setSizeCategory(!modalCategory ? modalCatRef.current.scrollHeight : 0);
		if (!modalCategory) {
			setCategoryInput("");
		}
	};

	const handleSubmitCategory = (e) => {
		e.preventDefault();

		const lowercaseCategory = categoryInput.trim().toLowerCase();

		if (lowercaseCategory !== "") {
			const storeNotes = JSON.parse(localStorage.getItem("notes")) || {};

			if (storeNotes[lowercaseCategory]) {
				showToast("Category already exists.", "error");
				return;
			}

			const updateNotes = {
				...storeNotes,
				[lowercaseCategory]: [],
			};

			dispatch({ type: "ADD_NOTE", payload: updateNotes });

			setNotes(Object.keys(updateNotes));

			setModalCategory(!modalCategory);
			setSizeCategory(!modalCategory ? modalCatRef.current.scrollHeight : 0);
			setCategoryInput("");
			showToast("Successfully added new category.", "success");
		} else {
			showToast("Category input cannot be empty.", "error");
		}
	};

	const handleCategoryToggle = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((cat) => cat !== category)
				: [...prev, category],
		);
	};

	const allNotes = Object.entries(data)
		.flatMap(([category, categoryNotes]) =>
			selectedCategories.length === 0 || selectedCategories.includes(category)
				? categoryNotes.map((note) => ({
						...note,
						category,
					}))
				: [],
		)
		.sort((a, b) => {
			if (a.timestamp && b.timestamp) {
				return new Date(b.timestamp) - new Date(a.timestamp);
			}
			return 0;
		});
	return {
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
		selectedCategories
	};
};
