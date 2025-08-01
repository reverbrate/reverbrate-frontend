import React from 'react';
import styles from './styles.module.scss';
import RankingTracks from './tracks/rankingTracks';
import RankingLists from './lists/rankingLists';

export default function Rankings() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <RankingTracks />
        <RankingLists />
      </div>
    </div>
  );
}
