import React from "react"
import Loadable from "@loadable/component"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ShowAccordion = Loadable(() => import(`../components/tools-client`))

const ToolsPage = () => (
  <Layout>
    <SEO title="Tools" />
    <ShowAccordion />
  </Layout>
)

export default ToolsPage
