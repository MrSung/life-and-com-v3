import React from 'react'
import styled from 'styled-components'
import posed from 'react-pose'
import { tween } from 'popmotion'
// @ts-expect-error
import { interpolate } from 'flubber'

import { device } from '../../../../utils/device'
import { paths } from '../../../../utils/shape'
import { logoText } from '../../../../data/logo'

const pathIds = Object.keys(paths)
const morphTransition = (param: { from: number, to: number }): ReturnType<typeof tween> =>
  tween({
    from: 0,
    to: 1
  }).pipe(interpolate(param.from, param.to))
const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition
    }
    return config
  }, {})
)

interface IHeroSvgProps {
  animated: boolean
  pathIndex: number
}

export const HeroSvg: React.FC<IHeroSvgProps> = ({ animated, pathIndex }) => (
  <>
    <LogoSvg>
      <svg
        className="logoSvgComponent"
        width="500px"
        height="500px"
        viewBox="0 0 500 500"
      >
        <g
          className="logoSvgGroup"
          stroke="none"
          strokeWidth="1"
          fill="#fff"
          opacity="0.8"
        >
          <Icon pose={pathIds[pathIndex]} />
        </g>
      </svg>
    </LogoSvg>
    <LogoHeading>
      <img
        src={logoText}
        alt="Life & Com"
        width="192"
        height="30"
        style={{
          marginTop: animated ? '' : '54px',
          opacity: animated ? 1 : 0,
          transitionDuration: '0.4s',
          transitionProperty: 'visibility, opacity, margin',
          transitionTimingFunction: 'ease-in-out',
          visibility: animated ? 'visible' : 'hidden'
        }}
        className="logoHeadingImg"
      />
    </LogoHeading>
  </>
)

const LogoSvg = styled.div`
  .logoSvgComponent {
    max-width: 100%;

    @media ${device.xs} {
      padding-left: 30px;
      padding-right: 30px;
    }
  }

  .logoSvgGroup {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }
`

const LogoHeading = styled.h1`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  margin-bottom: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;

  .logoHeadingImg {
    margin-bottom: 0;

    @media ${device.xs} {
      margin-top: 2vw;
      width: 40%;
    }

    @media ${device.sm} {
      margin-top: 24px;
    }
  }
`
