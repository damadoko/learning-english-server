import User from "./user.model";
import Message from "./message.model";

User.hasMany(Message, {
  foreignKey: "userId",
  as: "messages",
});

Message.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
