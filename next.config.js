/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/socket.io',
                destination: 'https://labsnippets.onrender.com/socket.io'
            }
        ]
    }
}

module.exports = nextConfig
