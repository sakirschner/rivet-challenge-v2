import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { employeeAPI } from '../../api/employeeAPI';

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
		const response = await employeeAPI.get(`/profiles/${employeeId}`)
		return response;
	}
)

const employeesAdapter = createEntityAdapter({
	selectId: (employee) => employee.id
});

const employeesSlice = createSlice({
	name: 'employees',
	initialState: employeesAdapter.getInitialState({
		status: 'idle',
		error: null
	}),
	reducers: {},
	extraReducers: {
		[fetchEmployees.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchEmployees.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			employeesAdapter.setAll(state, action.payload)
		},
		[fetchEmployees.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		}
	}
});

export const employeesSelectors = employeesAdapter.getSelectors(
	(state) => state.employees
)

export default employeesSlice.reducer;

// export const selectAllEmployees = (state) => state.employees.employees;

// export const selectEmployeeById = (state, employeeId) => 
// 	state.employees.employees.find((employee) => 
// 		employee.id === Number(employeeId))
