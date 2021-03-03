const express = require('express');
const app = express();
const { cloudinary } = require('./utils/cloudinary');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 3001;

app.get('/api/images', async (req, res) => {
	const { resources } = await cloudinary.search
		.expression('folder:rivet')
		.sort_by('public_id', 'desc')
		.max_results(30)
        .execute();
        const publicIds = resources.map( file => file.public_id )
        res.send(publicIds);
});

app.post('/api/upload', async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: 'rivet'
		});
		res.send(uploadedResponse)
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: 'Something went wrong' });
	}
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
