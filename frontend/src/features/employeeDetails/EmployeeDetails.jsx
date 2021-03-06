import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployees
} from '../employeesList/employeesSlice';
import { Avatar } from '../../components/Avatar';

export const EmployeeDetails = ({ match }) => {
	const { employeeId } = match.params;

	const employee =
		useSelector((state) => selectEmployeeById(state, employeeId)) || {};
	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	return (
		<div>
			{fetchStatus === 'loading' ? <h1>Loading...</h1> : null}
			{fetchStatus === 'succeeded' ? (
				<div>
					<Avatar employeePhoto={employee.photo} />
					<h1>{employee.email}</h1>
					<Link to={`/edit/${employee.id}`}>
						<button>Edit</button>
					</Link>
				</div>
			) : null}
			{fetchStatus === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
