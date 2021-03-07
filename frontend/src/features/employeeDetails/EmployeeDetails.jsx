import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployees
} from '../employeesList/employeesSlice';
import { Avatar } from '../../components/Avatar';

import './EmployeeDetails.css';

export const EmployeeDetails = ({ match }) => {
	const { employeeId } = match.params;

	const employee =
		useSelector((state) => selectEmployeeById(state, employeeId)) || {};
	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	return (
		<>
			{fetchStatus === 'loading' ? <h1>Loading...</h1> : null}
			{fetchStatus === 'succeeded' ? (
				<div className='details-container'>
					<div className='row align-items-center'>
						<div className='col-sm'>
							<div className='push-right'>
								<Avatar employeePhoto={employee.photo} />
							</div>
						</div>
						<div className='col-sm info-container'>
							<h2>
								{employee.first_name} {employee.last_name}
							</h2>
							<p className='detail'>
								<b>Email:</b> {employee.email}
							</p>
							<p className='detail'>
								<b>Phone:</b> {employee.phone}
							</p>
							<p className='detail'>
								<b>Address:</b> {employee.address}
							</p>
							<p className='detail'>
								<b>City:</b> {employee.city}
							</p>
							<p className='detail'>
								<b>State:</b> {employee.state}
							</p>
							<p className='detail'>
								<b>Zip:</b> {employee.zip}
							</p>
							<p className='detail'>
								<b>Notes:</b> {employee.notes}
							</p>
							<div className='button-container'>
								<Link to={`/edit/${employee.id}`}>
									<button className='primary-outlined'>EDIT</button>
								</Link>
							</div>
						</div>
					</div>
					{/* <div className='d-flex justify-content-center'>
						<div className='button-container'>
	
							<Link to={`/`}>
								<button className='secondary'>BACK</button>
							</Link>
						</div>
					</div> */}
				</div>
			) : null}
			{fetchStatus === 'failed' ? <h1>{error}</h1> : null}
		</>
	);
};
