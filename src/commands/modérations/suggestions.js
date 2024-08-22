const { SlashCommandBuilder } = require('discord.js');
const config = require('../../../config.js');

  module.exports = {
      data: new SlashCommandBuilder()
          .setName('suggestion')
          .setDescription('Faites une suggestion')
          .addStringOption(option =>
              option.setName('suggestion')
                  .setDescription('Votre suggestion')
                  .setRequired(true)),
  
      async execute(interaction) {
          try {
              const suggestion = interaction.options.getString('suggestion');
              const suggestionChannel = interaction.client.channels.cache.get(config.channels.suggestions);

              if (!suggestionChannel) {
                  return await interaction.reply({ content: 'Le salon de suggestions n\'est pas configuré.', ephemeral: true });
              }

              const suggestionEmbed = {
                  color: 0x0099ff,
                  title: 'Nouvelle Suggestion',
                  description: suggestion,
                  footer: {
                      text: `Suggestion de ${interaction.user.tag}`,
                      icon_url: interaction.user.displayAvatarURL(),
                  },
                  timestamp: new Date(),
              };

              const message = await suggestionChannel.send({ embeds: [suggestionEmbed] });
              await message.react('👍');
              await message.react('👎');

              await interaction.reply({ content: 'Votre suggestion a été envoyée avec succès!', ephemeral: true });
          } catch (error) {
              console.error('Erreur lors de l\'exécution de la commande suggestion:', error);
              if (!interaction.replied && !interaction.deferred) {
                  await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true }).catch(console.error);
              } else {
                  await interaction.followUp({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true }).catch(console.error);
              }
          }
      },
};