import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEmployees, employeesSelectors } from './employeesSlice';
import { EmployeesList } from './EmployeesList';
import store from '../../app/store';

export const EmployeesListPage = () => {
	const employees = employeesSelectors.selectAll(store.getState());
	const status = useSelector((state) => state.employees.status);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [status, dispatch]);

	return (
		<div>
			{status === 'loading' ? <h1>Loading...</h1> : null}
			{status === 'succeeded' ? (
				<div>
					<Link to='/add'>
						<button>Add Employee</button>
					</Link>
					<EmployeesList employees={employees} />
				</div>
			) : null}
			{status === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
