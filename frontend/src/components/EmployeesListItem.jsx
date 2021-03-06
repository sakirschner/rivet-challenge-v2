import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from './Avatar';

export const EmployeesListItem = ({ employee }) => {
	return (
		<div className='row my-4'>
			<div className='col' align='middle'>
				<Avatar employeePhoto={employee.photo} destination='EmployeesListItem' />
			</div>
			<div className='col-8 align-self-center'>
				<h3 className='mb-0'>
					{employee.first_name} {employee.last_name}
				</h3>
				{employee.email}
			</div>
			<div className='col align-self-center' align='middle'>
				<Link to={`/profile/${employee.id}`}>
					<button className='primary-outlined'>VIEW DETAILS</button>
				</Link>
			</div>
		</div>
	);
};
