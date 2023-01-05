module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // MySql에는 users 테이블로 생성됨

    /**
     * DataTypes
     * STRING
     * BOOLEAN
     * TEXT(long text)
     * INTEGER
     * FLOAT
     * DATATIME
     */
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, //id가 기본적으로 설정 : 값 별도 입력하지 않음

    { charset: "utf8", collate: "utf8_general_ci" } //한글 저장
  );

  // 관계 정의
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);

    // 사용자와 게시글의 좋아요 관계
    db.User.belongsToMany(db.Post, {
      through: "Like", // 테이블명 정의
      as: "PostLiked",
    });

    // 팔로잉 & 팔로워 user to user  다:다

    // 내가 팔로잉하는 사람들 찾기
    //
    db.User.belongsToMany(db.User, {
      through: "Follow", // 테이블명
      as: "Followings",
      foreignKey: "FollowerId", //컬럼명
    });

    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });

    // db.User.hasOne(db.UserInfo); 1:1관계
  };

  return User;
};
