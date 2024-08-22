const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Donne les informations sur un utilisateur')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Vise un utilisateur pour voir ses infos')
                .setRequired(false)),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('membre') || interaction.user;
        const member = await interaction.guild.members.fetch(targetUser.id);

        const createdTimestamp = Math.floor(targetUser.createdAt.getTime() / 1000);
        const joinedTimestamp = Math.floor(member.joinedAt.getTime() / 1000);

        const badges = targetUser.flags ? targetUser.flags.toArray().map(flag => `\`${flag}\``).join(', ') : '❌';
        const status = member.presence ? member.presence.status : 'offline';
        const statusEmoji = {
            online: '🟢',
            idle: '🟡',
            dnd: '🔴',
            offline: '⚫'
        };

        const embed = {
            color: 0x3498db,
            title: `Informations sur ${targetUser.username}`,
            thumbnail: {
                url: targetUser.displayAvatarURL({ dynamic: true, size: 512 })
            },
            fields: [
                {
                    name: '__Informations de l\'utilisateur__',
                    value: `> **Pseudo** : \`${targetUser.username}\`\n` +
                           `> **ID :** \`${targetUser.id}\`\n` +
                           `> **Badges** : ${badges}\n` +
                           `> **Status :** ${statusEmoji[status]} \n` +
                           `> **Bot** : ${targetUser.bot ? '✅' : '❌'}\n` +
                           `> **Date de création du compte** : <t:${createdTimestamp}:f> (<t:${createdTimestamp}:R>)`,
                    inline: false
                },
                {
                    name: '__Informations sur le serveur__',
                    value: `> **Rôles (${member.roles.cache.size})** : ${member.roles.cache.map(role => role.toString()).join(' ')}\n` +
                           `> **Date d'arrivée sur le serveur** : <t:${joinedTimestamp}:f> (<t:${joinedTimestamp}:R>)`,
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
