import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
};

export type Theme = {
    theme: string;
}

const themes = ['light', 'dark', 'cupcake'];

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
