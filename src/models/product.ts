import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
} from 'sequelize';

interface ProductAttributes {
  idProduct: number;
  name: string;
  amount: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'idProduct'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public idProduct!: number;
  public name!: string;
  public amount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const productBuild = (sequelize: Sequelize) => {
  Product.init(
    {
      idProduct: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
      amount: DataTypes.NUMBER,
    },
    {
      sequelize,
      tableName: 'product',
    },
  );
};

export default Product;
