import React from 'react';
import logo from '../../images/Rivet_Logo_White.png';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';

export const Header = () => {
    const location = useLocation();

    const renderButton = () => {
		if (location.pathname !== '/add') {
			return (
				<Link to='/add' className='add-button'>
					<button className="secondary">ADD EMPLOYEE</button>
				</Link>
			);
		}
	};

	return (
		<div className='header'>
			<Link to={'/'}>
				<img src={logo} alt='logo' className='logo' />
			</Link>
			{renderButton()}
		</div>
	);
};
