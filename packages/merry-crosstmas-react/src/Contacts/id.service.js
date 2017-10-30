let idIterator = 0;

export default function getNextId() {
  idIterator += 1;
  return idIterator;
}
