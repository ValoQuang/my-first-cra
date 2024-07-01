import { createSlice } from '@reduxjs/toolkit';

type Theme = typeof themes[number];

interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: 'light',
};

export const themes = ['light', 'dark', 'cupcake'] as const;

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        handleChangeTheme: (state) => {
            const currentThemeIndex = themes.indexOf(state.theme);
            const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
            state.theme = themes[nextThemeIndex];
        },
    }
});

export const { handleChangeTheme } = themeSlice.actions;

export default themeSlice.reducer;
