import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees, selectAllEmployees } from './employeesSlice';
import { EmployeesList } from './EmployeesList';

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
		<div>
			{fetchStatus === 'loading' ? <h1>Loading...</h1> : null}
			{fetchStatus === 'succeeded' ? (
				<ul>
					<EmployeesList employees={employees} />
				</ul>
			) : null}
			{fetchStatus === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
