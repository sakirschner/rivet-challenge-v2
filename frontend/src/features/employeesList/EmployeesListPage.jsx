import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees, selectAllEmployees } from './employeesSlice';
import { EmployeesList } from './EmployeesList';
import { ScrollToTop } from '../../components/ScrollToTop';

import './EmployeesListPage.css'

export const EmployeesListPage = () => {
	const employees = useSelector(selectAllEmployees);
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
		<div className='message-container'>
			{fetchStatus === 'loading' ? <p>Loading...</p> : null}
			{fetchStatus === 'failed' ? <p>{error}</p> : null}
		</div>
			{fetchStatus === 'succeeded' ? (
				<>
					<ul>
						<EmployeesList employees={employees} />
					</ul>
					<ScrollToTop />
				</>
			) : null}
		</>
	);
};
