import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import employeeAPI from '../../api/employeeAPI';

export const initialState = {
    employees: [],
	status: 'idle',
	error: null,
};

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async () => {
        try {
            const response = await employeeAPI.get('/profiles');
            return response.data;
        } catch (err) {
            console.error('Failed to fetch employees: ', err)
        }
	}
);

const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchEmployees.pending]: (state) => {
			state.loading = 'loading';
		},
		[fetchEmployees.fulfilled]: (state, action) => {
			state.employees = state.employees.concat(action.payload);
		},
		[fetchEmployees.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export default employeesSlice.reducer;
