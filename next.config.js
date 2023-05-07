/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'zh-CN',
    domains: [
      {
        domain: 'qas.plumbiu.club',
        defaultLocale: 'zh-CN'
      },
      {
        domain: 'en_qas.plumbiu.club',
        defaultLocale: 'en-US'
      }
    ]
  }
}

module.exports = nextConfig
