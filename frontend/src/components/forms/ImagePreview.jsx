import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addImage } from '../../features/uploadImage/imageSlice';

import './ImagePreview.css'

export const ImagePreview = (props) => {
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
	const {
		showConfirmation: [showConfirmation, setShowConfirmation]
	} = {
		showConfirmation: useState(),
		...(props.state || {})
    };
    const {
		employee: [employee, setEmployee]
	} = {
		employee: useState(),
		...(props.state || {})
	};
	const {
		showModal: [showModoal, setShowModal]
	} = {
		showModal: useState(),
		...(props.state || {})
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
		e.target.value = '';
	};

	const previewFile = (file) => {
		console.log('here');
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
		setShowModal(false);
		const result = await dispatch(addImage(previewSource)).then(
			unwrapResult
		);
		setEmployee({ ...employee, photo: result.url });
		
	};

	return (
		<>
			{previewSource ? (
				<div className='generic-container'>
					<div className='preview-mask'>
						<img src={previewSource} alt='chosen photo' />
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
