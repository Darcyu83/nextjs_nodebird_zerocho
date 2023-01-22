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
    //hasMany()  복수로 변수명이 정의됨
    //
    // post.addUser post.getUser
    db.Post.belongsTo(db.User);
    //post.addComments post.getComments
    db.Post.hasMany(db.Comment);
    // post.addImages post.getImages
    db.Post.hasMany(db.Image);
    //post.addHashtags post.getHashtags
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashTag" });

    // 사용자와 게시물의 좋아요 관계

    // post.addLikers post.getLikers

    // get(include:{model: Liked}) include를 많이씀
    // add remove set(바꿈 업데이트)
    db.Post.belongsToMany(
      db.User,

      {
        through: "Like", // 테이블명 정의
        as: "Likers",
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
