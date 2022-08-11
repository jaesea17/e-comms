import { DataTypes, ForeignKeyConstraintError, Model } from 'sequelize';
import db from '../config/database.config'
import { ProductInstance } from './productModel';

interface UserAttributes {
    id: string;
    fullname: string;
    email: string,
    gender: string,
    phone: string,
    address: string,
    password: string
}

export class UserInstance extends Model<UserAttributes>{ }

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name is required'
            },
            notEmpty: {
                msg: 'please enter name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Enter a valid email'
            },
        }
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Phone number is required'
            },
            notEmpty: {
                msg: 'Enter a phone number'
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    }
}, {
    sequelize: db,
    tableName: 'user'
})

//Establishing the one to many relationship
UserInstance.hasMany(ProductInstance, { foreignKey: 'userId', as: 'products' });
ProductInstance.belongsTo(UserInstance, { foreignKey: 'userId', as: 'user' });

