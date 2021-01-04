import React from 'react'
import { Layout, LayoutMode } from '../../templates/layout/index'
import { Seo } from '../../templates/seo'
import { Content } from './content'

export const NotFound: React.FC = () => (
  <Layout mode={LayoutMode.NotFound}>
    <Seo lang="ja" title="Life & Com" />
    <Content />
  </Layout>
)
