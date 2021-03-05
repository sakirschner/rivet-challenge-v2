import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import {
	updateEmployee,
	employeesSelectors,
	fetchEmployees
} from '../employeesList/employeesSlice';
import { EmployeeForm } from '../../components/forms/EmployeeForm';
import store from '../../app/store';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const [employee, setEmployee] = useState(
		employeesSelectors.selectById(store.getState(), employeeId) || {}
	);

	const fetchStatus = useSelector((state) => state.employees.fetchStatus);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	useEffect(() => {
		if (fetchStatus === 'succeeded') {
			setEmployee(
				employeesSelectors.selectById(store.getState(), employeeId)
			);
		}
	}, [fetchStatus, setEmployee, employeeId]);

	const error = useSelector((state) => state.employees.error);

	const history = useHistory();

	const handleSubmit = async (employee) => {
		await dispatch(updateEmployee(employee)).then(unwrapResult);
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
				onFormSubmit={handleSubmit}
				onFormCancel={handleCancel}
				employee={employee}
				setEmployee={setEmployee}
			/>
		</div>
	);
};
