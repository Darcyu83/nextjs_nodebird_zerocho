import PropTypes from "prop-types";
import Link from "next/link";

function PostCardContent({ content }) {
  return (
    <div>
      {content.split(/(#[^\s#]+)/g).map((text, idx) => {
        if (text.includes("#")) {
          return (
            <Link key={text + idx} href={`/hashtag/${text}`}>
              {text}
            </Link>
          );
        }

        return text;
      })}
    </div>
  );
}

PostCardContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostCardContent;
