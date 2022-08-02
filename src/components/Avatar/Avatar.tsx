import { Link } from 'wouter';
import styles from './Avatar.module.scss';

interface IAvatarProps {
  id?: string;
  username?: string;
}

export const Avatar = ({ id, username }: IAvatarProps) => {
  const src = `https://avatars.dicebear.com/api/bottts/${id}.svg`;

  return (
    <Link href={`/user/${username}`} className={styles.root}>
      <a className={styles.root__link}>
        <img src={src} className={styles.root__avatar} />
      </a>
    </Link>
  );
};
