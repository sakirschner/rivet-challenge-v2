import {
	createAsyncThunk,
	createSlice,
	createEntityAdapter
} from '@reduxjs/toolkit';
import { employeeAPI } from '../../api/employeeAPI';

const employeesAdapter = createEntityAdapter({
	selectId: (employee) => employee.id,
	sortComparer: (a, b) =>
		a.id.toString().localeCompare(b.id, undefined, { numeric: true })
});

export const fetchEmployees = createAsyncThunk(
	'employees/fetchEmployees',
	async () => {
		const response = await employeeAPI.get('/profiles');
		return response;
	}
);

// export const fetchEmployeeById = createAsyncThunk(
// 	'employee/fetchEmployee',
// 	async (employeeId) => {
// 		const response = await employeeAPI.get(`/profile/${employeeId}`);
// 		return response;
// 	}
// );

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
		loadingStatus: 'idle',
		error: null,
		updateStatus: 
	}),
	reducers: {},
	extraReducers: {
		[fetchEmployees.pending]: (state) => {
			state.status = 'loading';
		},
		[fetchEmployees.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded';
			employeesAdapter.setAll(state, payload);
		},
		[fetchEmployees.rejected]: (state, { error }) => {
			state.status = 'failed';
			state.error = error.message;
		},
		[updateEmployee.fulfilled]: (state, { payload }) => {
			employeesAdapter.updateOne(state, {
				id: payload.id,
				changes: payload
			});
		},
		[addEmployee.fulfilled]: (state, { payload }) => {
			employeesAdapter.addOne(state, payload);
		}
	}
});

export const employeesSelectors = employeesAdapter.getSelectors(
	(state) => state.employees
);

// export const selectAllEmployees = (state) => state.employees.employees;

// export const selectEmployeeById = (state, employeeId) =>
// 	state.employees.employees.find(
// 		(employee) => employee.id === Number(employeeId)
// 	);

export default employeesSlice.reducer;
