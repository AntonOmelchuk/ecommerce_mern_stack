const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.upload = async (req, res) => {
  const { image } = req.body
  const result = await cloudinary.uploader.upload(iamge, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  });

  res.json({
    public_id: result.public_id,
    url: result.secure.url
  })
}

exports.remove = (req, res) => {
  const { public_id } = req.body

  cloudinary.uploader.destroy(public_id, (err, result) => {
    if (err) return res.json({ success: false, err})
    res.send('removed')
  })
}
