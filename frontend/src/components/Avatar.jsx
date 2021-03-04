import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import './Avatar.css';

export const Avatar = ({ employee, destination }) => {
	return (
		<>
			{employee.photo ? (
				<div
					className={`avatar-container ${
						destination === 'EmployeesListItem' ? 'small' : 'large'
					}`}
				>
					<img
						src={employee.photo}
						alt={`${employee.first_name} ${employee.last_name}}`}
					/>
				</div>
			) : (
				<FontAwesomeIcon
					icon={faUserCircle}
					size={destination === 'EmployeesListItem' ? '5x' : '10x'}
					className='icon'
				/>
			)}
		</>
	);
};
