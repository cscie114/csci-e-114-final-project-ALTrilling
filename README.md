# final-project
Final Project

You can also directly see the meilisearch dashboard at http://146.190.209.16/ but you need to enter an api key with search permissions (both api keys in the .env file) to view the data.

Created the search only key with 
https://www.meilisearch.com/docs/learn/security/master_api_keys
curl \
  -X POST 'MEILI_URL/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer MEILI_MASTER_KEY' \
  --data-binary '{
    "description": "Search parks key",
    "actions": ["search"],
    "indexes": ["parks"],
    "expiresAt": "2024-01-01T00:00:00Z"
  }'

for the frontend, meilisearch has a library called instant meiliesearch based on instant search (made by algolia)
https://github.com/meilisearch/instant-meilisearch
however, i specifically chose not to use that, in favor of proxing the results through a function called park_search.js. this is mostly pointless, as I could have set it up to query meilisearch directly, but i thought that this way seemed interesting. additionally, in a real application, if i wanted to change the responses or apply rate limiting, adding the proxy would make that easier