const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema = require('./graphQl/schema/index')
const graphQlResolvers = require('./graphQl/resolvers/index')

const app = express();
const events = [];
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
      schema: graphQlSchema ,
      rootValue: graphQlResolvers, 
      graphiql:true 
   })
);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rr0f2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=>{
   app.listen(3000);
   console.log('Database Connected Successfully');
})
.catch(err => {
   console.log(err);
});

