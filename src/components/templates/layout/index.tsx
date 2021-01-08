import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import '../../../styles/layout.css'
import { Header } from './header'
import { Footer } from './footer'
import {
  scrollspyItems,
  externalLinks,
  socialLinks,
  logoItems
} from '../../../data/layout'

export enum LayoutMode {
  Default = 'default',
  NotFound = 'notFound'
}

export interface ILayoutProps {
  mode: LayoutMode
}

export const Layout: React.FC<ILayoutProps> = ({ children, mode = LayoutMode.Default }) => {
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
      {mode === LayoutMode.Default && (
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
      )}
      <Inner>
        {children}
        <Footer logoItems={logoItems} />
      </Inner>
    </>
  )
}

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
