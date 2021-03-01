import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	employeesSelectors,
	fetchEmployees,
	updateEmployee
} from '../employeesList/employeesSlice';
import store from '../../app/store';
import { EmployeeForm } from '../../components/EmployeeForm';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const status = useSelector(
		(state) => state.employees.status
	);
	const employeeToEdit = employeesSelectors.selectById(store.getState(), employeeId)

	const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [status, dispatch]);

	const onSubmit = async (employeeToUpdate) => {
		setUpdateRequestStatus('pending')
		const response = await dispatch(updateEmployee(employeeToUpdate));
		if (response.error) {
			window.alert(response.error.message)
		}
		setUpdateRequestStatus('idle')
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
		</div>
	);
};
