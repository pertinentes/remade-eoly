const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Permet de fermée un salon')
        .addChannelOption(option =>
            option.setName('salon')
                .setDescription('La channel a lock')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('La raison du lock')
                .setRequired(false)),
    
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const reason = interaction.options.getString('raison') || 'Aucune raison donnée';

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });

            const successEmbed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🚪 Fermeture des portes')
                .setDescription(`> Le **salon est fermé** par <@${interaction.user.id}> !\n> Raison : \n\`\`\`${reason}\`\`\``)
                .setFooter({ 
                    text: `Exécuté par ${interaction.user.username}`, 
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp();

            await channel.send({ embeds: [successEmbed] });
            
            if (channel.id !== interaction.channelId) {
                await interaction.reply({ content: '✔️ Salon fermé avec succès', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('Impossible de verrouiller le salon');
            
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};