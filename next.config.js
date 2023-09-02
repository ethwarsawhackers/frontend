/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
})

const nextConfig = {
    ...withPWA({
        dest: 'public',
        output: 'export',
        register: true,
        skipWaiting: true,
    })
}
  
module.exports = nextConfig
