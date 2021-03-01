import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployeeById
} from '../employeesList/employeesSlice';

export const EmployeeDetails = ({ match }) => {
	const { employeeId } = match.params;

	const employeeStatus = useSelector(
		(state) => state.employees.employeeStatus
	);
	const error = useSelector((state) => state.employees.error);
	const employee = useSelector((state) =>
		selectEmployeeById(state, employeeId)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!employee) {
			dispatch(fetchEmployeeById(employeeId));
		}
	}, [employee, employeeId, employeeStatus, dispatch]);

	return (
		<div>
			{employeeStatus === 'loading' ? <h1>Loading...</h1> : null}
			{employeeStatus === 'succeeded' ? (
				<div>
					<h1>{employee.email}</h1>
					<Link to={`/edit/${employee.id}`}>
						<button>Edit</button>
					</Link>
				</div>
			) : null}
			{employeeStatus === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
