// dumps the contents of nps into meilisearch
// we can get the contents of nps from src/_data/parks.js

const { MeiliSearch } = require('meilisearch');
require('dotenv').config();

const parks_func = require('./src/_data/parks.js');


(async () => {
  
  let parks_list = await parks_func();
  // in meilisearch, we only want the fullName and description (parkCode is also handy). we also want the image url so we can display it.
  // there are sometimes multiple images, but we'll just use the first one.
  // however, meilisearch requires an id, so we'll use the park's id. the id must confirm to meilisearch's id requirements, but it already does, so that is fine.
  

  let parks = parks_list.data.map(park => {
    return {
      title: park.fullName,
      description: park.description,
      parkCode: park.parkCode,
      id: park.id,
      poster: park.images[0].url,
    }
  })

  // console.log(parks);

  // console.log("working up to here qwerty")

  // console.log("process.env.MEILI_URL: ", process.env.MEILI_URL)
  // console.log("process.env.MEILI_MASTER_KEY: ", process.env.MEILI_MASTER_KEY)
  // console.log("working up to here uiop")

  

    const client = new MeiliSearch({
        host: process.env.MEILI_URL,
        apiKey: process.env.MEILI_MASTER_KEY,
    });
    // console.log("working up to here asdf")

  // An index is where the documents are stored.
  const index = client.index('parks', { primaryKey: 'id' });

  // // because i want to be consistent, i'm going to delete the index if it exists
  let response_delete = await index.deleteAllDocuments()



  // dump the contents of nps into meilisearch
  let response_add = await index.addDocuments(parks)

//   const documents = [
//       { id: 1, title: 'Carol', genres: ['Romance', 'Drama'] },
//       { id: 2, title: 'Wonder Woman', genres: ['Action', 'Adventure'] },
//       { id: 3, title: 'Life of Pi', genres: ['Adventure', 'Drama'] },
//       { id: 4, title: 'Mad Max: Fury Road', genres: ['Adventure', 'Science Fiction'] },
//       { id: 5, title: 'Moana', genres: ['Fantasy', 'Action']},
//       { id: 6, title: 'Philadelphia', genres: ['Drama'] },
//   ]

//   // If the index 'movies' does not exist, Meilisearch creates it when you first add the documents.
//   let response = await index.addDocuments(documents)


  console.log(response_add) // => { "uid": 0 }
})();