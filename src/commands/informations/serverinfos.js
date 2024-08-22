
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Affiche les informations du serveur'),

    async execute(interaction) {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();
        const createdTimestamp = Math.floor(guild.createdAt.getTime() / 1000);

        const members = await guild.members.fetch();
        const totalMembers = members.size;
        const humanMembers = members.filter(member => !member.user.bot).size;
        const botMembers = members.filter(member => member.user.bot).size;

        const channels = guild.channels.cache;
        const roles = guild.roles.cache;

        const embed = {
            color: 0x3498db,
            title: guild.name,
            author: {
                name: "Informations du serveur"
            },
            thumbnail: {
                url: guild.iconURL({ dynamic: true, size: 512 })
            },
            fields: [
                {
                    name: '__Informations Général__',
                    value: `> **ID** : \`${guild.id}\`\n` +
                           `> **Propiétaire du serveur** : ${owner}\n` +
                           `> **Sécurité du serveur:** \`\`${guild.verificationLevel || 'Aucune'}\`\`\n` +
                           `> **Date de création du serveur** : <t:${createdTimestamp}:f> (<t:${createdTimestamp}:R>)\n` +
                           `>  **Boost** : \`${guild.premiumSubscriptionCount}\`(\`Tier : ${guild.premiumTier}\`)`,
                    inline: false
                },
                {
                    name: '__Informations Membres__',
                    value: `> **Membres totaux** : \`${totalMembers}\` \n` +
                           `> **Membres** : \`${humanMembers}\`\n` +
                           `> **Bot** : \`${botMembers}\``,
                    inline: false
                },
                {
                    name: '__Informations Statistiques__',
                    value: `> **Rôles :** \`${roles.size}\` \n` +
                           `> **Emojis :** \`${guild.emojis.cache.size}\` \n` +
                           `> **Salons** : \`${channels.size}\`\n` +
                           `> **Catégories :** \`${channels.filter(c => c.type === 4).size}\`\n` +
                           `> **Textuels :** \`${channels.filter(c => c.type === 0).size}\`\n` +
                           `> **Vocals :** \`${channels.filter(c => c.type === 2).size}\`\n` +
                           `> **Annonces :** \`${channels.filter(c => c.type === 5).size}\`\n` +
                           `> **Stages :** \`${channels.filter(c => c.type === 13).size}\`\n` +
                           `> **Forum :** \`${channels.filter(c => c.type === 15).size}\`\n` +
                           `> **Fils :** \`${channels.filter(c => c.type === 11).size}\`\n` +
                           `> **Règlement :** \`${guild.rulesChannel ? guild.rulesChannel.toString() : 'Aucun'}\``,
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `Exécuté par ${interaction.user.globalName || interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};
