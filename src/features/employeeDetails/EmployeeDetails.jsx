import React from 'react';
import { useSelector } from 'react-redux';

import { employeesSelectors } from '../employeesList/employeesSlice';

export const EmployeeDetails = ({ match }) => {
	// const { employeeId } = match.params;

	let employee = useSelector(employeesSelectors.selectById);

	return (
		<div>
			{employee ? <h1>{employee.email}</h1> : <h1>Employee Not Found</h1>}
		</div>
	);
};
