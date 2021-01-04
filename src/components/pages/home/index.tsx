import React from 'react'
import { Layout } from '../../templates/layout/index'
import { Seo } from '../../templates/seo'
import { Hero } from './hero/index'
import { Intro } from './intro'
import { Mission } from './mission'
import { Service } from './service'
import { Staff } from './staff'
import { Contact } from './contact'

export const Home: React.FC = () => (
  <Layout>
    <Seo lang="ja" title="Life & Com" />
    <Hero />
    <Intro />
    <Mission />
    <Service />
    <Staff />
    <Contact />
  </Layout>
)
