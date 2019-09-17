import {Client} from "@elastic/elasticsearch";

const client = new Client({node: 'http://localhost:9200' });

async function run() {
    // Let's start by indexing some data
    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Ned Stark',
            quote: 'Winter is coming.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Daenerys Targaryen',
            quote: 'I am the blood of the dragon.'
        }
    })

    await client.index({
        index: 'game-of-thrones',
        body: {
            character: 'Tyrion Lannister',
            quote: 'A mind needs books like a sword needs a whetstone.'
        }
    })

    await client.indices.refresh({ index: 'game-of-thrones' })


    const { body } = await client.search({
        index: 'game-of-thrones',

        body: {
            query: {
                match: {
                    quote: 'winter'
                }
            }
        }
    })

    console.log(body.hits.hits)

}

run().catch(console.log)