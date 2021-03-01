import React, { useState } from 'react';

export const EmployeeForm = ({ initialValues, onSubmit }) => {
	const [employee, setEmployee] = useState(initialValues || {});
	// const [touchedValues, setTouchedValues] = useState({});
	// const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		setEmployee({ ...employee, [name]: value });
	};

	// const handleBlur = (event) => {
	// 	const target = event.target;
	// 	const name = target.name;
	// 	setTouchedValues({
	// 		...touchedValues,
	// 		[name]: true
	// 	});
	// 	const err = validate(employee);
	// 	setErrors({ ...errors, ...err });
	// };

	const handleSubmit = (event) => {
		event.preventDefault();
		// const err = validate(employee);
		// setErrors({ ...errors, ...err });
		onSubmit({ employee });
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='first_name'>First Name</label>
				<input
					type='text'
					name='first_name'
					value={employee.first_name}
					onChange={handleChange}
				/>
				<label htmlFor='last_name'>Last Name</label>
				<input
					type='text'
					name='last_name'
					value={employee.last_name}
					onChange={handleChange}
				/>
				<label htmlFor='phone'>Phone</label>
				<input
					type='text'
					name='phone'
					value={employee.phone}
					onChange={handleChange}
				/>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					name='email'
					value={employee.email}
					onChange={handleChange}
				/>
				<label htmlFor='address'>Address</label>
				<input
					type='text'
					name='address'
					value={employee.address}
					onChange={handleChange}
				/>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					name='city'
					value={employee.city}
					onChange={handleChange}
				/>
				<label htmlFor='state'>State</label>
				<input
					type='text'
					name='state'
					value={employee.state}
					onChange={handleChange}
				/>
				<label htmlFor='zip'>Zip</label>
				<input
					type='text'
					name='zip'
					value={employee.zip}
					onChange={handleChange}
				/>
				<label htmlFor='notes'>Notes</label>
				<input
					type='text'
					name='notes'
					value={employee.notes}
					onChange={handleChange}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
