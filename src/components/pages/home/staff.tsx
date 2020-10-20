import React, { useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { debounce } from 'throttle-debounce'
import { Fade } from 'react-awesome-reveal'
import LazyLoad from 'react-lazyload'
import { nanoid } from 'nanoid/non-secure'
import { size, device } from '../../../utils/device'

export const Staff: React.FC = () => {
  const [winWidth, setWinWidth] = useState(0)
  const handleWinWidth = (): void => {
    setWinWidth(window.innerWidth)
  }
  const handleColHeight = (): void => {
    const $staff = document
      .getElementById('staff')
    if ($staff === null) return

    const staffCols = Array.from($staff
      .querySelectorAll('.js-section-staff'))
    let colNum = 1
    if (winWidth >= Number(size.sm.match(/\d+/)[0])) colNum = 2
    if (winWidth >= Number(size.md.match(/\d+/)[0])) colNum = 3
    if (colNum === 1) {
      staffCols.forEach((col) => {
        col.querySelector('.js-staffJob').style.height = ''
        col.querySelector('.js-staffBody').style.height = ''
      })
      return
    }
    const labelHeightArr = []
    const introHeightArr = []
    let [colJobHeight, colBodyHeight] = [0, 0]
    staffCols.forEach((col, index) => {
      const job = col.querySelector('.js-staffJob')
      const body = col.querySelector('.js-staffBody')
      const currentIndex = index + 1
      if (job.clientHeight >= colJobHeight) {
        colJobHeight = job.clientHeight
      }
      if (body.clientHeight >= colBodyHeight) {
        colBodyHeight = body.clientHeight
      }
      if (currentIndex % colNum === 0) {
        labelHeightArr.push(colJobHeight)
        introHeightArr.push(colBodyHeight)
        colJobHeight = 0
        colBodyHeight = 0
      }
    })
    let counter = 0
    staffCols.forEach((col, index) => {
      const currentIndex = index + 1
      col.querySelector(
        '.js-staffJob'
      ).style.height = `${labelHeightArr[counter]}px`
      col.querySelector(
        '.js-staffBody'
      ).style.height = `${introHeightArr[counter]}px`
      if (currentIndex % colNum === 0) counter += 1
    })
  }
  const debouncedHandleColHeight = debounce(100, handleColHeight)

  useEffect(() => {
    handleWinWidth()
    window.addEventListener('resize', handleWinWidth)

    return () => {
      window.removeEventListener('resize', handleWinWidth)
    }
  }, [])

  useEffect(() => {
    handleColHeight()
    window.addEventListener('resize', debouncedHandleColHeight)

    return () => {
      window.removeEventListener('resize', debouncedHandleColHeight)
    }
  }, [winWidth])

  return (
    <StaticQuery<GatsbyTypes.StaffQueryQuery>
      query={graphql`
        query StaffQuery {
          allMicrocmsStaff {
            edges {
              node {
                title
                subtitle
                id
                desc
                list {
                  job
                  hobbies
                  message
                  name
                  quote
                  thumbnail {
                    url
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => (
        <section className="ts-inner" id="staff">
          <div className="ts-block">
            <h2 className="ts-block-heading">
              {data.allMicrocmsStaff.edges[0].node.title}
              <span>{data.allMicrocmsStaff.edges[0].node.subtitle}</span>
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.allMicrocmsStaff.edges[0].node.desc
              }}
              className="ts-block-paragraph"
            />
            <StyledDivStaff>
              {data.allMicrocmsStaff.edges[0].node.list.map(
                ({ name, job, thumbnail, hobbies, quote, message }) => (
                  <Fade direction="up" duration={400} key={nanoid()} triggerOnce cascade className="react-awesome-reveal">
                    <section className="js-section-staff">
                      <StyledHeading>{name}</StyledHeading>
                      <StyledHeadingSub
                        className="js-staffJob"
                        dangerouslySetInnerHTML={{ __html: job }}
                      />
                      <StyledImageWrap>
                        <LazyLoad height={200}>
                          <img src={thumbnail.url} alt="" />
                        </LazyLoad>
                      </StyledImageWrap>
                      <StyledDescription className="js-staffBody">
                        <p>
                          <strong>趣味</strong>：<span>{hobbies}</span>
                        </p>
                        <p>
                          <strong>好きな言葉</strong>：<span>{quote}</span>
                        </p>
                        <p>
                          <strong>一言</strong>：<span>{message}</span>
                        </p>
                      </StyledDescription>
                    </section>
                  </Fade>
                )
              )}
            </StyledDivStaff>
          </div>
        </section>
      )}
    />
  )
}

const StyledDivStaff = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 72px;

  .react-awesome-reveal {
    margin-bottom: 48px;
    max-width: 100%;
    text-align: center;
    width: 100%;

    @media ${device.sm} {
      padding-left: 14px;
      padding-right: 14px;
      width: 50%;
    }

    @media ${device.md} {
      width: calc(100% / 3);
    }
  }
`

const StyledHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 16px;
`

const StyledHeadingSub = styled.h4`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.8;
  margin-bottom: 0;
`

const StyledImageWrap = styled.div`
  margin-bottom: 14px;
  margin-top: 16px;

  img {
    background-image: linear-gradient(rgb(255, 211, 172), rgb(176, 228, 255));
    border-radius: 50%;
    height: 200px;
    margin: 0;
    overflow: hidden;
    padding: 6px;
    width: 200px;
  }
`

const StyledDescription = styled.div`
  font-size: 14px;
  margin-bottom: 0;
  text-align: left;

  p:not(:last-child) {
    margin-bottom: 0.5em;
  }
`
