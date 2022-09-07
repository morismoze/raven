import { Link } from 'wouter';
import styles from './Avatar.module.scss';

interface IAvatarProps {
  id?: number;
  username?: string;
  size?: number;
}

export const Avatar = ({
  id,
  username,
  size = 40,
}: IAvatarProps): JSX.Element | null => {
  if (!id) {
    return null;
  }

  const src = `https://avatars.dicebear.com/api/bottts/${id}.svg`;

  return (
    <Link href={`/user/${username}`} className={styles.root}>
      <a className={styles.root__link} style={{ width: size, height: size }}>
        <img src={src} className={styles.root__avatar} />
      </a>
    </Link>
  );
};
