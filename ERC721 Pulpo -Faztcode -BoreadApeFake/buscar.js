// "https://ipfs.io/ipfs/QmYsWYyQL2rTykTb8a9erJ6cSRRLqpC1sk3NE7n6SbgAaJ"

const url = "ipfs://QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ"

let buscar = "ipfs://"
let remplazar = "https://ipfs.io/ipfs/"
let resultado = url.replace(buscar, remplazar)

console.log(resultado);