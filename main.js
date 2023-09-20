import fs from 'fs'
import StreamChain from 'stream-chain'
import StreamJSON from 'stream-json'
import StreamValues from 'stream-json/streamers/StreamValues.js'
import StreamArray from 'stream-json/streamers/StreamArray.js'
import Pick from 'stream-json/filters/Pick.js'
import Filter from 'stream-json/filters/Filter.js'

const main = () => {
    let count = 0
    const processing = StreamChain.chain([
        // StreamJSON.parser(),
        StreamArray.withParser(),
        // Filter.withParser({ filter: "type" }),
        // Pick.pick({ filter: "type" }),
        // x => x.value.type,
        // StreamValues.streamValues(),
        x => x.value,
        // x => x.type === "CreateEvent" ? x : null,
        x => count += 1,
        // x => console.log(x),
    ])
    // processing.on('start', () => console.log("hello"))
    fs.createReadStream("./large-file.json").pipe(processing)
}

main()