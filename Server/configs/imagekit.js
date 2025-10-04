import ImageKit from 'imagekit'

var imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_API,
    privateKey:process.env.IMAGEKIT_PRIVATE_API,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit