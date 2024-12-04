import { useContext } from "react";
import {
	CrudNoteContext,
	CrudNoteDispatchContext,
} from "../context/CrudNoteContext";

const useCrudNote = () => {
	return useContext(CrudNoteContext);
};

const useCrudNoteDispatch = () => {
	return useContext(CrudNoteDispatchContext);
};

export { useCrudNote, useCrudNoteDispatch };
