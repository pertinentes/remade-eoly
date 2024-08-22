const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Ferme un thread ouvert')
        .addStringOption(option =>
            option.setName('thread_name')
                .setDescription('Le nom du thread à fermer')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads),

    async execute(interaction) {
        let thread;

        if (interaction.channel.isThread()) {
            thread = interaction.channel;
        } else {
            const threadName = interaction.options.getString('thread_name');
            if (!threadName) {
                return interaction.reply({ content: 'Veuillez spécifier le nom du thread à fermer ou exécuter cette commande dans un thread.', ephemeral: true });
            }
            thread = interaction.guild.channels.cache.find(channel => channel.isThread() && channel.name === threadName);
            if (!thread) {
                return interaction.reply({ content: 'Aucun thread trouvé avec ce nom.', ephemeral: true });
            }
        }

        if (thread.archived) {
            return interaction.reply({ content: 'Ce thread est déjà fermé.', ephemeral: true });
        }

        try {
            await thread.setArchived(true);
            await interaction.reply({ content: `Le thread ${thread.name} a été fermé avec succès.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de la fermeture du thread.', ephemeral: true });
        }
    },
};
