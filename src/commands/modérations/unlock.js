const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Permet d\'ouvrir un salon')
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('Le channel à unlock')
                .setRequired(false)),
    
    async execute(interaction) {
        const channel = interaction.options.getChannel('salon') || interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });

            const successEmbed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🔑 Ouverture des portes')
                .setDescription(`> Le **salon est ouvert** par <@${interaction.user.id}> !`)
                .setFooter({ 
                    text: `Exécuté par ${interaction.user.username}`, 
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp();

            await channel.send({ embeds: [successEmbed] });
            
            if (channel.id !== interaction.channelId) {
                await interaction.reply({ content: '✔️ Salon ouvert avec succès', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('Impossible de déverrouiller le salon');
            
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};