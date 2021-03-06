import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import {
	updateEmployee,
	fetchEmployees,
	selectEmployeeById
} from '../employeesList/employeesSlice';
import { EmployeeForm } from '../../components/forms/EmployeeForm';
// import { SetEmployeeForForm } from './SetEmployeeForForm';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const [employee, setEmployee] = useState(useSelector((state) => selectEmployeeById(state, employeeId)));

	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	useEffect(() => {
		if (employee === {}) {
			return
		} 
	}, [employee]);

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
		<>
			<EmployeeForm
				onFormSubmit={handleSubmit}
				onFormCancel={handleCancel}
				employee={employee}
				setEmployee={setEmployee}
			/>
		</>
	);
};
