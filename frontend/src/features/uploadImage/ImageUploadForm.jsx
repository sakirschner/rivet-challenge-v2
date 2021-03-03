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

	const handleSubmitFile = (e) => {
		e.preventDefault();
        if (!previewSource) {
            return;
        }
        uploadImage(previewSource);
    };
    
    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (err) {
            console.error(err)
        }
    }

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
