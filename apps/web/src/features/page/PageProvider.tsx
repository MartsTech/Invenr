import {styled} from '@mui/material';
import Head from 'next/head';
import {APP_NAME} from 'pages/_document';
import type {FC, ReactNode} from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const PageProvider: FC<Props> = ({title, children}) => {
  return (
    <StyledWrapper>
      <Head>
        <title>{`${APP_NAME} | ${title}`}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      {children}
    </StyledWrapper>
  );
};

export default PageProvider;

const StyledWrapper = styled('div')(() => ({
  position: 'relative',
  overflowX: 'hidden',
  overflowY: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
