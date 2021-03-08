import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from './shared/Avatar';

import './EmployeesListItem.css';

export const EmployeesListItem = ({ employee }) => {
	return (
		<div className='row my-4'>
			<div className='col-sm' align='middle'>
				<Avatar
					employeePhoto={employee.photo}
					destination='EmployeesListItem'
				/>
			</div>
			<div className='col-sm-6 align-self-center info-preview'>
				<h3 className='mb-0'>
					{employee.first_name} {employee.last_name}
				</h3>
				{employee.email}
			</div>
			<div className='col-sm align-self-center' align='middle'>
				<Link to={`/profile/${employee.id}`}>
					<button className='primary-outlined details-btn'>
						VIEW DETAILS
					</button>
				</Link>
			</div>
		</div>
	);
};
