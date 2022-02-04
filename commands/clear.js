const { SlashCommandBuilder } = require('@discordjs/builders');
const { clearingChannelIds } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clearing')
        .setDescription('Purges the server.'),
    async execute(interaction) {
        const del = await interaction.guild.channels.cache.filter(channel => channel.isText())
            .filter(channel => clearingChannelIds.includes(channel.id))
            .forEach(async channel => {
                const textChannel = channel.guild.channels.cache.get(channel.id);
                for (let i = 0; i < 10; i++) await textChannel.bulkDelete(100, true);
            });
        
        await eval(del);
        await interaction.editReply('Done.').then(() => {
            interaction.guild.channels.cache.filter(channel => channel.isText())
                .filter(channel => clearingChannelIds.includes(channel.id))
                .forEach(channel => {
                    channel.guild.channels.cache.get(channel.id).send('https://tenor.com/view/maid-clapping-singing-anime-gif-8700993');
                });
        });
    }
}