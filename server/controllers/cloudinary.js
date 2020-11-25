const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.upload = async (req, res) => {
 try {
  const { image } = req.body
  const result = await cloudinary.uploader.upload(image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  });

  res.set('Access-Control-Allow-Origin', '*')
  res.json({
    public_id: result.public_id,
    url: result.secure_url
  })
 } catch (error) {
   console.log('error: ', error)
   res.status(400).send(error)
 }
}

exports.remove = (req, res) => {
  const { public_id } = req.body

  cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) return res.json({ success: false, err})
    res.send('removed')
  })
}
