import React from 'react';

import { EmployeesListItem } from '../../../components/EmployeesListItem';

export const EmployeesList = ({ employees }) => {
	return employees.map((employee) => (
		<li key={employee.id}>
			<EmployeesListItem employee={employee} />
			<hr />
		</li>
	));
};
