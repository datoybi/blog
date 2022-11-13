module.exports = {
  siteMetadata: {
    title: `.log('blog')`,
    description: `의미있는 기록을 위한 개발 블로그 입니다.`,
    author: `Dasom Yun`,
    siteUrl: 'https://datoybi.com',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contents`,
        path: `${__dirname}/contents`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          quality: 100,
          placeholder: 'blurred',
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 768,
              quality: 100,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://www.datoybi.com/',
        stripQueryString: true,
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `som.dev.log`,
        short_name: `som.dev.log`,
        start_url: `./index.html`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `standalone`,
        icon: 'src/images/icons/favicon.png',
        icons: [
          {
            src: './src/images/icons/icon-57x57.png',
            sizes: '57x57',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-60x60.png',
            sizes: '60x60',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-76x76.png',
            sizes: '76x76',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-114x114.png',
            sizes: '114x114',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-120x120.png',
            sizes: '120x120',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: './src/images/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: './src/images/icons/favicon.png',
            sizes: '64x64',
            type: 'image/icon',
            purpose: 'any maskable',
          },
        ],
      },
    },
  ],
};
