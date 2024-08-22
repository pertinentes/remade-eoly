const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un membre du serveur')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à muter')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('durée')
                .setDescription('Durée du mute (ex: 1h, 1d, 1w)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison du mute')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const targetMember = interaction.options.getMember('membre');
        const duration = interaction.options.getString('durée');
        const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

        if (!targetMember) {
            return interaction.reply({ content: 'Membre introuvable.', ephemeral: true });
        }

        if (targetMember.id === interaction.user.id) {
            return interaction.reply({ content: 'Vous ne pouvez pas vous muter vous-même.', ephemeral: true });
        }

        if (targetMember.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: 'Vous ne pouvez pas muter ce membre.', ephemeral: true });
        }

        const durationInMs = parseDuration(duration);
        if (!durationInMs) {
            return interaction.reply({ content: 'Durée invalide. Utilisez le format: 1m, 1h, 1d, 1w', ephemeral: true });
        }

        try {
            await targetMember.timeout(durationInMs, reason);

            const embed = {
                color: 0xFF0000,
                title: 'Membre muté',
                description: `${targetMember} a été muté pour ${duration}.`,
                fields: [
                    { name: 'Raison', value: reason },
                    { name: 'Durée', value: duration },
                    { name: 'Modérateur', value: interaction.user.toString() }
                ],
                timestamp: new Date(),
                footer: {
                    text: `ID: ${targetMember.id}`,
                    iconURL: targetMember.user.displayAvatarURL({ dynamic: true })
                }
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors du mute.', ephemeral: true });
        }
    },
};

function parseDuration(duration) {
    const regex = /^(\d+)([mhdw])$/;
    const match = duration.match(regex);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 'm': return value * 60 * 1000;
        case 'h': return value * 60 * 60 * 1000;
        case 'd': return value * 24 * 60 * 60 * 1000;
        case 'w': return value * 7 * 24 * 60 * 60 * 1000;
        default: return null;
    }
}
