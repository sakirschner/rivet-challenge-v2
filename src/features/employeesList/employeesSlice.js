import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { employeeAPI } from '../../api/employeeAPI';

export const initialState = {
	employees: [],
	employeesStatus: 'idle',
	employeeStatus: 'idle',
	error: null
};

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async () => {
		const response = await employeeAPI.get('/profiles');
		return response;
	}
);

export const fetchEmployeeById = createAsyncThunk(
	'employee/fetchEmployee',
	async (employeeId) => {
		const response = await employeeAPI.get(`/profile/${employeeId}`);
		return response;
	}
);

const employeesSlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchEmployees.pending]: (state) => {
			state.employeesStatus  = 'loading';
		},
		[fetchEmployees.fulfilled]: (state, action) => {
			state.employeesStatus = 'succeeded';
			state.employees = state.employees.concat(action.payload);
		},
		[fetchEmployees.rejected]: (state, action) => {
			state.employeesStatus  = 'failed';
			state.error = action.error.message;
		},
		[fetchEmployeeById.pending]: (state) => {
			state.employeeStatus = 'loading';
		},
		[fetchEmployeeById.fulfilled]: (state, action) => {
			state.employeeStatus = 'succeeded';
			state.employees.push(action.payload)
		},
		[fetchEmployeeById.rejected]: (state, action) => {
			state.employeeStatus  = 'failed';
			state.error = action.error.message;
		},
	}
});

export default employeesSlice.reducer;

export const selectAllEmployees = (state) => state.employees.employees;

export const selectEmployeeById = (state, employeeId) =>
	state.employees.employees.find(
		(employee) => employee.id === Number(employeeId)
	);
