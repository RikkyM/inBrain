import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
	const searchRef = useRef(null);
	const searchInputRef = useRef(null);
	const [searchToggle, setSearchToggle] = useState(false);
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchToggle &&
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				setSearchToggle(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [searchToggle]);

	const handleToggleSearch = () => {
		if (!searchToggle) {
			setSearchToggle(true);
			if (searchInputRef.current) {
				searchInputRef.current.focus();
			}
		} else {
			setSearchToggle(false);
		}
	};

    return {
        searchRef,
        searchInputRef,
        searchToggle,
        setSearchToggle,
        handleToggleSearch
    }
};
