/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const {
  siteMetadataTitle,
  siteMetadataDescription,
  siteMetadataAuthor,
  siteUrl,
  microCmsEndpoints
} = require('./config')

require('dotenv').config({
  path: '.env'
})

module.exports = {
  siteMetadata: {
    title: siteMetadataTitle,
    description: siteMetadataDescription,
    author: siteMetadataAuthor,
    siteUrl
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true, // defaults to false
        allExtensions: true // defaults to false. isTSX:true requires allExtensions:true
      }
    },
    'gatsby-plugin-typegen',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'minimal-ui',
        icon: 'src/images/logo-life-and-com-gradient-vivid.png' // This path is relative to the root of the site.
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans JP']
        }
      }
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.GATSBY_X_API_KEY,
        serviceId: 'life-and-com',
        apis: microCmsEndpoints.map(({ endpoint, format }) => ({
          endpoint,
          format
        }))
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_API_KEY
      }
    }
  ]
}
