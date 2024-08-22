  const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

  module.exports = {
      data: new SlashCommandBuilder()
          .setName('ticket')
          .setDescription('Crée un message pour la création de tickets'),

      async execute(interaction) {
          const embed = new EmbedBuilder()
              .setTitle('🎫 Création d\'un ticket')
              .setDescription('- Cliquez sur le **bouton** ci-dessous pour créer un ticket.\n- Attention, les **règles** seront indiquées dans le ticket.')
              .setFooter({ text: 'Eoly' })
              .setTimestamp()
              .setColor('#3498db');

          const button = new ActionRowBuilder()
              .addComponents(
                  new ButtonBuilder()
                      .setCustomId('ticket')
                      .setLabel('Ticket')
                      .setEmoji('📩')
                      .setStyle(ButtonStyle.Primary)
              );

          await interaction.reply({ embeds: [embed], components: [button] });

          const collector = interaction.channel.createMessageComponentCollector({ filter: i => i.customId === 'ticket' });

          collector.on('collect', async i => {
              if (i.customId === 'ticket') {
                  const ticketChannel = await i.guild.channels.create({
                      name: `ticket-${i.user.username}`,
                      type: ChannelType.GuildText,
                      permissionOverwrites: [
                          {
                              id: i.guild.id,
                              deny: ['ViewChannel'],
                          },
                          {
                              id: i.user.id,
                              allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'],
                          },
                      ],
                  });

                  const ticketEmbed = new EmbedBuilder()
                      .setTitle('💬 Votre ticket')
                      .setDescription('- Ne créez pas de ticket sans raison.\n- Veuillez patienter l\'arrivée d\'un membre du staff.')
                      .setFooter({ text: 'Eoly' })
                      .setTimestamp()
                      .setColor('#3498db')
                      .setThumbnail(i.client.user.displayAvatarURL());

                  const closeButton = new ActionRowBuilder()
                      .addComponents(
                          new ButtonBuilder()
                              .setCustomId('close')
                              .setLabel('Fermer le ticket')
                              .setEmoji('🗑️')
                              .setStyle(ButtonStyle.Danger)
                      );

                  await ticketChannel.send({ embeds: [ticketEmbed], components: [closeButton] });
                  await i.reply({ content: `Votre ticket a été créé: ${ticketChannel}`, ephemeral: true });
              }
          });
      },
  };