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
				<div className='combo'>
					<div className='col-6'>
						<label htmlFor='first_name' className='label-control'>
							First Name
						</label>
						<input
							className='input-control'
							type='text'
							name='first_name'
							value={employee.first_name}
							onChange={handleChange}
						/>
					</div>
					<div className='col-6'>
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
				<div className='combo'>
					<div className='col-6'>
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
					<div className='col-6'>
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
				<div className='combo'>
					<div className='col-6'>
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
					<div className='col-6'>
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
				<div className='combo'>
					<div className='col-6'>
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
					<div className='col-6'>
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
				<div className='col-12'>
					<label htmlFor='notes' className='label-control'>
						Notes
					</label>
					<input
						className='input-control'
						type='text-area'
						name='notes'
						value={employee.notes || ''}
						onChange={handleChange}
					/>
				</div>
			</form>
			<div className='combo'>
				<div className='col-sm-6'>
					{imageStatus === 'loading' ? (
						<button disabled>Hang Tight...</button>
					) : (
						<button onClick={handleSubmitForm} className='primary'>
							SAVE
						</button>
					)}
				</div>
				<div className='col-sm-6'>
					<button onClick={handleFormCancel} className='secondary'>
						CANCEL
					</button>
				</div>
			</div>
		</div>
	);
};
