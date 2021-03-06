import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Avatar } from '../Avatar';
import { Modal } from '../shared/Modal';
import { ImagePreview } from './ImagePreview';
import { resetError } from '../../features/uploadImage/imageSlice';

import './ImageUploadForm.css';

export const ImageUploadForm = ({ employeePhoto, handleImageUpdate }) => {
	const [showModal, setShowModal] = useState(false);
	const [fileError, setFileError] = useState(false);
	const [previewSource, setPreviewSource] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);

	const dispatch = useDispatch();

	const handleModal = () => {
		setShowModal(!showModal);
		setPreviewSource('');
		setFileError(false);
		setShowConfirmation(false);
		dispatch(resetError());
	};

	return (
		<>
			<div className='generic-container'>
				<Avatar employeePhoto={employeePhoto} />
			</div>
			<div className='edit-btn' onClick={handleModal}>
				<FontAwesomeIcon icon={faPen} className='pencil-icon' />
			</div>
			<Modal showModal={showModal} onClickClose={handleModal}>
				<ImagePreview
					handleImageUpdate={handleImageUpdate}
					closeModal={handleModal}
					fileError={fileError}
					setFileError={setFileError}
					previewSource={previewSource}
					setPreviewSource={setPreviewSource}
					showConfirmation={showConfirmation}
					setShowConfirmation={setShowConfirmation}
				/>
			</Modal>
		</>
	);
};
