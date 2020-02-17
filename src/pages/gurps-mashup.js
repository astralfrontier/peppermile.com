import React from "react"
import Loadable from "@loadable/component"

import Layout from "../components/layout"
import SEO from "../components/seo"

const GurpsMashupClient = Loadable(() => import(`../components/gurps-mashup`))

const GurpsMashupPage = () => (
  <Layout>
    <SEO title="GURPS Mashup" />
    <GurpsMashupClient />
  </Layout>
)

export default GurpsMashupPage
