import React from 'react';
import logo from '../../assets/Rivet_Logo_White.png';
import { Link, useLocation } from 'react-router-dom';

import './Header.css';

export const Header = () => {
	const location = useLocation();

	return (
		<div className='header' id='myTopnav'>
			<Link to={'/'}>
				<img src={logo} alt='logo' className='logo' />
			</Link>
			<div className='right-nav'>
				{location.pathname !== '/' ? (
					<Link to={'/'} className='list' id='override'>
						<button>EMPLOYEE LIST</button>
					</Link>
				) : null}
				{location.pathname !== '/add' ? (
					<Link to='/add' className='add-button'>
						<button className='secondary'>ADD EMPLOYEE</button>
					</Link>
				) : null}
			</div>
		</div>
	);
};
