import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import './Avatar.css';

export const Avatar = ({ employeePhoto, destination }) => {
	return (
		<>
			{employeePhoto ? (
				<div
					className={`avatar-container ${
						destination === 'EmployeesListItem' ? 'small' : 'large'
					}`}
				>
					<img
						src={employeePhoto}
						alt='employee avatar'
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
