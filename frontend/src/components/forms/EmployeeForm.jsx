import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ImageUploadForm } from './ImageUploadForm';

import './EmployeeForm.css';

export const EmployeeForm = ({
	employeeFromStore,
	onFormSubmit,
	onFormCancel
}) => {
	const [employee, setEmployee] = useState(employeeFromStore || {});
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [onBlur, setOnBlur] = useState(false);

	useEffect(() => {
		setEmployee(employeeFromStore || {});
	}, [employeeFromStore]);

	const imageStatus = useSelector((state) => state.image.status);

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		setEmployee({ ...employee, [name]: value });
	};

	const handleBlur = (e) => {
		const target = e.target;
		const name = target.name;
		setTouched({ ...touched, [name]: true });
		setErrors({ ...errors });
	};

	const handleImageUpdate = (url) => {
		setEmployee({ ...employee, photo: url });
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		onFormSubmit({ employee });
	};

	const handleFormCancel = (e) => {
		e.preventDefault();
		onFormCancel();
	};

	return (
		<div className='form-container'>
			<ImageUploadForm
				employeePhoto={employee.photo}
				handleImageUpdate={handleImageUpdate}
			/>
			<form>
				<div className='row'>
					<div className='col-sm'>
						<label htmlFor='first_name' className='label-control'>
							First Name
						</label>
						<input
							className='input-control'
							type='text'
							name='first_name'
							value={employee.first_name}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					<div className='col-sm'>
						<label htmlFor='last_name' className='label-control'>
							Last Name
						</label>
						<input
							className='input-control'
							type='text'
							name='last_name'
							value={employee.last_name}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm'>
						<label htmlFor='phone' className='label-control'>
							Phone
						</label>
						<input
							className='input-control'
							type='text'
							name='phone'
							value={employee.phone}
							onChange={handleChange}
						/>
					</div>
					<div className='col-sm'>
						<label htmlFor='email' className='label-control'>
							Email
						</label>
						<input
							className='input-control'
							type='email'
							name='email'
							value={employee.email}
							onChange={handleChange}
							required
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm'>
						<label htmlFor='address' className='label-control'>
							Address
						</label>
						<input
							className='input-control'
							type='text'
							name='address'
							value={employee.address}
							onChange={handleChange}
						/>
					</div>
					<div className='col-sm'>
						<label htmlFor='city' className='label-control'>
							City
						</label>
						<input
							className='input-control'
							type='text'
							name='city'
							value={employee.city}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm'>
						<label htmlFor='state' className='label-control'>
							State
						</label>
						<input
							className='input-control'
							type='text'
							name='state'
							value={employee.state}
							onChange={handleChange}
						/>
					</div>
					<div className='col-sm'>
						<label htmlFor='zip' className='label-control'>
							Zip
						</label>
						<input
							className='input-control'
							type='text'
							name='zip'
							value={employee.zip}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<label htmlFor='notes' className='label-control'>
							Notes
						</label>
						<textarea
							className='input-control'
							type='text-area'
							name='notes'
							value={employee.notes || ''}
							onChange={handleChange}
						/>
					</div>
				</div>
			</form>
			<div className='row combo'>
				<div className='col-sm'>
					{imageStatus === 'loading' ? (
						<button disabled>Hang Tight...</button>
					) : (
						<button onClick={handleSubmitForm} className='primary'>
							SAVE
						</button>
					)}
				</div>
				<div className='col-sm'>
					<button onClick={handleFormCancel} className='secondary'>
						CANCEL
					</button>
				</div>
			</div>
		</div>
	);
};
