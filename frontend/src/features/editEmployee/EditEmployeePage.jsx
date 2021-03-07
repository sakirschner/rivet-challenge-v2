import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
	updateEmployee,
	fetchEmployees,
	selectEmployeeById
} from '../employeesList/employeesSlice';
import { Modal } from '../../components/shared/Modal';
import { EmployeeForm } from '../../components/forms/EmployeeForm';

export const EditEmployeePage = ({ match }) => {
	const { employeeId } = match.params;

	const [showModal, setShowModal] = useState(false);

	const employeeFromStore = useSelector((state) =>
		selectEmployeeById(state, employeeId)
	);
	const fetchStatus = useSelector((state) => state.employees.fetchStatus);
	const updateStatus = useSelector((state) => state.employees.updateStatus);
	const error = useSelector((state) => state.employees.error);

	const dispatch = useDispatch();

	useEffect(() => {
		if (fetchStatus === 'idle') {
			dispatch(fetchEmployees());
		}
	}, [fetchStatus, dispatch]);

	useEffect(() => {
		if (updateStatus === 'loading') {
			setShowModal(true);
		}
	}, [updateStatus]);

	const history = useHistory();

	const handleSubmit = async (employee) => {
		await dispatch(updateEmployee(employee)).then(() => {});
	};

	const handleCancel = () => {
		history.push(`/profile/${employeeId}`);
	};

	const handleModal = () => {
		setShowModal(!showModal);
		if (updateStatus === 'succeeded') {
			handleCancel();
		}
	};

	return (
		<>
			<Modal showModal={showModal} handleModal={handleModal}>
				<div className='generic-container'>
					<div className='message'>
						{updateStatus === 'loading' ? (
							<span>Saving...</span>
						) : null}
						{updateStatus === 'failed' ? (
							<span id='error'>{error}</span>
						) : null}
					</div>
				</div>

				{updateStatus === 'succeeded' ? (
					<>
						<div className='generic-container'>
							<div className='message'>
								<span>Employee Saved!</span>
							</div>
						</div>
						<div className='generic-container'>
							<button className='primary' onClick={handleModal}>
								OK
							</button>
						</div>
					</>
				) : null}
			</Modal>
			<EmployeeForm
				onFormSubmit={handleSubmit}
				onFormCancel={handleCancel}
				employeeFromStore={employeeFromStore}
			/>
		</>
	);
};
