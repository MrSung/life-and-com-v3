import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { HeroSvg } from './hero-svg'
import { device } from '../../../../utils/device'
import { paths } from '../../../../utils/shape'

const pathIds = Object.keys(paths)

export const Hero: React.FC = () => {
  const [animated, setAnimated] = useState(false)
  const [pathIndex, setPathIndex] = useState(0)

  let timer: number
  const setAnimation = (): void => {
    timer = window.setInterval(() => {
      if (pathIndex === pathIds.length - 1) {
        setAnimated(true)
        clearInterval(timer)
        return
      }
      setPathIndex(pathIndex + 1)
    }, 1000)
  }

  useEffect(() => {
    setAnimation()
    return () => {
      clearInterval(timer)
    }
  }, [animated, pathIndex])

  return (
    <HeroGradient className="ts-inner">
      <HeroGradientInner>
        <HeroSvg animated={animated} pathIndex={pathIndex} />
      </HeroGradientInner>
    </HeroGradient>
  )
}

const HeroGradient = styled.div`
  align-items: center;
  background-image: linear-gradient(#ffd3ac, #b0e4ff);
  display: flex;
  height: 100vh;
  justify-content: center;
  min-height: 500px;
  transition: height 0.4s ease-in-out;

  @media ${device.sm} {
    min-height: 600px;
  }
`

const HeroGradientInner = styled.article`
  margin-bottom: 32px;
  max-width: 100%;
  position: relative;
  width: 500px;
`
