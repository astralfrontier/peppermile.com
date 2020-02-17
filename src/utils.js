import clone from "ramda/es/clone"
import remove from "ramda/es/remove"

export function sample(collection, n = 1) {
  let collectionCopy = clone(collection)
  const output = []
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * collectionCopy.length)
    output.push(collectionCopy[idx])
    collectionCopy = remove(idx, 1, collectionCopy)
  }
  return output
}
