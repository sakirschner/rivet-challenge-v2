import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../Avatar';
import { Modal } from '../shared/Modal';
import { ImagePreview } from './ImagePreview';

import './ImageUploadForm.css';

export const ImageUploadForm = ({ employeePhoto, handleImageUpdate }) => {
	const [showModal, setShowModal] = useState(false);

	const handleModal = () => {
		setShowModal(!showModal)
	}

	return (
		<>
			<div className='generic-container'>
				<Avatar employeePhoto={employeePhoto} />
			</div>
			<div className='edit-btn' onClick={handleModal}>
				<FontAwesomeIcon icon={faPen} className='pencil-icon' />
			</div>
			<Modal showModal={showModal} handleModal={handleModal}>
				<ImagePreview
					handleImageUpdate={handleImageUpdate}
					handleModal={handleModal}
					showModal={showModal}
				/>
			</Modal>
		</>
	);
};
