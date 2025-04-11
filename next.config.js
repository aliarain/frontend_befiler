const withPWA = require('next-pwa');
module.exports = {
    pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV === 'development',
    },
    reactStrictMode: false,
    trailingSlash: true,
    env: {
        BACKEND_URL: process.env.NODE_ENV === 'development' ?
            'http://192.168.0.185:5000/' :
            'https://backend.taxstick.appstick.com.bd/',
    },
    images: {
        domains: ['appstick.s3.ap-southeast-1.amazonaws.com','appstick-resources.s3.ap-southeast-1.amazonaws.com'], 
      },
    swcMinify: false
};
