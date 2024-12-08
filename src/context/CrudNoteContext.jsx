import { createContext, useEffect, useReducer } from "react";

const CrudNoteContext = createContext();

const CrudNoteDispatchContext = createContext();

const crudNoteReducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE_BOX": {
			return {
				...state,
				modal: !state.modal,
			};
		}
		case "ADD_NOTE": {
			return { ...state, data: action.payload };
		}
		case "UPDATE_NOTE": {
			return {
				...state,
				data: action.payload,
			};
		}
		default: {
			throw Error("Unknown action: " + action.type);
		}
	}
};

const CrudNoteProvider = ({ children }) => {
	const [crudNote, dispatch] = useReducer(crudNoteReducer, {
		modal: false,
		data: JSON.parse(localStorage.getItem("notes")) || {},
	});

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(crudNote.data));
	}, [crudNote.data]);

	return (
		<CrudNoteContext.Provider value={crudNote}>
			<CrudNoteDispatchContext.Provider value={dispatch}>
				{children}
			</CrudNoteDispatchContext.Provider>
		</CrudNoteContext.Provider>
	);
};

export { CrudNoteProvider, CrudNoteContext, CrudNoteDispatchContext };
