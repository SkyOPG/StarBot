const { Collection } = require('discord.js')
const path = require('path')
const fs = require('fs')
const colors = require('colors')

module.exports={
    execute(client){
        console.log('0--------------| Message cmds'.blue)
    client.cmdsPrefixed = new Collection()
    client.aliases = new Collection()
    client.descriptions = new Collection()
cmdsPath = path.join(__dirname, '../commands/prefixed');
cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
    const fpath = path.join(cmdsPath, file);
    const cmd = require(fpath);
    if ('data' in cmd && 'execute' in cmd) {
        client.cmdsPrefixed.set(cmd.data.name, cmd);
        client.descriptions.set(cmd.data.description, cmd)
        cmd.data.aliases.map((thing) => {
            client.aliases.set(thing, cmd);
            console.log('loaded alias '+ thing)
        })
        console.log(`Loaded ${cmd.data.name}`.green);
    } else {
        console.log(`[WARNING] The cmd at ${fpath} is missing a required "data" or "execute" property.`.yellow);
    }
}
    }
}