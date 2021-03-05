import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../Avatar';
import { Modal } from '../shared/Modal';
import { ImagePreview } from './ImagePreview';

import './ImageUploadForm.css';

export const ImageUploadForm = ({employee, setEmployee}) => {
	const [showModal, setShowModal] = useState(false);

	const handleModal = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div className='generic-container'>
				<Avatar employee={employee} />
			</div>
			<div className='edit-btn' onClick={handleModal}>
				<FontAwesomeIcon icon={faPen} className='pencil-icon' />
			</div>
			<Modal showModal={showModal} onClickClose={handleModal}>
				<ImagePreview employee={employee} setEmployee={setEmployee} closeModal={handleModal} />
			</Modal>
		</>
	);
};
