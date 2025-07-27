'use client';

import { useQueryClient } from '@tanstack/react-query';
import Error from '../components/base/error/error';
import Follow from '../components/follow/follow';
import FollowSkeleton from '../components/follow/followSkeleton/followSkeleton';
import List from '../components/list/list';
import NavBar from '../components/navBar/navBar';
import ReviewList from '../components/reviewList/reviewList';
import ReviewListSkeleton from '../components/reviewList/reviewListSkeleton/reviewListSkeleton';
import UserInfo from '../components/userInfo/userInfo';
import UserInfoSkeleton from '../components/userInfo/userInfoSkeleton/userInfoSkeleton';
import { useLists } from '../hooks/useLists';
import { useProfile } from '../hooks/useProfile';
import styles from './styles.module.scss';

export default function Profile() {
  const queryClient = useQueryClient();
  const { getProfile } = useProfile(queryClient);
  const { fetchLists } = useLists();

  const { data: profile, isLoading, isFetching, isError } = getProfile();
  const { data: list } = fetchLists();

  return (
    <>
      <NavBar />
      <main className={styles.container}>
        {isError ? (
          <Error />
        ) : (
          <>
            <section className={styles.userWrapper}>
              {isLoading ? (
                <UserInfoSkeleton />
              ) : (
                profile && (
                  <UserInfo
                    id={profile.id}
                    name={profile.name}
                    nickname={profile.nickname}
                    bio={profile.bio}
                    image={profile.image}
                    isEditable
                    isFetching={isFetching}
                  />
                )
              )}
              {isLoading ? (
                <FollowSkeleton />
              ) : (
                profile && <Follow network={profile.network} hasFollow={false} />
              )}
            </section>
            <section className={styles.contentWrapper}>
              {isLoading ? (
                <ReviewListSkeleton />
              ) : (
                profile && <ReviewList title="Avaliações recentes" reviews={profile.reviews} />
              )}

              {isLoading ? (
                <ReviewListSkeleton />
              ) : (
                profile && <List title="Listas" lists={list?.data ?? []} isEditable />
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
