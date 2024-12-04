import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
// import CategoryPage from "./pages/category";
// import AboutPage from "./pages/about";
import Sidebar from "./components/Layouts/Sidebar";
import Navbar from "./components/Layouts/Navbar";
import CrudNote from "./components/Layouts/CrudNote";

function App() {
	return (
		<>
			<section className="flex min-h-screen bg-[#F6F7FB]">
				<Sidebar />
				<div className="relative h-screen w-full overflow-auto">
					<Navbar />
					<Routes>
						<Route path="/" element={<HomePage />}></Route>
						{/* <Route path="/category" element={<CategoryPage />}></Route>
						<Route path="/about" element={<AboutPage />}></Route> */}
					</Routes>
				</div>
				<CrudNote />
			</section>
		</>
	);
}

export default App;
