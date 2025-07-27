'use client';

import { Boat } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoatState {
  boats: Boat[];
  flagshipBoat: Boat[];
  loading: boolean;
  //   boat: Boat[];
}

const initialState: BoatState = {
  boats: [],
  flagshipBoat: [],
  loading: false,
  //   boat: [],
};

export const BoatSlice = createSlice({
  name: 'boat',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      console.log(state, 26);
      console.log(action, 27);
      state.loading = action.payload;
    },
    setListFlagshipBoat: (state, action: PayloadAction<Boat[]>) => {
      state.flagshipBoat = action.payload;
    },
    setListBoats: (state, action: PayloadAction<Boat[]>) => {
      state.boats = action.payload;
    },
    // setListBoat: (state, action: PayloadAction<Boat[]>) => {
    //   console.log(action, 36);
    //   state.boat = action.payload;
    // },
  },
});

// Action creators are generated for each case reducer function
// export const { setLoading, setListBoats, setListBoat } = BoatSlice.actions;
export const { setLoading, setListBoats, setListFlagshipBoat } =
  BoatSlice.actions;
export default BoatSlice.reducer;
