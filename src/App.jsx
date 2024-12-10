import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import ArchivePages from "./pages/archive";
import Sidebar from "./components/Layouts/Sidebar";
import Navbar from "./components/Layouts/Navbar";
import Toast from "./components/Elements/Toast";

function App() {
	return (
		<>
			<section className="flex min-h-screen bg-[#F6F7FB] relative">
				<Sidebar />
				<Toast/>
				<div className="relative h-screen w-full overflow-auto">
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						<Route path="/archive" element={<ArchivePages />}></Route>
					</Routes>
				</div>
			</section>
		</>
	);
}

export default App;
