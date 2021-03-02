import React from 'react';

import { EmployeesListItem } from '../../components/EmployeesListItem';

export const EmployeesList = ({ employees }) => {
	return employees.map((employee) => (
		<>
			<EmployeesListItem key={employee.id} employee={employee} />
			<hr />
		</>
	));
};
