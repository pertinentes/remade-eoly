const { InteractionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'close') {
                const channel = interaction.channel;

                const closeEmbed = new EmbedBuilder()
                    .setTitle('🔒 Fermeture du ticket')
                    .setDescription('Êtes-vous sûr de vouloir fermer ce ticket ?')
                    .setColor('#ff0000')
                    .setTimestamp();

                const confirmButtons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('confirm-close')
                            .setLabel('Confirmer')
                            .setStyle(ButtonStyle.Danger),
                        new ButtonBuilder()
                            .setCustomId('cancel-close')
                            .setLabel('Annuler')
                            .setStyle(ButtonStyle.Secondary)
                    );

                try {
                    await interaction.reply({ embeds: [closeEmbed], components: [confirmButtons], ephemeral: true });
                } catch (error) {
                    console.error('Error replying to interaction:', error);
                    return;
                }

                const collector = channel.createMessageComponentCollector({ time: 15000 });

                collector.on('collect', async i => {
                    if (i.customId === 'confirm-close') {
                        try {
                            await channel.delete();
                        } catch (error) {
                            console.error('Error deleting channel:', error);
                            await i.reply({ content: 'Une erreur est survenue lors de la fermeture du ticket.', ephemeral: true });
                        }
                    } else if (i.customId === 'cancel-close') {
                        try {
                            await i.update({ content: 'Fermeture du ticket annulée.', embeds: [], components: [], ephemeral: true });
                        } catch (error) {
                            console.error('Error updating interaction:', error);
                        }
                    }
                });

                collector.on('end', collected => {
                    if (collected.size === 0) {
                        try {
                            interaction.editReply({ content: 'Temps écoulé. Fermeture du ticket annulée.', embeds: [], components: [], ephemeral: true });
                        } catch (error) {
                            console.error('Error editing reply:', error);
                        }
                    }
                });
            }
        } else if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                return interaction.reply({ content: "Commande non reconnue.", ephemeral: true });
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: "Une erreur est survenue lors de l'exécution de cette commande.", ephemeral: true });
                } else {
                    await interaction.reply({ content: "Une erreur est survenue lors de l'exécution de cette commande.", ephemeral: true });
                }
            }
        }
    }
}