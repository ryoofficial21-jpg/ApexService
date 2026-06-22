
const {
    Client,
    GatewayIntentBits,
    Events,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    SlashCommandBuilder
} = require('discord.js');

const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    // Online Status
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Coding...',
                type: 0 // Playing
            }
        ]
    });
});

client.login(process.env.TOKEN);