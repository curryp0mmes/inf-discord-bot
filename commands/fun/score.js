const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { json } = require('stream/consumers');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('Get your current score!'),
	async execute(interaction) {
        console.log(interaction);

        let userID = interaction.user.id;
        let userdata;
        let jsonDB;
        console.log(__dirname);
        fs.readFile('./database/data.json', 'utf8', async (error, data) => {
            if(error){
               console.log(error);
               await interaction.reply('Error');
               return;
            }
            jsonDB = JSON.parse(data);

            userdata = jsonDB.userdata[userID];
            if(userdata == undefined) userdata = {"score":0};
            console.log(userdata);

            await interaction.reply(interaction.member.displayName + ', du hast aktuell ' + userdata.score + (userdata.score==1?" Punkt!":" Punkte!") );
        });
		
	},
};