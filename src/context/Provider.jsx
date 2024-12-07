import { CrudNoteProvider } from "./CrudNoteContext";
import { SidebarProvider } from "./SidebarContext";
import { ToastProvider } from "./ToastContext";

export const Provider = ({ children }) => {
	return (
		<SidebarProvider>
			<ToastProvider>
				<CrudNoteProvider>{children}</CrudNoteProvider>
			</ToastProvider>
		</SidebarProvider>
	);
};
