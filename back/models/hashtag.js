module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    { name: { type: DataTypes.STRING(20), allowNull: false } },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );

  // post many  == 해쉬태그 many 다:다
  // PostHashtag 테이블이 생성됨 => 검색을 위한

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashTag" });
  }; // 관계 정의

  return Hashtag;
};
