import PropTypes from "prop-types";
import Link from "next/link";

function AppLayout({ children }) {
  return (
    <div style={{}}>
      <p>공통메뉴</p>

      <Link href="/">
        <a>노드버드</a>
      </Link>

      <Link href="/profile">
        <a>프로필</a>
      </Link>

      <Link href="/signup">
        <a>회원가입</a>
      </Link>
      {children}
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
