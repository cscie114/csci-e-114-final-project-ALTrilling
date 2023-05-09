# final-project
Final Project

My project uses a search engine. However, I decided to use a different tool than the one that Prof. Bouthillier used (algolia).
The one I used is called meilisearch which has some unique tradeoffs to algolia.
1. It is open source and self hostable. I am hosting it on a 6$ a month digital ocean droplet.
2. It is written in rust and is very fast.
3. One of the drawbacks of it is that (to my knowledge) it is not as scalable as algolia, as it is not meant to be used in a distributed fashion. However, for my purposes, it is perfectly fine.
4. However, while it cannot be used in a distributed fashion, it is not RAM-bound as resources can be saved to disk which the program can read from. This is handy because disk resources tend to be a lot cheaper than RAM resources.

On the page with all the parks, users can begin to type in the name of the park, and whenever they type, they fire off a request to a netlify edge function which proxies the results of meilisearch. The use of proxing through an edge function, is if I wanted to, I could later change their input text or apply rate limiting or something else like that.
Once they get the response (usually much less than a tenth of a second) the page re-updates to show the search results.

However, while I did proxy the results, in reality I didn't really need to as I could have just queried meilisearch directly. I just thought that it would be interesting to do it this way. It would be safe to do this, because meilisearch (like algolia) allows for keys with different permissions. So I could create a key that is visable on the frontend, but only allows for search privileges.


Really the only thing that I added in the serverless function was I set the limit to be 600.

Obvioiusly in production, running a proxy with a serverless function probably isn't a great idea.

Incidentally I actually did create a search key (this is what the serverless function uses, so that way even if I somehhow exposed that key, users couldn't abuse it to heavily as it only has searching functionality) with the command
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
https://www.meilisearch.com/docs/learn/security/master_api_keys
while I used curl here meilisearch offers robust sdks in a variety of languages.

for the frontend, meilisearch has a library called instant meiliesearch based on instant search (made by algolia)
https://github.com/meilisearch/instant-meilisearch
however, i specifically chose not to use that, in favor of proxing the results through a function called park_search.js. this is mostly pointless, as I could have set it up to query meilisearch directly, but i thought that this way seemed interesting. additionally, in a real application, if i wanted to change the responses or apply rate limiting, adding the proxy would make that easier.



You can also directly see the meilisearch dashboard at http://146.190.209.16/ but you need to enter an api key with search permissions (both api keys in the .env file work fine for this) to view the data.


The way that I got the data was I used the script dump_nps.js to repeatedly call the nps api and dump the data into meilisearch.
To make sure that this is not a one time dump (so as to get the lastest park informaiton), I run the nps_api script during the build step (it is in the CI/CD pipeline file)

This project is
- built with eleventy

- changes tracked through github

- uses github actions (to paginate files but also to run the dump_nps script)

- it deploys to netlify
Netlify url:
https://stellar-clafoutis-7a38e5.netlify.app/