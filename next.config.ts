import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
    
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'b2b-travel-trip-images.s3.eu-north-1.amazonaws.com',
      port: '',
      pathname: '/uploads/**'
    }]
  },
};

export default nextConfig;
