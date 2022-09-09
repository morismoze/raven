import styles from './CharacterCount.module.scss';

interface ICharacterCountProps {
  maxCharactes: number;
  characters: number;
}

const CHARACTER_COUNT_SHOW = 65;

export const CharacterCount = ({
  maxCharactes,
  characters,
}: ICharacterCountProps): JSX.Element | null => {
  if (maxCharactes - characters >= CHARACTER_COUNT_SHOW) {
    return null;
  }

  return (
    <span className={styles.root}>
      <span className={styles.root__characterCount}>
        {maxCharactes - characters}
      </span>{' '}
      characters left
    </span>
  );
};
