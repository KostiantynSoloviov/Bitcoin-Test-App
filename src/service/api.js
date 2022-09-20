import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL, API_KEY } from './config';

export const getData = createAsyncThunk('bitcoin/getData', async () => {
    return fetch(`${API_URL}CMC_PRO_API_KEY=${API_KEY}&convert=USD&id=1`).then(
        (response) => {
            if (response.ok) {
                return response.json();
            }
        }
    );
});
