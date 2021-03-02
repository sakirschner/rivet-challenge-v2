import {
	createAsyncThunk,
	createSlice,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { employeeAPI } from '../../api/employeeAPI';

const employeesAdapter = createEntityAdapter({
	selectId: (employee) => employee.id,
	sortComparer: (a, b) =>
		a.id.toString().localeCompare(b.id.toString(), undefined, { numeric: true })
});

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async () => {
		const response = await employeeAPI.get('/profiles');
		return response;
	}
);

export const updateEmployee = createAsyncThunk(
	'employee/updateEmployee',
	async ({ employee }) => {
		const response = await employeeAPI.put(
			`/profile/${employee.id}`,
			employee
		);
		return response;
	}
);

export const addEmployee = createAsyncThunk(
	'employee/addEmployee',
	async ({ employee }) => {
		const response = await employeeAPI.post(`/profile`, employee);
		return response;
	}
);

const employeesSlice = createSlice({
	name: 'employees',
	initialState: employeesAdapter.getInitialState({
		fetchStatus: 'idle',
		updateStatus: 'idle',
		addStatus: 'idle',
		error: null,
	}),
	reducers: {},
	extraReducers: {
		[fetchEmployees.pending]: (state) => {
			state.fetchStatus = 'loading';
		},
		[fetchEmployees.fulfilled]: (state, { payload }) => {
			state.fetchStatus = 'succeeded';
			employeesAdapter.setAll(state, payload);
		},
		[fetchEmployees.rejected]: (state, { error }) => {
			state.fetchStatus = 'failed';
			state.error = error.message;
		},
		[updateEmployee.pending]: (state) => {
			state.updateStatus = 'loading';
		},
		[updateEmployee.fulfilled]: (state, { payload }) => {
			employeesAdapter.updateOne(state, {
				id: payload.id,
				changes: payload
			});
		},
		[updateEmployee.rejected]: (state, { error }) => {
			state.updateStatus = 'failed';
			state.error = error.message;
		},
		[addEmployee.fulfilled]: (state, { payload }) => {
			employeesAdapter.addOne(state, payload);
		}
	}
});

export const employeesSelectors = employeesAdapter.getSelectors(
	(state) => state.employees
);

export default employeesSlice.reducer;
