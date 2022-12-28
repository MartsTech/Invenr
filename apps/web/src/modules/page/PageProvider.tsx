import Head from 'next/head';
import {APP_NAME} from 'pages/_document';
import type {FC, ReactNode} from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const PageProvider: FC<Props> = ({title, children}) => {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | ${title}`}</title>
      </Head>
      {children}
    </>
  );
};

export default PageProvider;
