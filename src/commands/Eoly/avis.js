const { SlashCommandBuilder } = require('discord.js');
const config = require('../../../config.js');

  module.exports = {
      data: new SlashCommandBuilder()
          .setName('avis')
          .setDescription('Donnez votre avis sur le bot')
          .addStringOption(option =>
              option.setName('avis')
                  .setDescription('Votre avis')
                  .setRequired(true)),
    
      async execute(interaction) {
          try {
              const avis = interaction.options.getString('avis');
              const avisChannel = interaction.client.channels.cache.get(config.channels.avis);

              if (!avisChannel) {
                  return await interaction.reply({ content: 'Le salon d\'avis n\'est pas configuré.', ephemeral: true });
              }

              const avisEmbed = {
                  color: 0x0099ff,
                  title: `L'avis de ${interaction.user.username}`,
                  description: `\`\`\`${avis}\`\`\``,
                  footer: {
                      text: `Exécuté par ${interaction.user.username}`,
                      icon_url: interaction.user.displayAvatarURL(),
                  },
                  timestamp: new Date(),
              };

              const message = await avisChannel.send({ embeds: [avisEmbed] });
              await message.react('⭐');

              await interaction.reply({ content: 'Votre avis a été envoyé avec succès!', ephemeral: true });
          } catch (error) {
              console.error('Erreur lors de l\'exécution de la commande avis:', error);
              if (!interaction.replied && !interaction.deferred) {
                  await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
              } else {
                  await interaction.followUp({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
              }
          }
      },
  };
