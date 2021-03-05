import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { ImagePreview } from '../forms/ImagePreview';

import './Modal.css';

export const Modal = (props) => {
	const {
		showModal: [showModal, setShowModal]
	} = {
		showModal: useState(),
		...(props.state || {})
	};
	const {
		previewSource: [showPreviewSource, setPreviewSource]
	} = {
		previewSource: useState(),
		...(props.state || {})
	};
	const {
		showConfirmation: [showConfirmation, setShowConfirmation]
	} = {
		showConfirmation: useState(),
		...(props.state || {})
    };

	const handleModal = () => {
		setShowModal(!showModal);
		if (props.destination === 'ImageUploadForm') {
			setShowConfirmation(false)
			setPreviewSource('')
		}
	};

	return (
		<>
			<div className={showModal ? 'mask active' : 'mask'}></div>
			<div className='modal-control'>
				<button className='close' onClick={handleModal}>
					<FontAwesomeIcon icon={faTimesCircle} />
				</button>
				{props.destination === 'ImageUploadForm' ? (
					<ImagePreview {...props} />
				) : null}
			</div>
		</>
	);
};
