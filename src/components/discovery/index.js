import React, { useState, useEffect } from "react"

import { addIndex, isEmpty, map, prepend, take } from 'ramda'

import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { sample } from '../../utils'

const Discovery = _props => {
  const [discoveryData, setDiscoveryData] = useState({})
  const [discoveries, setDiscoveries] = useState([])

  function generateDiscovery() {
    if (!isEmpty(discoveryData)) {
      let queue = ['d4']
      let message = ""
      while(queue.length > 0) {
        let key = queue.pop()
        let value = sample(discoveryData[key])[0]
        if (value.template) {
          message = value.template
        }
        if (value.next) {
          queue.push(value.next)
        }
        message = message.replace(`%${key}`, value.name)
      }
      setDiscoveries(take(10, prepend(message, discoveries)))
    }
  }

  // Choose books when we get some
  useEffect(() => generateDiscovery(), [discoveryData])

  useEffect(() => {
    async function fetchData() {
      const raw = await fetch(`/tools/discovery/data.json`)
      const data = await raw.json()
      setDiscoveryData(data)
    }
    fetchData().catch(e => window.alert(e.message))
  }, [])

  return (
    <Container>
      <Row>
        <Col md="auto">
          <Button onClick={generateDiscovery}>Generate</Button>
        </Col>
        <Col md="auto">
          <Button onClick={() => setDiscoveries([])}>Reset</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <ol>
            {addIndex(map)((m, idx) => (<li key={idx}>{m}</li>), discoveries)}
          </ol>
        </Col>
      </Row>
    </Container>
  )
}

export default Discovery
