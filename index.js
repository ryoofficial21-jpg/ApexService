
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
 
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    const blockedWords = [
        'fs',
        'for sale'
    ];

    if (blockedWords.some(word => content.includes(word))) {

        await message.delete().catch(() => {});

        const embed = new EmbedBuilder()
            .setTitle('⚠️ Warning')
            .setDescription(
                `${message.author}\n\nSelling items or services is not allowed in this server.`
            )
            .setColor('Red')
            .setTimestamp();

        const warningMsg = await message.channel.send({
            content: `${message.author}`,
            embeds: [embed]
        });

        setTimeout(async () => {
            await warningMsg.delete().catch(() => {});
        }, 5000);
    }
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