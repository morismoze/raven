import { Error, Header, HeaderLayout } from '@/components';
import styles from './FourZeroFour.module.scss';

const FOUR_ZERO_FOUR_POST_TITLE = '404';
const FOUR_ZERO_FOUR_POST = "The page You were looking for doesn't exist.";

export const FourZeroFour = (): JSX.Element => {
  return (
    <>
      <Header />
      <HeaderLayout className={styles.root}>
        <Error
          title={FOUR_ZERO_FOUR_POST_TITLE}
          text={FOUR_ZERO_FOUR_POST}
          reload={false}
        />
      </HeaderLayout>
    </>
  );
};
