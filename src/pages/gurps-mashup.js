import React from "react"
import Loadable from "@loadable/component"

import Layout from "../components/layout"
import SEO from "../components/seo"

const GurpsMashupClient = Loadable(() => import(`../components/gurps-mashup`))

const GurpsMashupPage = () => (
  <Layout>
    <SEO title="GURPS Mashup" />
    <GurpsMashupClient />

    <hr />
    <h3>What is this?</h3>
    <p>
      Are you running some kind of RPG campaign, but don't have any ideas?
      Do you want some kind of gonzo, out-there premise?
      Start clicking "Randomize" and see where the dice take you.
      Add more books if you need more variety.
    </p>

    <p>Note: book covers are loaded dynamically from the SJ Games website. Please be kind.</p>
  </Layout>
)

export default GurpsMashupPage
