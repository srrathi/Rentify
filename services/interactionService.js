const { Sequelize } = require("sequelize");
const PropertyInteractions = require("../models/interactions");
const Property = require("../models/property");
const { INTERACTION_TYPES } = require("../models/utils");
const InterestedProperty = require("../models/interestedProperties");
const { PAGE_SIZE } = require("./utils");

const likeDislikeProperty = async (data) => {
    try {
        const { property_id, user_id, like } = data;
        const interaction = await PropertyInteractions.findOne({ where: { property_id, user_id, interaction_type: INTERACTION_TYPES[0] } });
        if (interaction) {
            await Promise.all([
                PropertyInteractions.update({ is_active: !interaction.is_active }, { where: { property_id, user_id, interaction_type: INTERACTION_TYPES[0] } }),
                Property.update({ no_of_likes: Sequelize.literal(`no_of_likes ${like ? '+' : '-'} 1`) }, { where: { property_id } })
            ])
            return { message: 'Like updated successfully' };
        } else {
            await Promise.all([
                PropertyInteractions.create({ property_id, user_id, interaction_type: INTERACTION_TYPES[0], is_active: true }),
                Property.update({ no_of_likes: Sequelize.literal('no_of_likes + 1') }, { where: { property_id } })
            ])
            return { message: 'Like added successfully' };
        };
    } catch (err) {
        throw err
    }
};

const showInterest = async (data) => {
    try {
        const { property_id, user_id, value, property_user_id } = data;
        await Promise.all([
            InterestedProperty.upsert({ property_id, property_user_id, user_id, value }),
            Property.update({ no_of_interests: Sequelize.literal('no_of_interests + 1') }, { where: { property_id } })
        ]);
        return { message: 'Interest added successfully' };
    } catch (err) {
        throw err
    }
}

const removeInterest = async (data) => {
    try {
        const { property_id, user_id, property_user_id } = data;
        await Promise.all([
            InterestedProperty.update({ is_active: false }, { where: { property_id, user_id, property_user_id } }),
            Property.update({ no_of_interests: Sequelize.literal('no_of_interests - 1') }, { where: { property_id } })
        ])
        return { message: 'Interest removed successfully' };
    } catch (err) {
        throw err
    }
};

const getAllInterestedProperties = async (data) => {
    try {
        const { user_id } = data;
        let page = data.page || 1;
        const offset = (page - 1) * PAGE_SIZE;
        const interestedProperties = await InterestedProperty.findAll({ where: { user_id, is_active: true }, offset, limit: PAGE_SIZE });
        const interestedPropertiesIds = interestedProperties.map(property => property.property_id);

        const properties = await Property.findAll({
            where: {
                property_id: {
                    [Sequelize.Op.in]: interestedPropertiesIds
                },
                is_active: true,
            }
        });
        return properties;
    } catch (err) {
        throw err
    }
};

module.exports = {
    likeDislikeProperty,
    showInterest,
    removeInterest,
    getAllInterestedProperties,
}