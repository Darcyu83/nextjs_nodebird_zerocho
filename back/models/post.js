module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 한글 + 이모티콘 포함
      collate: "utf8mb4_general_ci",
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashTag" });

    // 사용자와 게시물의 좋아요 관계
    db.Post.belongsToMany(
      db.User,

      {
        through: "Liked", // 테이블명 정의
        as: "UserLiked",
      }
    );

    // retweet 리트윗 포스트는 하나의 메인 포스트 아이디를 가진다.
    // Post 테이블에 postId가 된다. => as 구문으로 retweet로 컬럼명 변경
    // postId => retweetId

    // parentPostId 일 : retweetId 다
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
