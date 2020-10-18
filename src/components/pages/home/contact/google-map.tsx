import React from 'react'
import styled from 'styled-components'

interface IGoogleMapProps {
  src: string
}

export const GoogleMap: React.FC<IGoogleMapProps> = ({ src }) => (
  <GoogleMapContainer>
    <iframe
      src={src}
      frameBorder="0"
      style={{
        border: 0
      }}
      allowFullScreen={false}
      aria-hidden={false}
      title="Google Map"
    />
  </GoogleMapContainer>
)

const GoogleMapContainer = styled.div`
  height: 100%;
  width: 100%;

  & > iframe {
    height: 100%;
    width: 100%;
  }
`
