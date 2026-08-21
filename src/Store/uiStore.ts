import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
	isDarkMode: boolean;
	bookSearchTerm: string;
	toggleDarkMode: () => void;
	setBookSearchTerm: (term: string) => void;
}

const useUiStore = create<UiState>()(
persist(
	(set) => ({
		isDarkMode: false,
		bookSearchTerm: "",
		toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
		setBookSearchTerm: (bookSearchTerm) => set({ bookSearchTerm }),
	}),
	{ name: "itelect4-ui", partialize: (state) => ({ isDarkMode: state.isDarkMode }) },
),
);
export default useUiStore;