const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('finish')
        .setDescription('Verrouille un thread')
        .addStringOption(option =>
            option.setName('thread_name')
                .setDescription('Le nom du thread à verrouiller')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageThreads),

    async execute(interaction) {
        let thread;

        if (interaction.channel.isThread()) {
            thread = interaction.channel;
        } else {
            const threadName = interaction.options.getString('thread_name');
            if (!threadName) {
                return interaction.reply({ content: 'Veuillez spécifier le nom du thread à verrouiller ou exécuter cette commande dans un thread.', ephemeral: true });
            }
            thread = interaction.guild.channels.cache.find(channel => channel.isThread() && channel.name === threadName);
            if (!thread) {
                return interaction.reply({ content: 'Aucun thread trouvé avec ce nom.', ephemeral: true });
            }
        }

        if (thread.locked) {
            return interaction.reply({ content: 'Ce thread est déjà verrouillé.', ephemeral: true });
        }

        try {
            await thread.setLocked(true);
            await thread.setArchived(true);
            await interaction.reply({ content: `Le thread ${thread.name} a été verrouillé et archivé avec succès.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors du verrouillage du thread.', ephemeral: true });
        }
    },
};
