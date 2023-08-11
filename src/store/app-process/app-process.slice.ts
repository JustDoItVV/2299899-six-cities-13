import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SORT_OPTIONS } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  currentSort: SORT_OPTIONS[0],
  city: CITIES[0],
  cardUnderMouse: undefined,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentSort: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCardUnderMouse: (state, action: PayloadAction<string | undefined>) => {
      state.cardUnderMouse = action.payload;
    },
  },
});

export const { setCurrentSort, setCity, setCardUnderMouse } =
  appProcess.actions;
