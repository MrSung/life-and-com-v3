import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../../../styles/layout.css'

import { Header } from './header'
import { Footer } from './footer'
import {
  scrollspyItems,
  externalLinks,
  socialLinks,
  logoItems
} from '../../../data/layout'

export const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery<GatsbyTypes.ExternalLinksQueryQuery>(graphql`
    query ExternalLinksQuery {
      allMicrocmsExternalLinks {
        edges {
          node {
            facebookLinkHP
            facebookLinkLC
            instagramLinkHP
            instagramLinkLC
            recruitLink
          }
        }
      }
    }
  `)
  const {
    recruitLink,
    facebookLinkLC,
    instagramLinkLC
  } = data.allMicrocmsExternalLinks.edges[0].node
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <>
      <Header
        pathname={pathname}
        scrollspyItems={scrollspyItems}
        externalLinks={externalLinks.map((obj) => ({
          ...obj,
          url: recruitLink
        }))}
        socialLinks={socialLinks.map((obj) => ({
          ...obj,
          url: obj.name === 'facebook' ? facebookLinkLC : instagramLinkLC
        }))}
      />
      {children}
      <Footer logoItems={logoItems} />
    </>
  )
}
