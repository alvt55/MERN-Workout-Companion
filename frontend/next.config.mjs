/** @type {import('next').NextConfig} */
const nextConfig = {
 
    output: 'export', // Outputs a Single-Page Application (SPA).
    distDir: './build', // Changes the build output directory to `./dist`.

    experimental: {
      optimizePackageImports: ["@chakra-ui/react"],
    }
  }

  // next.config.js

  

   
  export default nextConfig