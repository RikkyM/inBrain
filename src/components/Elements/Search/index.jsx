import { useSearch } from "../../../hooks/useSearch";

const Search = ({ value, state }) => {
	const { searchRef, searchInputRef, searchToggle, handleToggleSearch } =
		useSearch();

	return (
		<div
			className={`flex h-10 w-full items-center justify-end gap-3 border border-black bg-white p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all duration-[.5s] ${searchToggle ? "max-w-[230px] animate-borderIn md:max-w-[300px]" : "max-w-[40px] animate-borderOut cursor-pointer"}`}
			onClick={searchToggle ? () => {} : handleToggleSearch}
			ref={searchRef}
		>
			<label htmlFor="search" className="w-full">
				<input
					type="text"
					inputMode="search"
					id="search"
					ref={searchInputRef}
					autoComplete="false"
					value={value}
					maxLength="30"
					onChange={(e) => state(e.target.value)}
					className={`bg-transparent outline-none ${searchToggle ? "w-full" : "w-0"}`}
				/>
			</label>
			<button onClick={handleToggleSearch} className="h-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-full"
					viewBox="0 0 24 24"
				>
					<g fill="none" stroke="currentColor" strokeWidth="2">
						<circle cx="11" cy="11" r="7" />
						<path strokeLinecap="round" d="m20 20l-3-3" />
					</g>
				</svg>
			</button>
		</div>
	);
};

export default Search;
