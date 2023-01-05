module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    { content: { type: DataTypes.TEXT, allowNull: false } },
    { charset: "utf8mb4", collate: "utf8mb4_general_ci" } // 한글 + 이모티콘 포함
  );

  // belongsTo 역할

  //예시 : 하나의 코멘트는 사용자 아이디와 포스트 아이디 하나만을 가진다.
  //다수의 사용자 아이디와 포스트 아이디를 가지지 못함.
  // 1 value per 1 column
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
