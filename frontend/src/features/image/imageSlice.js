import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { imageAPI } from '../../api/imageAPI';

const initialState = {
	image: {},
	status: 'idle',
	error: null
};

export const addImage = createAsyncThunk('image/addImage', (image) => {
	return imageAPI.post(`/api/upload`, {data: image});
});

const imageSlice = createSlice({
	name: 'image',
	initialState,
	reducers: {
		resetError(state) {
			state.error = null;
		}
	},
	extraReducers: {
		[addImage.pending]: (state) => {
			state.status = 'loading';
		},
		[addImage.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded';
			state.image = payload;
		},
		[addImage.rejected]: (state, { error }) => {
			state.status = 'failed';
			state.error = error.message;
		}
	}
});

export const { resetError } = imageSlice.actions;

export default imageSlice.reducer;
