const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!ping') {
        message.channel.send('🏓 Pong!');
    }
    else if (message.content === '!hello') {
        message.channel.send(`Hello, ${message.author.username}! 👋`);
    }
    else if (message.content === '!verify') {
        const verifiedRoleId = '914312678141460520';     // Verified role ID
        const unverifiedRoleId = '1279640017144381545';  // Unverified role ID

        const verifiedRole = message.guild.roles.cache.get(verifiedRoleId);
        const unverifiedRole = message.guild.roles.cache.get(unverifiedRoleId);

        if (!verifiedRole) {
            return message.channel.send(`Verified role not found.`);
        }

        if (!unverifiedRole) {
            return message.channel.send(`Unverified role not found.`);
        }

        try {
            await message.member.roles.add(verifiedRole);
            await message.member.roles.remove(unverifiedRole);

            message.channel.send(`${message.author} is now verified`);
        } catch (error) {
            console.error(error);
            message.channel.send(`Sorry, I couldn't update your roles. Do I have the right permissions?`);
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Respond to GET requests to root URL
app.get('/', (req, res) => {
  res.send('Bot is alive!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
