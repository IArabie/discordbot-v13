import 'dotenv/config';
import {
    Client,
    Intents
} from 'discord.js';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

const PREFIX: string = '?';

client.on('ready', async() => {
    console.log(`${client.user?.username} is Online!`)
})

client.on('messageCreate', async Message => {
    if(!Message.content.startsWith(PREFIX)) return;
    const Command = Message.content.slice(PREFIX.length).trim().split(' ');
    if(Command.shift()?.toLowerCase() === 'ping') {
        Message.channel.send({ content: 'Pong...' }).then((Msg) => {
            setTimeout(() => Msg.edit({ content: `**${client.ws.ping}ms**` }), 2500)
        })
    }
})

client.login(process.env.Token)