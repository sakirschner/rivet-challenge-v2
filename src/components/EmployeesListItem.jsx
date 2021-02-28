import React from 'react';
import { Link } from 'react-router-dom';

export const EmployeesListItem = ({ employee }) => {
	return (
		<div>
			<Link to={`/profile/${employee.id}`}>{employee.email}</Link>
		</div>
	);
};
