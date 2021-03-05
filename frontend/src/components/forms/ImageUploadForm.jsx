import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../Avatar';
import { Modal } from '../shared/Modal';

import './ImageUploadForm.css';

export const ImageUploadForm = (props) => {
	const employee = props.state.employee[0];

	const {
		showModal: [showModal, setShowModal]
	} = {
		showModal: useState(),
		...(props.state || {})
	};

	const handleModal = (e) => {
		e.preventDefault();
		setShowModal(!showModal);
		// if (!showModal) {
		// 	setPreviewSource('');
		// 	setShowConfirmation(false);
		// }
	};

	return (
		<>
			<div className='generic-container'>
				<Avatar employee={employee} />
			</div>
			<div className='edit-btn' onClick={handleModal}>
				<FontAwesomeIcon icon={faPen} className='pencil-icon' />
			</div>
			<div className={showModal ? 'mask active' : 'mask'}></div>
			<Modal {...props} destination='ImageUploadForm' />
		</>
	);
};
