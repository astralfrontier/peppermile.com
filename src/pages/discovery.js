import React from "react"
import Loadable from "@loadable/component"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DiscoveryClient = Loadable(() => import(`../components/discovery`))

const DiscoveryPage = () => (
  <Layout>
    <SEO title="Discovery" />
    <DiscoveryClient />

    <hr />
    <h3>What is this?</h3>
    <p>
      This is a tool for generating Discoveries - objects, events, or whatever - that PCs
      in a typical high-fantasy world might interact with.
      It comes with the nature of the discovery, including a couple adjectives, and a goal.
      Not every discovery will be interesting, but some will surprise you.
    </p>
  </Layout>
)

export default DiscoveryPage
