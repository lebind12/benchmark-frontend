module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/chzzkBase/:path*',
        destination: 'https://api.chzzk.naver.com/:path*',
      },
      {
        source: '/api/proxy/gameBase/:path*',
        destination: 'https://comm-api.game.naver.com/nng_main/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
    ],
  },
};
