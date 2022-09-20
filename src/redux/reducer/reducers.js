import { createSlice } from '@reduxjs/toolkit';

import { getData } from '../../service/api';

function createData(date, price) {
    return {
        date,
        price,
    };
}

const initialState = {
    bitcoinHistoryArray: [],
    interval: 60,
    data: 'desc',
    dataBy: 'date',
    page: 0,
    rowsPerPage: 5,
};

export const DataSlice = createSlice({
    name: 'bitcoin',
    initialState,
    reducers: {
        setInterval: (state, action) => {
            state.interval = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        setDataBy: (state, action) => {
            state.dataBy = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
    },
    extraReducers: {
        [getData.fulfilled]: (state, action) => {
            state.bitcoinHistoryArray.push(
                createData(
                    action.payload.status.timestamp,
                    action.payload.data['1'].quote.USD.price
                )
            );
        },
    },
});

export const {
    addHistoryObject,
    setInterval,
    setData,
    setDataBy,
    setPage,
    setRowsPerPage,
} = DataSlice.actions;
export default DataSlice.reducer;
