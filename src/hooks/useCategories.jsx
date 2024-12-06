import { useEffect, useRef, useState } from "react";

export const useCategories = (data, dispatch) => {
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
				alert("Kategori sudah ada");
				return;
			}

			const updateNotes = {
				...storeNotes,
				[categoryInput]: {},
			};

			dispatch({ type: "ADD_NOTE", payload: updateNotes });

			setNotes(Object.keys(updateNotes));

			setModalCategory(!modalCategory);
			setSizeCategory(!modalCategory ? modalCatRef.current.scrollHeight : 0);
			setCategoryInput("");
		} else {
			alert("Kategori tidak boleh kosong");
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
