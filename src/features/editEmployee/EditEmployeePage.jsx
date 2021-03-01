import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployeeById
} from '../employeesList/employeesSlice';

import { EmployeeForm } from '../../components/EmployeeForm';

export const EditEmployeeForm = ({ match }) => {
	// const { employeeId } = match.params;

	// const error = useSelector((state) => state.employees.error);

	// const dispatch = useDispatch();
	// const history = useHistory();

	const onSubmit = (values) => {
		window.alert(JSON.stringify({ values }, null, 2));
	};

	const initialValues = null;

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
				initialValues={initialValues}
				// validate={validate}
			/>
		</div>
	);
};
