import AppLayout from "../components/layout/AppLayout";
import Head from "next/head";
import UserNickEditForm from "../components/UserNickEditForm";
import FollowCardList from "../components/FollowCardList";
import { useSelector } from "react-redux";
function profile() {
  const followList = [{ nickname: "제로초" }, { nickname: "하하" }];
  const followerList = [{ nickname: "하하" }, { nickname: "제로초" }];

  const {
    me: { posts, nickname, followings, followers },
  } = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* 닉네임 수정 폼 */}
        <UserNickEditForm />
        {/* 팔로우 리스트 */}
        <FollowCardList header={"팔로잉 목록"} data={followings} />
        {/* 팔로워 리스트 */}
        <FollowCardList header={"팔로워 목록"} data={followers} />
      </AppLayout>
    </>
  );
}

export default profile;
