import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
// @ts-expect-error
import LineFriendAdd from 'react-line-social/dist/friend'
import { nanoid } from 'nanoid/non-secure'
import { device } from '../../../../utils/device'
import { iconFacebook, iconInstagram } from '../../../../data/contact'
import { GoogleMap } from './google-map'

export const Contact: React.FC = () => (
  <StaticQuery<GatsbyTypes.ContactQuery>
    query={graphql`
      query Contact {
        allMicrocmsContact {
          edges {
            node {
              title
              subtitle
              map
            }
          }
        }
        allMicrocmsContactContent {
          edges {
            node {
              contactTitle
              contactSubtitle
              contactCaption
              contactList {
                tableHead
                tableData
              }
            }
          }
        }
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
    `}
    render={(data) => (
      <StyledSection className="ts-inner ts-bg-gray" id="contact">
        <div className="ts-block">
          <h2 className="ts-block-heading">
            {data.allMicrocmsContact.edges[0].node.title}
            <span>{data.allMicrocmsContact.edges[0].node.subtitle}</span>
          </h2>
          <StyledContent>
            <StyledContentTexts>
              {data.allMicrocmsContactContent.edges.map((edge) => (
                <StyledContentText key={nanoid()}>
                  <StyledContentTextHeading>
                    {edge.node.contactTitle}
                  </StyledContentTextHeading>
                  {edge.node.contactSubtitle && (
                    <small>{edge.node.contactSubtitle}</small>
                  )}
                  <StyledContentTextBody>
                    {edge.node.contactList && (
                      <dl>
                        {edge.node.contactList.map((item) => (
                          <Fragment key={nanoid()}>
                            <dt>{item.tableHead}</dt>
                            <dd
                              className={
                                ['TEL', 'LINE@', 'SNS'].includes(item.tableHead)
                                  ? 'snsWrap'
                                  : ''
                              }
                            >
                              {item.tableHead === 'TEL' && (
                                <a href={`tel:${item.tableData}`}>
                                  {item.tableData}
                                </a>
                              )}
                              {item.tableHead === 'LINE@' && (
                                <>
                                  <span>{item.tableData}</span>
                                  <LineFriendAdd
                                    lineid={item.tableData}
                                    locale="ja"
                                  />
                                </>
                              )}
                              {item.tableHead === 'SNS' && (
                                <>
                                  <a
                                    href={
                                      item.tableData === 'LC'
                                        ? data.allMicrocmsExternalLinks.edges[0]
                                          .node.facebookLinkLC
                                        : data.allMicrocmsExternalLinks.edges[0]
                                          .node.facebookLinkHP
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      marginRight: '0.6em',
                                      padding: '0.25em'
                                    }}
                                  >
                                    <img
                                      src={iconFacebook}
                                      alt=""
                                      width="18"
                                      height="18"
                                      style={{
                                        marginBottom: 0
                                      }}
                                    />
                                  </a>
                                  <a
                                    href={
                                      item.tableData === 'LC'
                                        ? data.allMicrocmsExternalLinks.edges[0]
                                          .node.instagramLinkLC
                                        : data.allMicrocmsExternalLinks.edges[0]
                                          .node.instagramLinkHP
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      padding: '0.25em'
                                    }}
                                  >
                                    <img
                                      src={iconInstagram}
                                      alt=""
                                      width="18"
                                      height="18"
                                      style={{
                                        marginBottom: 0
                                      }}
                                    />
                                  </a>
                                </>
                              )}
                              {['TEL', 'LINE@', 'SNS'].includes(
                                item.tableHead
                              ) || item.tableData}
                            </dd>
                          </Fragment>
                        ))}
                      </dl>
                    )}
                    {edge.node.contactCaption && (
                      <small>{edge.node.contactCaption}</small>
                    )}
                  </StyledContentTextBody>
                </StyledContentText>
              ))}
            </StyledContentTexts>
            <StyledContentMap>
              <GoogleMap src={data.allMicrocmsContact.edges[0].node.map} />
            </StyledContentMap>
          </StyledContent>
        </div>
      </StyledSection>
    )}
  />
)

const StyledSection = styled.section`
  .ts-block {
    padding-bottom: 60px;

    @media ${device.sm} {
      padding-bottom: 100px;
    }
  }
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    flex-direction: row;
  }
`

const StyledContentTexts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;

  @media ${device.md} {
    display: block;
    margin-bottom: 0;
    margin-right: 35px;
    width: 270px;
  }
`

const StyledContentText = styled.section`
  width: 50%;

  @media ${device.xs} {
    width: 100%;
  }

  @media ${device.md} {
    width: 100%;
  }

  & + & {
    @media ${device.xs} {
      margin-top: 24px;
    }

    @media ${device.md} {
      margin-top: 35px;
    }
  }
`

const StyledContentTextHeading = styled.h3`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 8px;
`

const StyledContentTextBody = styled.div`
  font-size: 15px;
  margin-top: 1em;

  dl {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
  }

  dt {
    width: 100px;
  }

  dd {
    margin-bottom: 0;
    width: calc(100% - 100px);
  }

  dt,
  dd {
    margin-bottom: 4px;
  }

  .snsWrap {
    align-items: center;
    display: flex;
  }

  .snsWrap > a {
    align-items: center;
    display: flex;
    transition: opacity 0.1s ease-in-out;
  }

  .snsWrap > a:hover {
    opacity: 0.8;
  }

  .snsWrap > span {
    margin-right: 0.75em;
  }

  .snsWrap > iframe {
    margin-bottom: 0;
  }
`

const StyledContentMap = styled.div`
  flex-grow: 1;
  height: 240px;
  position: relative;

  @media ${device.md} {
    height: inherit;
  }

  iframe {
    margin-bottom: 0;
  }
`
