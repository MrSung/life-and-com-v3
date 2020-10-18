import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Fade } from 'react-awesome-reveal'
import { nanoid } from 'nanoid/non-secure'
import { device } from '../../../utils/device'
import { number1, number2, number3, number4 } from '../../../data/mission'

export const Mission: React.FC = () => (
  <StaticQuery<GatsbyTypes.MissionQueryQuery>
    query={graphql`
      query MissionQuery {
        allMicrocmsMission {
          edges {
            node {
              id
              title
              subtitle
              list {
                body
                heading
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <section className="ts-inner" id="mission">
        <div className="ts-block">
          <h2 className="ts-block-heading">
            {data.allMicrocmsMission.edges[0].node.title}
            <span>{data.allMicrocmsMission.edges[0].node.subtitle}</span>
          </h2>
          {data.allMicrocmsMission.edges[0].node.list.map(
            ({ heading, body }, index) => (
              <Fade direction="up" duration={400} key={nanoid()}>
                <StyledMission className={`number${index + 1}`}>
                  <StyledMissionHeading>{heading}</StyledMissionHeading>
                  <p>{body}</p>
                </StyledMission>
              </Fade>
            )
          )}
        </div>
      </section>
    )}
  />
)

const StyledMission = styled.section`
  margin-bottom: 3rem;
  padding-left: 88px;
  position: relative;

  @media ${device.xs} {
    font-size: 92%;
    padding-left: 54px;
  }

  &::before {
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    height: 72px;
    left: 0;
    line-height: 1;
    padding: 0;
    position: absolute;
    top: 4px;
    width: 60px;

    @media ${device.xs} {
      height: 48px;
      width: 40px;
    }
  }

  &.number1::before {
    background-image: url(${number1});
  }

  &.number2::before {
    background-image: url(${number2});
  }

  &.number3::before {
    background-image: url(${number3});
  }

  &.number4::before {
    background-image: url(${number4});
  }
`

const StyledMissionHeading = styled.h3`
  display: inline-block;
  line-height: 1.3;
`
