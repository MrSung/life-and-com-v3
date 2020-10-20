/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Fade } from 'react-awesome-reveal'
import LazyLoad from 'react-lazyload'
import { device } from '../../../utils/device'

export const Intro: React.FC = () => (
  <StaticQuery<GatsbyTypes.IntroQueryQuery>
    query={graphql`
      query IntroQuery {
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
        <StyledDivImageWrapper>
          <LazyLoad height={800}>
            <img
              src={data.allMicrocmsIntro.edges[0].node.image.url}
              alt=""
              style={{
                position: 'absolute',
                width: '100%'
              }}
            />
          </LazyLoad>
        </StyledDivImageWrapper>
        <StyledDivGradient>
          <StyledArticle className="ts-inner">
            <Fade direction="up" duration={400} triggerOnce>
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

const StyledDivImageWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: absolute;
  width: 100%;

  & > img {
    height: 100%;
    left: 0;
    object-fit: cover;
    object-position: center center;
    position: absolute;
    top: 0;
    width: 100%;
  }
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
