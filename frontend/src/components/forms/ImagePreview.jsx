import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addImage } from '../../features/uploadImage/imageSlice';

import './ImagePreview.css';

export const ImagePreview = ({
	handleImageUpdate,
	closeModal,
	fileError,
	setFileError,
	previewSource,
	setPreviewSource,
	showConfirmation,
	setShowConfirmation
}) => {
	const [fileInputState, setFileInputState] = useState('');

	const imageError = useSelector((state) => state.image.error);
	const imageStatus = useSelector((state) => state.image.status);

	const clickUploadImage = (e) => {
		e.preventDefault();
		document.getElementById('imageUpload').click();
	};
	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
		const fileSize = file.size / 1024 / 1024;
		if (acceptedImageTypes.includes(file['type']) && fileSize < 10) {
			setFileError(false);
			previewFile(file);
			setFileInputState(e.target.value);
		} else {
			setFileError(true);
		}
	};

	const resetValue = (e) => {
		e.target.value = '';
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
		setShowConfirmation(true);
	};

	const dispatch = useDispatch();

	const handleSubmitImage = async (e) => {
		e.preventDefault();
		const result = await dispatch(addImage(previewSource)).then(
			unwrapResult
		);
		handleImageUpdate(result.url);
		closeModal();
	};

	return (
		<>
			<div className='generic-container'>
				{previewSource ? (
					<div className='preview-mask'>
						<img src={previewSource} alt='chosen' />
					</div>
				) : null}
			</div>
			<div className='generic-container message'>
				{imageStatus === 'failed' ? <span>{imageError}</span> : null}
				{fileError ? (
					<span>File must be an image less than 10mb</span>
				) : null}
			</div>

			<div className='generic-container'>
				{imageStatus === 'loading' ? (
					<button disabled>
						HANG TIGHT...
					</button>
				) : (
					<button className='primary' onClick={clickUploadImage}>
						UPLOAD IMAGE
					</button>
				)}
				<input
					name='image'
					type='file'
					id='imageUpload'
					value={fileInputState}
					onChange={handleFileInputChange}
					onClick={resetValue}
					className='hidden-input'
				/>
				{showConfirmation && imageStatus !== 'loading' ? (
					<button className='secondary' onClick={handleSubmitImage}>
						SUBMIT
					</button>
				) : null}
			</div>
		</>
	);
};
