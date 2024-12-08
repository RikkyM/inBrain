import { useEffect, useRef, useState } from "react";

export const useCategories = (dispatch, showToast) => {
	const [modalCategory, setModalCategory] = useState(false);
	const [sizeCategory, setSizeCategory] = useState(0);
	const [categoryInput, setCategoryInput] = useState("");
	const modalCatRef = useRef(null);
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const storeNotes = JSON.parse(localStorage.getItem("notes")) || {};
		setNotes(Object.keys(storeNotes));
	}, []);

	const handleModalCategory = () => {
		setModalCategory(!modalCategory);
		setSizeCategory(!modalCategory ? modalCatRef.current.scrollHeight : 0);
	};

	const handleSubmitCategory = (e) => {
		e.preventDefault();

		if (categoryInput.trim() !== "") {
			const storeNotes = JSON.parse(localStorage.getItem("notes")) || {};

			if (storeNotes[categoryInput]) {
				showToast("Category already exists.", "error");
				return;
			}

			const updateNotes = {
				...storeNotes,
				[categoryInput]: [],
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
	return {
		categoryInput,
		setCategoryInput,
		sizeCategory,
		notes,
		modalCategory,
		modalCatRef,
		handleModalCategory,
		handleSubmitCategory,
	};
};
