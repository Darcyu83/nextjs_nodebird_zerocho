import AppLayout from "../components/layout/AppLayout";
import Head from "next/head";
import FollowCardList from "../components/FollowCardList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import UserNickEditForm from "../components/forms/UserNickEditForm";

function profile() {
  const followList = [{ nickname: "제로초" }, { nickname: "하하" }];
  const followerList = [{ nickname: "하하" }, { nickname: "제로초" }];

  const { me } = useSelector((state) => state.user);

  // const router = useRouter();
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push("/");
    }
  }, [me]);

  if (!me) return <></>;

  return (
    <>
      <Head>
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* 닉네임 수정 폼 */}
        <UserNickEditForm />
        {/* 팔로우 리스트 */}
        <FollowCardList
          header={"팔로잉 목록"}
          data={!me ? [] : me.Followings}
        />
        {/* 팔로워 리스트 */}
        <FollowCardList header={"팔로워 목록"} data={!me ? [] : me.Followers} />
      </AppLayout>
    </>
  );
}

export default profile;
