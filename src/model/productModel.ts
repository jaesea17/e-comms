import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'

interface ProductAttributes {
    id: string;
    name: string,
    image: string,
    brand: string,
    category: string,
    description: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
    userId: string
}

export class ProductInstance extends Model<ProductAttributes>{ }

ProductInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    countInStock: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    rating: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numReviews: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    tableName: 'products'
})