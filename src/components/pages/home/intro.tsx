import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
// @ts-expect-error
import Fade from 'react-reveal/Fade'
import LazyLoad from 'react-lazyload'

import { device } from '../../../utils/device'

export const Intro: React.FC = () => (
  <StaticQuery<GatsbyTypes.IntroQuery>
    query={graphql`
      query Intro {
        allMicrocmsIntro {
          edges {
            node {
              id
              body
              heading
              image {
                url
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <StyledSection id="intro">
        <StyledIntroImageWrapper>
          <LazyLoad height={800}>
            <StyledIntroImage
              src={data.allMicrocmsIntro.edges[0].node.image.url}
              alt=""
              style={{
                position: 'absolute',
                width: '100%'
              }}
            />
          </LazyLoad>
        </StyledIntroImageWrapper>
        <StyledDivGradient>
          <StyledArticle className="ts-inner">
            <Fade bottom duration={400} distance="36px">
              <StyledArticleInner>
                <StyledArticleHeading>
                  {data.allMicrocmsIntro.edges[0].node.heading}
                </StyledArticleHeading>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.allMicrocmsIntro.edges[0].node.body
                  }}
                />
              </StyledArticleInner>
            </Fade>
          </StyledArticle>
        </StyledDivGradient>
      </StyledSection>
    )}
  />
)

const StyledSection = styled.section`
  height: 120vh;
  overflow-y: hidden;
  position: relative;

  @media ${device.xs} {
    font-size: 92%;
  }
`

const StyledIntroImageWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;
`

const StyledIntroImage = styled.img`
  height: 100%;
  left: 0;
  object-fit: cover;
  object-position: center center;
  position: absolute;
  top: 0;
  width: 100%;
`

const StyledDivGradient = styled.div`
  background-image: linear-gradient(#fff, rgba(255, 255, 255, 0.45));
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 240px 0;
  position: absolute;
  width: 100%;
`

const StyledArticle = styled.article`
  text-align: center;
`

const StyledArticleInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 680px;
`

const StyledArticleHeading = styled.h2`
  line-height: 1.4;
  margin-bottom: 1.2em;
`
