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
	() => {
		return employeeAPI.get('/profiles');
	}
);

export const updateEmployee = createAsyncThunk(
	'employee/updateEmployee',
	({ employee }) => {
		return employeeAPI.put(
			`/profile/${employee.id}`,
			employee
		);
	}
);

export const addEmployee = createAsyncThunk(
	'employee/addEmployee',
	({ employee }) => {
		return employeeAPI.post(`/profile`, employee);
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
			state.error = null;
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
