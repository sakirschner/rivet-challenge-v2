import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addEmployee } from '../employeesList/employeesSlice'

import { EmployeeForm } from '../../components/EmployeeForm';

export const AddEmployeePage = () => {
    const [updateRequestStatus, setUpdateRequestStatus] = useState('idle')

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (employeeToAdd) => {
		setUpdateRequestStatus('pending')
		const response = await dispatch(addEmployee(employeeToAdd));
		if (response.error) {
			window.alert(response.error.message)
		}
		setUpdateRequestStatus('idle')
	};
    
    return (
		<div>
			<EmployeeForm
				onSubmit={onSubmit}
				initialEmployee={null}
				// validate={validate}
			/>
		</div>
	);
}