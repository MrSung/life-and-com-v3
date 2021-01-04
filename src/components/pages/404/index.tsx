import React from 'react'
import { Layout } from '../../templates/layout/index'
import { Seo } from '../../templates/seo'
import { Content } from './content'

export const NotFound: React.FC = () => (
  <Layout>
    <Seo lang="ja" title="Life & Com" />
    <Content />
  </Layout>
)
