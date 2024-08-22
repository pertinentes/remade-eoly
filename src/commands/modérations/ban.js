const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un membre du serveur')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à bannir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('La raison du bannissement')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const targetUser = interaction.options.getUser('membre');
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({ content: "Vous n'avez pas la permission de bannir des membres.", ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: "Ce membre n'est pas dans le serveur.", ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: "Je ne peux pas bannir ce membre. Il a peut-être un rôle supérieur au mien.", ephemeral: true });
        }

        await member.ban({ reason: reason });

        const embed = {
            color: 0xFF0000,
            title: 'Membre banni',
            description: `${targetUser.tag} a été banni du serveur.`,
            fields: [
                { name: 'Raison', value: reason },
                { name: 'Banni par', value: interaction.user.tag }
            ],
            timestamp: new Date(),
            footer: {
                text: `ID: ${targetUser.id}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }
        };

        await interaction.reply({ embeds: [embed] });
    },
};
