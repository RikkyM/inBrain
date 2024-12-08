const Card = ({ note, onClick = () => {} }) => {
    return (
			<div onClick={onClick}
				className="relative select-none cursor-pointer break-inside-avoid-column rounded-lg border border-gray-300 bg-white p-3 shadow-sm"
			>
				<h4
					className={`mb-2 text-lg font-semibold ${note.title ? "" : "text-transparent"}`}
				>
					{note.title || "-"}
				</h4>

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
					<p className="text-[.6rem] capitalize text-gray-400">
						{note.category}
					</p>
					{note.timestamp && (
						<p className="text-[.6rem] text-gray-400">
							{new Date(note.timestamp).toLocaleDateString()}
						</p>
					)}
				</div>
			</div>
		);
}

export default Card;