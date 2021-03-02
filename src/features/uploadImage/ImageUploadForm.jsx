import React, { useState } from 'react';

export const ImageUploadForm = () => {
	const [fileInputState, setFileInputState] = useState('');
	const [selectedFile, setSelectedFile] = useState('');
	const [previewSource, setPreviewSource] = useState('');

	const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};
	return (
		<>
			{previewSource && (<img src={previewSource} alt='chosen' />)}
			<input
				name='image'
				type='file'
				value={fileInputState}
				onChange={handleFileInputChange}
			/>
		</>
	);
};
