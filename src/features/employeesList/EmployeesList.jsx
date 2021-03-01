import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees, selectAllEmployees } from './employeesSlice';
import { EmployeesListItem } from '../../components/EmployeesListItem';

export const EmployeesList = () => {
	const employees = useSelector(selectAllEmployees);	
	const employeesStatus = useSelector((state) => state.employees.employeesStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (employeesStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [employeesStatus, dispatch]);

	return (
		<div>
			{employeesStatus === 'loading' ? <h1>Loading...</h1> : null}
			{employeesStatus === 'succeeded'
				? employees.map((employee) => (
						<EmployeesListItem
							key={employee.id}
							employee={employee}
						/>
				  ))
				: null}
			{employeesStatus === 'failed' ? <h1>{error}</h1> : null}
		</div>
	);
};
