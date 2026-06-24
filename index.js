
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

    const sellingWords = [
        'fs',
        'for sale',
        'forsale'
    ];

    const badWords = [
        'putangina',
        'puta',
        'gago',
        'bobo',
        'ulol',
        'tanga',
        'inamo',
        'tarantado',
        'hindot',
        'pakyu',
        'fuck',
        'shit',
        'bitch',
        'asshole'
    ];

    let embed;

    if (sellingWords.some(word => content.includes(word))) {
        embed = new EmbedBuilder()
            .setTitle('⚠️ Selling Items Is Not Allowed')
            .setDescription(
                `${message.author}\n\nSelling items or services is not allowed in this server.`
            )
            .setColor('Red');
    }

    if (badWords.some(word => content.includes(word))) {
        embed = new EmbedBuilder()
            .setTitle('🚫 Inappropriate Language Detected')
            .setDescription(
                `${message.author}\n\nYour message was removed because it contained inappropriate language.\nPlease keep conversations respectful.`
            )
            .setColor('Orange');
    }

    if (!embed) return;

    await message.delete().catch(() => {});

    const warningMsg = await message.channel.send({
        content: `${message.author}`,
        embeds: [embed.setTimestamp()]
    });

    setTimeout(() => {
        warningMsg.delete().catch(() => {});
    }, 5000);
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