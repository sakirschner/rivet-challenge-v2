import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees, employeesSelectors } from './employeesSlice';
import { EmployeesListItem } from '../../components/EmployeesListItem';
import store from '../../app/store'

export const EmployeesList = () => {
	const employees = employeesSelectors.selectAll(store.getState());	
	const status = useSelector((state) => state.employees.status);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [status, dispatch]);

	return (
		<div>
			{status === 'loading' ? <h1>Loading...</h1> : null}
			{status === 'succeeded'
				? employees.map((employee) => (
						<EmployeesListItem
							key={employee.id}
							employee={employee}
						/>
				  ))
				: null}
			{status === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
