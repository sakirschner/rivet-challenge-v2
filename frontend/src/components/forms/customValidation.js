export const customValidation = (employee, setErrors) => {
	let errorsFound = [];
	let formIsValid = true;

	//check for empty fields
	Object.entries(employee).forEach((prop) => {
		if (prop[0] !== 'notes' && prop[1] === '') {
			formIsValid = false;
			errorsFound.push(([prop[0]] = `${prop[0]} is required`));
		}
	});

	//check for empty field in an incomplete employee object
	if (Object.keys(employee).length < 8) {
		formIsValid = false;
		errorsFound.push('All fields but notes and photo are required');
	}

	// check for empty field with notes entered in an incomplete employee object
	if (Object.keys(employee).length >= 8) {
		const notesAdded = Object.entries(employee).find((prop) => {
			return prop[0] === 'notes';
		});

		if (notesAdded !== undefined) {
			if (
				(notesAdded[1] !== '' && Object.keys(employee).length === 8) ||
				(notesAdded[1] !== '' &&
					Object.keys(employee).length === 9 &&
					employee.photo)
			) {
				formIsValid = false;
				errorsFound.push('All fields but notes and photo are required');
			}
		}
	}

	// check for a valid email
	if (typeof employee.email !== 'undefined') {
		const emailPattern = /^[^@\s]+@[^@\s.]+\.[^@.\s]+$/;

		if (!employee.email.match(emailPattern)) {
			formIsValid = false;
			errorsFound.push('Email is not valid');
		}
	}

	setErrors(errorsFound);
	return formIsValid;
};
