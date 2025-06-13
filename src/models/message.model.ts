import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface MessageAttributes {
  id: string;
  userId: string;
  role: string;
  content: string;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, "id"> {}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id!: string;
  public userId!: string;
  public role!: string;
  public content!: string;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING, // 'user' | 'assistant'
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT, // 'user' | 'assistant'
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: true,
  }
);

export default Message;
