/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Apply these headers to all routes in your application
          source: "/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "http://localhost:4000", // Allow only localhost:4000
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "X-Requested-With,Content-Type,Authorization", // Allowed headers
            },
            {
              key: "Access-Control-Allow-Credentials",
              value: "true", // Allow cookies to be sent with requests
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;