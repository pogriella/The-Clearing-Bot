require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { prefix } = require('./config.json');

const client = new Client({ intents: [ Intents.FLAGS.GUILDS ]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
 
client.once('ready', () => {
    console.log('On.');
    client.user.setPresence({ activities: [{ name: 'with circles.', type: 'PLAYING' }], status: 'online' });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await interaction.deferReply();
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix)) return;

    const messageCommand = message.content.slice(prefix.length).split(/ +/).join(' ').split(' ')[0];
});

client.login(process.env.TOKEN);