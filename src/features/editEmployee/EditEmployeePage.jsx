import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployeeById,
	updateEmployee
} from '../employeesList/employeesSlice';

import { EmployeeForm } from '../../components/EmployeeForm';

export const EditEmployeeForm = ({ match }) => {
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

	const initialEmployee = employee;

	// const history = useHistory();

	const onSubmit = (employeeToUpdate) => {
		console.log(employee)
		dispatch(updateEmployee(employeeToUpdate));
	};

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
				onSubmit={onSubmit}
				initialEmployee={initialEmployee}
				// validate={validate}
			/>
		</div>
	);
};
