const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const { json } = require('stream/consumers');

const dbpath = './database/data.json';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gibmireinenpunkt')
		.setDescription('Get one extra score!'),
	async execute(interaction) {
        let userID = interaction.user.id;
        let userdata;
        let jsonDB;
        console.log(__dirname);
        fs.readFile(dbpath, 'utf8', async (error, data) => {
            if(error){
               console.log(error);
               await interaction.reply('Error');
               return;
            }
            jsonDB = JSON.parse(data);

            userdata = jsonDB.userdata[userID];
            if(userdata == undefined) userdata = {"score":0};

            userdata.score += 1;

            jsonDB.userdata[userID] = userdata;

            fs.writeFile(dbpath, JSON.stringify(jsonDB, null, 2), (error) => {
                if (error) {
                  console.log('An error has occurred while writing the db ', error);
                  return;
                }
              });

            await interaction.reply("Hier ist ein extra Punkt für dich, jetzt hast du " + userdata.score + (userdata.score==1?" Punkt, ":" Punkte, ") + interaction.member.displayName);
        });
		
	},
};