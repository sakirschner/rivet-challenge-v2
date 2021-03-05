import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addImage } from '../../features/uploadImage/imageSlice';

import './ImagePreview.css';

export const ImagePreview = ({ employee, setEmployee, closeModal }) => {
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [fileInputState, setFileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState('');

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
		if (!previewSource) {
			return;
		}
		const result = await dispatch(addImage(previewSource)).then(
			unwrapResult
		);
		closeModal();
		setEmployee({ ...employee, photo: result.url });
	};

	return (
		<>
			{previewSource ? (
				<div className='generic-container'>
					<div className='preview-mask'>
						<img src={previewSource} alt='chosen' />
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
		</>
	);
};
