import React, { useState, useEffect } from "react"
import clone from "ramda/es/clone"
import map from "ramda/es/map"
import propEq from "ramda/es/propEq"
import reject from "ramda/es/reject"
import remove from "ramda/es/remove"

import Button from "react-bootstrap/Button"
import Figure from "react-bootstrap/Figure"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const ChosenBook = ({ name, url, imageUrl }) => (
  <Col key={url} md={"auto"}>
    <Figure>
      <Figure.Image
        src={imageUrl || `${url}img/cover_sm.jpg`}
        width={150}
        height={194}
        alt={name}
      />
      <Figure.Caption>
        <a href={url}>{name}</a>
      </Figure.Caption>
    </Figure>
  </Col>
)

const GurpsMashup = _props => {
  const [gurpsMashupData, setGurpsMashupData] = useState([])
  const [chosenBooks, setChosenBooks] = useState([])
  const [bookCount, setBookCount] = useState(2)

  function chooseNewBooks() {
    if (gurpsMashupData.length >= bookCount) {
      let books = clone(gurpsMashupData)
      const items = []
      for(let i = 0; i < bookCount; i++) {
        const idx = Math.floor(Math.random() * books.length)
        items.push(books[idx])
        books = remove(idx, 1, books)
      }
      console.log(items)
      setChosenBooks(items)
    }
  }

  // Choose books when we get some
  useEffect(() => chooseNewBooks(), [bookCount])
  useEffect(() => chooseNewBooks(), [gurpsMashupData])

  useEffect(() => {
    async function fetchData() {
      const raw = await fetch(`/tools/gurps-mashup/data.json`)
      const data = await raw.json()
      const books = reject(propEq("skip", true), data.books)
      setGurpsMashupData(books)
      chooseNewBooks(books)
    }
    fetchData().catch(e => window.alert(e.message))
  }, [])

  return (
    <Container>
      <Row>{map(ChosenBook, chosenBooks)}</Row>
      <Form>
        <Row>
          <Col md="auto">
            <Form.Control as="select" value={bookCount} onChange={e => {setBookCount(e.target.value);}}>
              <option value={2}>2 books</option>
              <option value={3}>3 books</option>
              <option value={4}>4 books</option>
              <option value={5}>5 books</option>
            </Form.Control>
          </Col>
          <Col md="auto">
            <Button onClick={chooseNewBooks}>Randomize</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default GurpsMashup
