import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	employeesSelectors,
	fetchEmployees,
	updateEmployee
} from '../employeesList/employeesSlice';
import store from '../../app/store';
import { EmployeeForm } from '../../components/forms/EmployeeForm';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const updateStatus = useSelector((state) => state.employees.updateStatus);

	const employeeToUpdate = employeesSelectors.selectById(
		store.getState(),
		employeeId
	);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	const handleSubmit = (employee) => {
		dispatch(updateEmployee(employee));
	};

	const handleCancel = () => {
		history.push(`/profile/${employeeId}`)
	}

	// const validate = (values) => {
	// 	const errors = {};

	// 	if (values.name === '') {
	// 		errors.name = 'Please enter a name';
	// 	}

	// 	return errors;
	// };

	return (
		<div>
			<EmployeeForm
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				initialEmployee={employeeToUpdate}
				// validate={validate}
			/>
		</div>
	);
};
