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
import { unwrapResult } from '@reduxjs/toolkit';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const error = useSelector((state) => state.employees.error);

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

	const handleSubmit = async (employee) => {
		const response = await dispatch(updateEmployee(employee)).then(
			unwrapResult
		);
		console.log(response);
		if (!error) {
			history.push(`/profile/${employeeId}`);
		}
	};

	const handleCancel = () => {
		history.push(`/profile/${employeeId}`);
	};

	return (
		<div>
			<EmployeeForm
				onSubmit={handleSubmit}
				onCancel={handleCancel}
				initialEmployee={employeeToUpdate}
			/>
		</div>
	);
};
