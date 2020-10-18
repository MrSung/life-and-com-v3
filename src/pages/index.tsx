import React from 'react'
import { Layout } from '../components/templates/layout'
import { Seo } from '../components/templates/seo'
import { Hero } from '../components/pages/home/hero'
import { Intro } from '../components/pages/home/intro'
import { Mission } from '../components/pages/home/mission'
import { Service } from '../components/pages/home/service'
import { Staff } from '../components/pages/home/staff'
import { Contact } from '../components/pages/home/contact/index'

const Home: React.FC = () => (
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

export default Home
