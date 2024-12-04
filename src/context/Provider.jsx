import { CrudNoteProvider } from "./CrudNoteContext";
import { SidebarProvider } from "./SidebarContext";

export const Provider = ({ children }) => {
	return (
		<SidebarProvider>
			<CrudNoteProvider>{children}</CrudNoteProvider>
		</SidebarProvider>
	);
};
