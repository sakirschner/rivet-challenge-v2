import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addImage, resetError } from '../../features/image/imageSlice';

import './ImagePreview.css';

export const ImagePreview = ({ handleImageUpdate, showModal, handleModal }) => {
	const [fileInputState, setFileInputState] = useState('');
	const [fileError, setFileError] = useState(false);
	const [previewSource, setPreviewSource] = useState('');
	const [showConfirmation, setShowConfirmation] = useState(false);

	const imageError = useSelector((state) => state.image.error);
	const imageStatus = useSelector((state) => state.image.status);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!showModal) {
			setFileError('');
			setPreviewSource('');
			setShowConfirmation('');
			if (imageError) {
				dispatch(resetError());
			}
		}
	}, [showModal, dispatch, imageError]);

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

	const handleSubmitImage = async (e) => {
		e.preventDefault();
		const result = await dispatch(addImage(previewSource)).then(
			unwrapResult
		);
		handleImageUpdate(result.url);
		handleModal();
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
				{imageStatus === 'failed' ? (
					<span id='error'>{imageError}</span>
				) : null}
				{fileError ? (
					<span id='error'>File must be an image less than 10mb</span>
				) : null}
			</div>

			<div className='generic-container'>
				{imageStatus === 'loading' ? (
					<button disabled>HANG TIGHT...</button>
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
