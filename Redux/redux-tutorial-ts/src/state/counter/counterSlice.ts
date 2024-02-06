import React from 'react'
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface counter {
    value: number;
}

const initialState: counter = {
    value: 0,
}

const counterSlice = createSlice({
    name: "Counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<string>) => {
            state.value += Number(action.payload);
        }

    }
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;

