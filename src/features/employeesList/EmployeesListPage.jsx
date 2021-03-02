import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchEmployees, employeesSelectors } from './employeesSlice';
import { EmployeesList } from './EmployeesList';
import store from '../../app/store';

export const EmployeesListPage = () => {
	const employees = employeesSelectors.selectAll(store.getState());
	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	return (
		<div>
			{fetchStatus === 'loading' ? <h1>Loading...</h1> : null}
			{fetchStatus === 'succeeded' ? (
				<div>
					<EmployeesList employees={employees} />
				</div>
			) : null}
			{fetchStatus === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
