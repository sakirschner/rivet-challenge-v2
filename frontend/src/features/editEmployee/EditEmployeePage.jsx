import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	employeesSelectors,
	fetchEmployees,
	updateEmployee
} from '../employeesList/employeesSlice';
import store from '../../app/store';
import { EmployeeForm } from '../../components/EmployeeForm';
import { ImageUploadForm } from '../uploadImage/ImageUploadForm';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const updateStatus = useSelector((state) => state.employees.updateStatus);
	const employeeToEdit = employeesSelectors.selectById(
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

	const onSubmit = (employeeToUpdate) => {
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
				initialEmployee={employeeToEdit}
				// validate={validate}
			/>
			<ImageUploadForm />
		</div>
	);
};
