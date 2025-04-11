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
            'http://localhost:5000/' : 
            'http://localhost:5000/'
    },
    images: {
        domains: ['appstick.s3.ap-southeast-1.amazonaws.com','appstick-resources.s3.ap-southeast-1.amazonaws.com'], 
      },
    swcMinify: false
};
