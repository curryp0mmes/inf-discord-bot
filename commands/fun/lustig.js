const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lustig')
		.setDescription('Replies with Saul goodman!'),
	async execute(interaction) {
		await interaction.reply('https://media.tenor.com/fuGIGEckxdMAAAAd/saul-goodman.gif');
	},
};