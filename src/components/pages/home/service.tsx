import React, { useState } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import LazyLoad from 'react-lazyload'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { device } from '../../../utils/device'
import { serviceItems } from '../../../data/service'

export const Service: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <StaticQuery<GatsbyTypes.ServiceQuery>
      query={graphql`
        query Service {
          allMicrocmsService {
            edges {
              node {
                title
                subtitle
                desc
              }
            }
          }
          allMicrocmsServiceContent {
            edges {
              node {
                tabTitleShort
                tabTitleLong
                tabTableMode
                tabContent {
                  tabContentBody1
                  tabContentBody2
                  tabContentImage1 {
                    url
                  }
                  tabContentImage2 {
                    url
                  }
                  tabContentTitle1
                  tabContentTitle2
                }
                tabTable {
                  table1Caption
                  table1Data1
                  table1Head1
                  table1Image {
                    url
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <section className="ts-inner ts-bg-gray" id="service">
          <div className="ts-block">
            <h2 className="ts-block-heading">
              {data.allMicrocmsService.edges[0].node.title}
              <span>{data.allMicrocmsService.edges[0].node.subtitle}</span>
            </h2>
            <p
              className="ts-block-paragraph"
              dangerouslySetInnerHTML={{
                __html: data.allMicrocmsService.edges[0].node.desc
              }}
            />
            <CustomTabs
              selectedIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                {data.allMicrocmsServiceContent.edges.map((edge, index) => (
                  <Tab key={index}>
                    <h3
                      className="tabHeading tabHeading--short"
                      dangerouslySetInnerHTML={{
                        __html: edge.node.tabTitleShort
                      }}
                    />
                    <h3
                      className="tabHeading tabHeading--long"
                      dangerouslySetInnerHTML={{
                        __html: edge.node.tabTitleLong
                      }}
                    />
                    <div className="iconWrap">
                      <img src={serviceItems[index].icon} alt="" />
                    </div>
                  </Tab>
                ))}
              </TabList>
              {data.allMicrocmsServiceContent.edges.map((edge, index) => (
                <TabPanel key={index}>
                  {!edge.node.tabTableMode && (
                    <div className="tabPanelBody">
                      {edge.node.tabContent.tabContentImage1 && (
                        <div className="tabPanelThumb">
                          <LazyLoad height={200}>
                            <img
                              src={edge.node.tabContent.tabContentImage1.url}
                              alt=""
                              className="tabPanelThumbImg"
                              width="300"
                              height="200"
                            />
                          </LazyLoad>
                        </div>
                      )}
                      <h4 className="tabPanelHeading">
                        {edge.node.tabContent.tabContentTitle1}
                      </h4>
                      <div
                        className="tabPanelDescription clearfix"
                        dangerouslySetInnerHTML={{
                          __html: edge.node.tabContent.tabContentBody1
                        }}
                      />
                    </div>
                  )}
                  {!edge.node.tabTableMode &&
                    edge.node.tabContent.tabContentImage2 && (
                    <div className="tabPanelBody">
                      {edge.node.tabContent.tabContentImage2 && (
                        <div className="tabPanelThumb">
                          <LazyLoad height={200}>
                            <img
                              src={edge.node.tabContent.tabContentImage2.url}
                              alt=""
                              className="tabPanelThumbImg"
                              width="300"
                              height="200"
                            />
                          </LazyLoad>
                        </div>
                      )}
                      <h4 className="tabPanelHeading">
                        {edge.node.tabContent.tabContentTitle2}
                      </h4>
                      <div
                        className="tabPanelDescription clearfix"
                        dangerouslySetInnerHTML={{
                          __html: edge.node.tabContent.tabContentBody2
                        }}
                      />
                    </div>
                  )}
                  {edge.node.tabTableMode && (
                    <div className="tabPanelBody">
                      {edge.node.tabTable.table1Image && (
                        <div className="tabPanelThumb">
                          <LazyLoad height={200}>
                            <img
                              src={edge.node.tabTable.table1Image.url}
                              alt=""
                              className="tabPanelThumbImg"
                              width="300"
                              height="200"
                            />
                          </LazyLoad>
                        </div>
                      )}
                      <h4 className="tabPanelHeading">
                        {edge.node.tabContent.tabContentTitle1}
                      </h4>
                      <div className="tabPanelDescription clearfix">
                        <table>
                          <tbody>
                            <tr>
                              <th>{edge.node.tabTable.table1Head1}</th>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: edge.node.tabTable.table1Data1
                                }}
                              />
                            </tr>
                          </tbody>
                        </table>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: edge.node.tabTable.table1Caption
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {edge.node.tabTableMode && edge.node.tabTable.table2Image && (
                    <div className="tabPanelBody">
                      {edge.node.tabTable.table2Image && (
                        <div className="tabPanelThumb">
                          <LazyLoad height={200}>
                            <img
                              src={edge.node.tabTable.table2Image.url}
                              alt=""
                              className="tabPanelThumbImg"
                              width="300"
                              height="200"
                            />
                          </LazyLoad>
                        </div>
                      )}
                      <h4 className="tabPanelHeading">
                        {edge.node.tabContent.tabContentTitle2}
                      </h4>
                      <div className="tabPanelDescription clearfix">
                        <table>
                          <tbody>
                            <tr>
                              <th>{edge.node.tabTable.table2Head1}</th>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: edge.node.tabTable.table2Data1
                                }}
                              />
                            </tr>
                            <tr>
                              <th>{edge.node.tabTable.table2Head2}</th>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: edge.node.tabTable.table2Data2
                                }}
                              />
                            </tr>
                            <tr>
                              <th>{edge.node.tabTable.table2Head3}</th>
                              <td
                                dangerouslySetInnerHTML={{
                                  __html: edge.node.tabTable.table2Data3
                                }}
                              />
                            </tr>
                          </tbody>
                        </table>
                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: edge.node.tabTable.table2Caption,
                          }}
                        /> */}
                      </div>
                    </div>
                  )}
                </TabPanel>
              ))}
            </CustomTabs>
          </div>
        </section>
      )}
    />
  )
}

const CustomTabs = styled(Tabs)`
  margin-top: 4rem;

  .react-tabs__tab-list {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin-bottom: 0;
    margin-left: 0;
  }

  .react-tabs__tab {
    background-color: #fff;
    border: 2px solid #d8d8d8;
    border-bottom: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    cursor: pointer;
    height: 152px;
    margin-bottom: 0;
    position: relative;
    text-align: center;
    width: calc((100% - 20px) / 3);

    @media ${device.md} {
      width: calc((100% - 32px) / 3);
    }

    @media ${device.md} {
      width: calc((100% - 60px) / 3);
    }

    @media ${device.lg} {
      width: 270px;
    }

    .tabHeading {
      align-items: center;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      height: 44px;
      justify-content: center;
      line-height: 1.5;
      margin-bottom: 14px;
      margin-top: 16px;

      @media ${device.xs} {
        font-size: 14px;
        margin-bottom: 12px;
        margin-top: 12px;
      }

      &--short {
        @media ${device.md} {
          display: none;
        }
      }

      &--long {
        display: none;

        @media ${device.md} {
          display: block;
        }
      }
    }

    .iconWrap {
      align-items: center;
      display: flex;
      height: 58px;
      justify-content: center;
    }
  }

  .react-tabs__tab--selected {
    border-bottom: none;

    &::before {
      background-color: #fff;
      bottom: -2px;
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      width: 100%;
    }

    &::after {
      background-color: #fadbbe;
      bottom: -2px;
      content: '';
      display: block;
      height: 6px;
      left: 0;
      margin: 0 16px;
      position: absolute;
      right: 0;

      @media ${device.sm} {
        margin-left: 24px;
        margin-right: 24px;
      }
    }
  }

  .react-tabs__tab-panel--selected {
    background-color: #fff;
    border: 2px solid #d8d8d8;
    padding: 24px 16px 18px;

    @media ${device.sm} {
      padding: 30px 24px 30px;
    }

    .tabPanelBody {
      display: flex;
      flex-direction: column;

      @media ${device.md} {
        display: grid;
        grid-column-gap: 24px;
        grid-template-columns: 300px 1fr;
      }

      table {
        font-size: 14px;
        margin-bottom: 0.5em;

        @media ${device.md} {
          border-top: 1px solid #d8d8d8;
        }
      }

      th,
      td {
        min-width: 60px;
        padding: 0.4em 0 0.4em 0.5em;

        @media ${device.sm} {
          padding-left: 1em;
        }
      }

      th {
        width: 100px;
        word-wrap: break-word;
      }

      td {
        border-bottom-color: #d8d8d8;

        @media ${device.sm} {
          font-size: 14px;
        }
      }
    }

    .tabPanelBody + .tabPanelBody {
      margin-top: 1.5em;
    }

    .tabPanelThumb {
      order: 2;

      @media ${device.md} {
        grid-row: span 3 / auto;
        order: 1;
      }

      img {
        @media ${device.xs} {
          height: auto;
          width: 100%;
        }
      }
    }

    .tabPanelThumbImg {
      margin-bottom: 0;

      img {
        margin-bottom: 0;
      }
    }

    .tabPanelHeading {
      font-size: 15px;
      margin-bottom: 1em;
      order: 1;

      @media ${device.md} {
        order: 2;
      }
    }

    .tabPanelDescription {
      font-size: 15px;
      order: 3;

      @media ${device.xs} {
        margin-top: 0.5em;
      }

      @media ${device.sm} {
        margin-top: 0.5em;
      }

      @media ${device.md} {
        margin-top: 0;
      }

      p {
        margin-bottom: 0.5em;
      }

      p span {
        display: inline-block;
        line-height: 1.7;
        margin-top: 8px;
      }

      table p {
        margin-bottom: 0;
      }

      table + div {
        margin-top: 14px;
      }

      table + div span {
        margin-right: 1em;
        margin-top: 0;
      }

      table p span:first-of-type {
        margin-top: 0;
      }

      table p span:not(:first-of-type) {
        margin-top: 4px;
      }

      table + div span:first-of-type {
        display: block;
        margin-bottom: 0.25em;
      }

      table + div span:not(:first-of-type) {
        line-height: 1.2;
      }

      table + div br {
        display: none;
      }

      table + div p {
        display: inline-block;
      }
    }
  }
`
