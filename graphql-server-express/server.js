const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const app = express()

const schema = require('./schema')

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,PUT,POST,OPTIONS'
}))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log(`listen at http://localhost:4000/graphql`)
})
