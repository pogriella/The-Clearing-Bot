module.exports = {
    commandName: 'sayAs',
    async execute (message) {
        if (message.member.roles.cache.some(role => role.id === '921442764825174047') === false) return message.reply(`No, ${message.member}, you cunt.`);

        let thisMessage = message.content.replace('-sayAs', '');

        await message.delete();
        await message.channel.send(thisMessage);
    }
}