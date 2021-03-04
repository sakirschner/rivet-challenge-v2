import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { addImage } from '../../features/uploadImage/imageSlice';
import { Avatar } from '../Avatar';

import './ImageUploadForm.css';

export const ImageUploadForm = (props) => {
	const {
		employee: [employee, setEmployee]
	} = {
		employee: useState(),
		...(props.state || {})
	};
	const {
		fileInputState: [fileInputState, setFileInputState]
	} = {
		fileInputState: useState(),
		...(props.state || {})
	};
	const {
		previewSource: [previewSource, setPreviewSource]
	} = {
		previewSource: useState(),
		...(props.state || {})
	};

	const [showModal, setShowModal] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const imageStatus = useSelector((state) => state.image.status);

	const dispatch = useDispatch();

	const handleModal = (e) => {
		e.preventDefault();
		setShowModal(!showModal);
		if (!showModal) {
			setPreviewSource('');
			setShowConfirmation(false);
		}
	};

	const clickUploadImage = (e) => {
		e.preventDefault();
		document.getElementById('imageUpload').click();
	};

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setFileInputState(e.target.value);
	};

	const resetValue = (e) => {
		e.target.value = ''

	}

	const previewFile = (file) => {
		console.log('here')
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
		setShowConfirmation(true);
	};

	const handleSubmitImage = async (e) => {
		e.preventDefault();
		if (!previewSource) {
			return;
		}
		const result = await dispatch(addImage(previewSource)).then(
			unwrapResult
		);
		setEmployee({ ...employee, photo: result.url });
		if (imageStatus === 'succeeded') {
			setShowModal(!showModal)
		}
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
			<div className='image-modal'>
				<button className='close' onClick={handleModal}>
					<FontAwesomeIcon icon={faTimesCircle} />
				</button>
				{previewSource ? (
					<div className='generic-container'>
						<div className='preview-mask'>
							<img
								src={previewSource}
								alt='chosen photo'
								className='preview'
							/>
						</div>
					</div>
				) : null}
				<div className='generic-container'>
				<button className='primary' onClick={clickUploadImage}>
					UPLOAD IMAGE
				</button>
				<input
					name='image'
					type='file'
					id='imageUpload'
					value={fileInputState}
					onChange={handleFileInputChange}
					onClick={resetValue}
					className='generic-input'
				/>
				{showConfirmation ? (
					<button className='secondary' onClick={handleSubmitImage}>
						SUBMIT
					</button>
				) : null}
				</div>
			</div>
		</>
	);
};
