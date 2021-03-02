import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	employeesSelectors,
	fetchEmployees
} from '../employeesList/employeesSlice';
import store from '../../app/store';

export const EmployeeDetails = ({ match }) => {
	const { employeeId } = match.params;

	const status = useSelector((state) => state.employees.status);
	const error = useSelector((state) => state.employees.error);
	
	const employee = employeesSelectors.selectById(
		store.getState(),
		employeeId
	);

	// const employee = useSelector((state) =>
	// 	selectEmployeeById(state, employeeId)
	// );

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [status, dispatch]);

	// useEffect(() => {
	// 	if (!employee) {
	// 		dispatch(fetchEmployeeById(employeeId));
	// 	}
	// }, [employee, employeeId, employeeStatus, dispatch]);

	return (
		<div>
			{status === 'loading' ? <h1>Loading...</h1> : null}
			{status === 'succeeded' ? (
				<div>
					<h1>{employee.email}</h1>
					<Link to={`/edit/${employee.id}`}>
						<button>Edit</button>
					</Link>
				</div>
			) : null}
			{status === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
