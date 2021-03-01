import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	selectEmployeeById,
	fetchEmployeeById
} from '../employeesList/employeesSlice';

export const EditEmployeeForm = ({ match }) => {
	const { employeeId } = match.params;

	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();
  const history = useHistory();
  
  return <div>Form</div>
};
