import React from "react";
import PropType from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";

function _app({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NodeBird</title>
        <meta charSet="utf-8" />
      </Head>
      <p>Header</p>
      <Component {...pageProps} />
      <p>Footer</p>
    </div>
  );
}

_app.propTypes = {
  Component: PropType.elementType.isRequired,
  pageProps: PropType.object.isRequired,
};
export default wrapper.withRedux(_app); //HOC
