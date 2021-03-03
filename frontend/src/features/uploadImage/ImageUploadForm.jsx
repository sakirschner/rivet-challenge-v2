import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addImage } from './imageSlice';


export const ImageUploadForm = () => {
	const [fileInputState, setFileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState('');

	const dispatch = useDispatch();

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setFileInputState(e.target.value);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	const handleSubmitFile = (e) => {
		e.preventDefault();
        if (!previewSource) {
            return;
		}
		dispatch(addImage(previewSource))
    };

	return (
		<>
			{previewSource ? <img src={previewSource} alt='chosen' /> : null}
			<input
				name='image'
				type='file'
				value={fileInputState}
				onChange={handleFileInputChange}
			/>
			<button className='secondary' onClick={handleSubmitFile}>
				Submit
			</button>
		</>
	);
};
