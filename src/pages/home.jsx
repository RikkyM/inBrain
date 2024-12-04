import { useCrudNoteDispatch } from "../hooks/useCrudNote";

const iconPlus = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-full w-full"
		viewBox="0 0 16 16"
	>
		<path
			fill="currentColor"
			d="M8.25 3a.5.5 0 0 1 .5.5v3.75h3.75a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8.75v3.75a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5V8.75H3.5a.5.5 0 0 1-.5-.5v-.5a.5.5 0 0 1 .5-.5h3.75V3.5a.5.5 0 0 1 .5-.5z"
		/>
	</svg>
);

const HomePage = () => {
	const data = ["personal", "money", "private"];

	const dispatch = useCrudNoteDispatch();

	return (
		<div
			className={`no-scrollbar h-[calc(100vh-6rem)] w-full overflow-auto font-sfmono transition-all duration-[.5s] md:h-screen`}
		>
			<button
				onClick={() => dispatch({ type: "TOGGLE_BOX" })}
				className="fixed bottom-5 right-5 flex size-12 items-center rounded-full bg-green-200 p-2 text-green-600 shadow-sm"
			>
				<div>{iconPlus}</div>
			</button>
			<div className="h-full w-full overflow-auto py-5 md:py-10">
				<div>
					<h2 className="px-4 text-3xl font-bold">General</h2>
					<div className="no-scrollbar flex select-none items-center justify-start gap-2 overflow-auto p-4">
						<div className="flex items-center justify-center">
							<button className="relative size-10 rounded-full bg-blue-200 p-2 text-blue-600 shadow-sm">
								{iconPlus}
							</button>
						</div>
						<div className="flex flex-1 gap-3">
							{data &&
								data.map((item, index) => (
									<div key={index + 1}>
										<input
											type="checkbox"
											id={`${item}`}
											className="peer hidden"
										/>
										<label
											htmlFor={`${item}`}
											className="cursor-pointer rounded-full bg-blue-200 px-4 py-3 text-sm font-semibold capitalize text-blue-600 shadow-sm peer-checked:bg-blue-600 peer-checked:text-blue-100 md:py-2.5 md:text-base"
										>
											{item}
										</label>
									</div>
								))}
						</div>
					</div>
					<div className="px-4 text-xs text-gray-500">
						Fitur kategori belum dapat digunakan karena aplikasi sedang dalam
						tahap pengembangan.
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
