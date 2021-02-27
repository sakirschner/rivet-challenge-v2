import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchEmployees } from './employeesSlice';

const EmployeesList = () => {
	const dispatch = useDispatch();
	const employeesStatus = useSelector((state) => state.employees.status);

	useEffect(() => {
		if (employeesStatus === 'idle') {
			dispatch(fetchEmployees());
		}
    }, [employeesStatus, dispatch]);
    
    return <div>Employees List</div>
};

export default EmployeesList;
