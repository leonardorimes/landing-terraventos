/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações básicas
  compress: true,

  // Headers para vídeos
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
