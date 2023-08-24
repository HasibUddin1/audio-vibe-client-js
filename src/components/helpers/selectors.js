import { createSelector } from 'reselect';

const selectFavoriteMusic = (state) => state.favoriteMusic;

export const makeSelectFavoriteMusic = () =>
    createSelector(
        [selectFavoriteMusic],
        (favoriteMusic) => (userEmail) => favoriteMusic[userEmail] || []
    );