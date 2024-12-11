const Card = ({ note = "", onClick = () => {}, archive = () => {} }) => {
	return (
		<div
			onClick={onClick}
			className={`relative ${!note.archive && "cursor-pointer"} select-none break-inside-avoid-column rounded-lg border border-black bg-white p-3 shadow-[5px_5px_0_0_rgba(0,0,0,1)]`}
		>
			<div className="flex items-center justify-between">
				<h4
					className={`mb-2 text-lg font-semibold text-black ${note.title ? "" : "text-transparent"}`}
				>
					{note.title || "-"}
				</h4>
				{note.archive && (
					<button onClick={archive} className="size-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-full w-full"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								fillRule="evenodd"
								d="M3.955 2.25h16.09c.433 0 .83 0 1.152.043c.356.048.731.16 1.04.47c.31.309.422.684.47 1.04c.043.323.043.72.043 1.152v.09c0 .433 0 .83-.043 1.152c-.048.356-.16.731-.47 1.04c-.293.294-.647.41-.987.462v5.357c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153h-1.112c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V7.7c-.34-.052-.694-.168-.987-.462c-.31-.309-.422-.684-.47-1.04c-.043-.323-.043-.72-.043-1.152v-.09c0-.433 0-.83.043-1.152c.048-.356.16-.731.47-1.04c.309-.31.684-.422 1.04-.47c.323-.043.72-.043 1.152-.043Zm.295 5.5V13c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c.982.132 2.263.14 4.039.14v-6.296l-1.693 1.881a.75.75 0 0 1-1.114-1.003l3-3.334a.75.75 0 0 1 1.114 0l3 3.334a.75.75 0 0 1-1.114 1.003l-1.693-1.88v6.295c1.776 0 3.057-.008 4.04-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289V7.75H4.25ZM2.823 3.823l.003-.001a.706.706 0 0 1 .177-.042c.21-.028.504-.03.997-.03h16c.493 0 .787.002.997.03a.704.704 0 0 1 .177.042l.003.001l.001.003a.703.703 0 0 1 .042.177c.028.21.03.504.03.997s-.002.787-.03.997a.703.703 0 0 1-.042.177l-.001.003l-.003.001a.704.704 0 0 1-.177.042c-.21.028-.504.03-.997.03H4c-.493 0-.787-.002-.997-.03a.706.706 0 0 1-.177-.042l-.003-.001l-.001-.003a.706.706 0 0 1-.042-.177c-.028-.21-.03-.504-.03-.997s.002-.787.03-.997a.706.706 0 0 1 .042-.177l.001-.003Zm0 2.354Z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				)}
			</div>

			<div className="relative h-full max-h-[350px] overflow-hidden md:max-h-[500px]">
				<p className="line-clamp-[12] break-words text-xs leading-relaxed text-gray-600">
					{note.body}
				</p>
				{note.body ? (
					note.body.length > 500 && (
						<div className="absolute bottom-0 left-0 h-10 w-full">
							<span className="absolute bottom-0 right-0 bg-white text-xs">
								...
							</span>
						</div>
					)
				) : (
					<div className="text-xs">No text</div>
				)}
			</div>

			<div className="mt-5 flex justify-between">
				<p className="text-[.6rem] capitalize text-gray-400">{note.category}</p>
				{note.timestamp && (
					<p className="text-[.6rem] text-gray-400">
						{new Date(note.timestamp).toLocaleDateString()}
					</p>
				)}
			</div>
		</div>
	);
};

export default Card;
