import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addEmployee } from '../employeesSlice';
import { EmployeeForm } from '../../../components/forms/EmployeeForm';
import { Modal } from '../../../components/shared/Modal';

export const AddEmployeePage = () => {
	const [showModal, setShowModal] = useState(false);

	const addStatus = useSelector((state) => state.employees.addStatus);
	const error = useSelector((state) => state.employees.error);

	useEffect(() => {
		if (addStatus === 'loading') {
			setShowModal(true);
		}
	}, [addStatus]);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (employeeToAdd) => {
		await dispatch(addEmployee(employeeToAdd)).then(() => {});
	};

	const handleCancel = () => {
		history.push('/');
	};

	const handleModal = () => {
		setShowModal(!showModal);
		if (addStatus === 'succeeded') {
			handleCancel();
		}
	};

	return (
		<>
			<Modal showModal={showModal} handleModal={handleModal}>
				<div className='generic-container'>
					<div className='message'>
						{addStatus === 'loading' ? (
							<span>Saving...</span>
						) : null}
						{addStatus === 'failed' ? (
							<span id='error'>{error}</span>
						) : null}
					</div>
				</div>
				{addStatus === 'succeeded' ? (
					<>
						<div className='generic-container'>
							<div className='message'>
								<span id='success'>Employee Added!</span>
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
			/>
		</>
	);
};
