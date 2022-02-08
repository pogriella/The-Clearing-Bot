require('dotenv').config();
const fs = require('fs');
const { Collection } = require('discord.js');
const commandFiles = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));

module.exports = {
    async processCommand(message, prefix) {
        const commandString = message.content.slice(prefix.length).split(/ +/).join(' ').split(' ')[0];
        message.client.commands = new Collection();

        for (const file of commandFiles) {
            const command = require(`./messageCommands/${file}`);
            message.client.commands.set(command.commandName, command);
        }

        const command = message.client.commands.get(commandString)

        if (!command) return;

        try {
            await command.execute(message);
        } catch (error) {
            console.error(error);
        }
    }
}
