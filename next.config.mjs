/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true, // 데이터 패칭 로그로 출력하기
    },
  },
};

export default nextConfig;
