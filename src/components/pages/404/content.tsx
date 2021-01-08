import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export const Content: React.FC = () => (
  <Wrapper>
    <p>ページが見つかりませんでした。</p>
    <p>
      <Link to='/'>トップページにもどる</Link>
    </p>
  </Wrapper>
)

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`
