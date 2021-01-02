import React from 'react'
import styled from 'styled-components'
import { nanoid } from 'nanoid/non-secure'
import { device } from '../../../utils/device'

interface ILogoItem {
  src: string
  alt: string
  width: string
  height: string
}

interface IFooterProps {
  logoItems: ILogoItem[]
}

export const Footer: React.FC<IFooterProps> = ({ logoItems }) => (
  <StyledFooter className="ts-inner ts-bg-gray">
    <StyledFooterInner className="ts-block">
      <StyledFooterSection>
        <div className="logoWrap">
          <img
            src={logoItems[0].src}
            alt={logoItems[0].alt}
            width={logoItems[0].width}
            height={logoItems[0].height}
          />
        </div>
      </StyledFooterSection>
      <StyledFooterSection>
        {logoItems.map(
          ({ src, alt, width, height }, index) =>
            index > 0 && (
              <div className="logoWrap" key={nanoid()}>
                <img src={src} alt={alt} width={width} height={height} />
              </div>
            )
        )}
      </StyledFooterSection>
    </StyledFooterInner>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  margin-top: auto;

  img {
    margin: 0;
  }

  .ts-block {
    padding-bottom: 100px;
    padding-top: 40px;

    @media ${device.xl} {
      padding-bottom: 40px;
    }
  }
`

const StyledFooterInner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: space-between;

  @media ${device.md} {
    flex-direction: row;
  }
`

const StyledFooterSection = styled.div`
  align-items: center;
  display: flex;

  @media ${device.xs} {
    flex-wrap: wrap;
  }

  .logoWrap {
    align-items: center;
    display: flex;
  }

  & + & {
    margin-top: 20px;

    @media ${device.md} {
      margin-top: 0;
    }

    .logoWrap:first-of-type {
      @media ${device.xs} {
        width: 100%;
      }
    }

    .logoWrap:not(:first-of-type) {
      @media ${device.xs} {
        box-shadow: rgba(0, 0, 0, 0.3) 0 0 1px 0;
        margin-right: 16px;
        margin-top: 16px;
      }

      @media ${device.sm} {
        box-shadow: rgba(0, 0, 0, 0.3) 0 0 2px -1px;
        margin-left: 24px;
      }
    }
  }
`
