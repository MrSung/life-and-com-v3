import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Scrollspy from 'react-scrollspy'
import { nanoid } from 'nanoid/non-secure'
import { device } from '../../../utils/device'
import { logoTextSmVertical } from '../../../data/logo'

interface IExternalLink {
  text: string
  url?: string
}

interface ISocialLink {
  name: string
  icon: string
  url?: string
}

interface IHeaderProps {
  pathname: string
  scrollspyItems: string[]
  externalLinks: IExternalLink[]
  socialLinks: ISocialLink[]
}

export const Header: React.FC<IHeaderProps> = ({ pathname, scrollspyItems, externalLinks, socialLinks }) => {
  const [isTriggered, setIsTriggered] = useState(false)
  const [winHeight, setWinHeight] = useState(0)
  const isRootPath = pathname === '/'

  const handleWinResize = (): void => {
    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0
    setWinHeight(innerHeight)
  }
  const handleWinScroll = (): void => {
    const scrollTop = typeof window.pageYOffset !== 'undefined'
      ? window.pageYOffset : document.documentElement.scrollTop
    setIsTriggered(scrollTop >= winHeight)
  }

  useEffect(() => {
    if (!isRootPath) setIsTriggered(true)

    handleWinResize()
    window.addEventListener('resize', handleWinResize)
    window.addEventListener('scroll', handleWinScroll)

    return () => {
      window.removeEventListener('resize', handleWinResize)
      window.removeEventListener('scroll', handleWinScroll)
    }
  }, [isRootPath, winHeight])

  return (
    <StyledHeader
      style={{
        visibility: isTriggered ? 'visible' : 'hidden',
        opacity: isTriggered ? 1 : 0
      }}
    >
      <StyledHeaderInner>
        <StyledNav>
          <ul className="navUl">
            <li className="navLi">
              <img
                src={logoTextSmVertical}
                alt="Life & Com"
                width="18"
                height="122"
                style={{
                  marginLeft: '3px'
                }}
              />
            </li>
          </ul>
          <Scrollspy
            items={scrollspyItems}
            className="navUl navUl--dots"
            currentClassName="is-current"
          >
            {scrollspyItems.map((item) => (
              <li className="navLi" key={nanoid()}>
                <a href={`#${item}`}>&nbsp;</a>
              </li>
            ))}
          </Scrollspy>
          <ul className="navUl">
            {externalLinks.map(({ url, text }) => (
              <li className="navLi" key={nanoid()}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </StyledNav>
        <StyledUlSocial>
          {socialLinks.map(({ url, icon }) => (
            <li key={nanoid()}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt="" />
              </a>
            </li>
          ))}
        </StyledUlSocial>
      </StyledHeaderInner>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  bottom: 34px;
  box-shadow: 0 0 7px 0 rgba(22, 21, 21, 0.15);
  left: 0;
  position: fixed;
  transition: opacity 0.1s ease-in-out;
  z-index: 1;

  @media ${device.xl} {
    box-shadow: none;
    height: 540px;
    left: 108px;
    top: 100px;
    width: 40px;
  }

  .ts-block {
    padding-bottom: 40px;
    padding-top: 40px;
  }
`

const StyledHeaderInner = styled.div`
  background-color: #fff;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  padding-left: 16px;

  @media ${device.xl} {
    background-color: transparent;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 0;
    text-align: center;
  }

  a {
    display: block;

    &:link,
    &:visited {
      color: #4a4a4a;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`

const StyledNav = styled.nav`
  display: inline-block;

  @media ${device.xl} {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .navUl {
    display: flex;
    list-style: none;
    margin-bottom: 0;
    margin-left: 0;

    @media ${device.xl} {
      display: block;
      width: 100%;
    }

    &--dots {
      display: none;

      @media ${device.xl} {
        display: block;
      }

      a {
        cursor: default;
        font-size: 0;
        height: 0;
        margin: 0;
        padding: 0;
        pointer-events: none;
        width: 0;
      }

      a::selection {
        background: none;
      }
    }

    &:first-of-type {
      display: none;

      @media ${device.xl} {
        display: inherit;
      }
    }

    &:not(:first-of-type) {
      @media ${device.xl} {
        margin-top: 32px;
      }
    }

    &:last-of-type {
      font-size: 16px;

      @media ${device.xl} {
        font-size: 18px;
        margin-bottom: 12px;
        margin-top: auto;
      }
    }
  }

  .navLi {
    margin: 0 10px 0 0;

    @media ${device.xl} {
      letter-spacing: 2px;
      line-height: 40px;
      margin-left: auto;
      margin-right: auto;
      writing-mode: vertical-rl;
    }

    a {
      height: 40px;
      line-height: 40px;

      @media ${device.xl} {
        height: inherit;
        line-height: inherit;
      }
    }

    &:not(:first-of-type) {
      @media ${device.xl} {
        margin-top: 40px;
      }
    }
  }

  .navUl--dots .navLi {
    display: none;
    writing-mode: initial;

    @media ${device.xl} {
      display: block;
    }

    a {
      @media ${device.xl} {
        background-color: currentColor;
        border-radius: 50%;
        display: block;
        height: 8px;
        margin-left: auto;
        margin-right: auto;
        width: 8px;
      }
    }

    &.is-current a {
      @media ${device.xl} {
        background-color: #f47d0e;
      }
    }

    &:not(:first-of-type) {
      @media ${device.xl} {
        margin-top: 28px;
      }
    }
  }
`

const StyledUlSocial = styled.ul`
  display: inline-block;
  list-style: none;
  margin-bottom: 0;
  margin-left: 0;
  vertical-align: bottom;

  @media ${device.xl} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  li {
    display: inline-block;
    margin: 0;
    vertical-align: bottom;

    a {
      align-items: center;
      display: flex;
      font-size: 0;
      height: 40px;
      justify-content: center;
      line-height: 0;
      width: 40px;
    }
  }
`
