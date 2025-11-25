import Button from '../../components/Button';
import Input from '../../components/Input';
import ImageUpload from '../../components/ui/ImageUpload';
import { useEffect, useState } from 'react';
import { privateInstance } from '../../apis/privateInstance';
import { useUserStore } from '../../store/useUserStore';
import { useQuiz } from '../quizComp/hooks/useQuiz';
import type { UserStatistics } from '../../types/statTypes';

const UserSetting = () => {
  const [nickName, setNickName] = useState('');
  const [stats, setStats] = useState<UserStatistics | null>(null);

  const updateUser = useUserStore((s) => s.updateUser);

  const { getUserStatistics } = useQuiz();

  const { user } = useUserStore();

  const handleNickNameUpdate = async () => {
    try {
      const response = await privateInstance.post('/api/auth/update', {
        nickname: nickName,
      });
      console.log(response.data.user.nickname);
      updateUser(response.data.user.nickname);
    } catch (err) {
      console.log(err);
    } finally {
      setNickName('');
    }
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await getUserStatistics();
      setStats(res);
    };

    fetchStatistics();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className='flex w-full flex-col gap-4'>
      <h2 className='text-center text-[2rem] font-bold text-white md:text-[3rem]'>
        유저정보
      </h2>

      <h1>내 통계</h1>
      {stats && (
        <div className='min-h-200 bg-gray-900 p-6 text-white'>
          <h1 className='mb-6 text-3xl font-bold'>내 통계</h1>

          {/* 전체 통계 */}
          <section className='mb-6'>
            <h2 className='mb-4 text-2xl font-semibold'>전체 정답/오답</h2>
            <div className='flex gap-4'>
              <div className='w-32 rounded-xl bg-gray-800 p-4 text-center shadow-md'>
                <p className='text-sm text-gray-400'>정답</p>
                <p className='text-2xl font-bold'>{stats.totalStats.correct}</p>
              </div>
              <div className='w-32 rounded-xl bg-gray-800 p-4 text-center shadow-md'>
                <p className='text-sm text-gray-400'>오답</p>
                <p className='text-2xl font-bold'>
                  {stats.totalStats.incorrect}
                </p>
              </div>
            </div>
          </section>

          {/* 카테고리별 통계 */}
          <section className='mb-6'>
            <h2 className='mb-4 text-2xl font-semibold'>카테고리별 통계</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {Object.entries(stats.categoryStats).map(([name, v]) => (
                <div
                  key={v._id}
                  className='rounded-xl bg-gray-800 p-4 shadow-md'
                >
                  <h3 className='mb-2 text-lg font-semibold'>{name}</h3>
                  <p>
                    ✅ 정답: <span className='font-bold'>{v.correct}</span>
                  </p>
                  <p>
                    ❌ 오답: <span className='font-bold'>{v.incorrect}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 레벨별 통계 */}
          <section className='mb-6'>
            <h2 className='mb-4 text-2xl font-semibold'>레벨별 통계</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
              {Object.entries(stats.levelStats).map(([level, v]) => (
                <div
                  key={v._id}
                  className='rounded-xl bg-gray-800 p-4 shadow-md'
                >
                  <h3 className='mb-2 text-lg font-semibold'>{level}</h3>
                  <p>
                    ✅ 정답: <span className='font-bold'>{v.correct}</span>
                  </p>
                  <p>
                    ❌ 오답: <span className='font-bold'>{v.incorrect}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <h2 className='text-[1.6rem] font-bold text-white'>{user?.nickname}</h2>
      <div className='flex h-[50rem] w-full flex-col items-center justify-around rounded-md bg-slate-300 px-8 md:flex-row'>
        <div>
          <h2 className='text-[1.6rem] font-bold text-black'>닉네임 변경</h2>
          <Input
            name='name'
            placeholder='이름'
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button onClick={handleNickNameUpdate}>하이</Button>
        </div>

        <div className='flex flex-col items-center'>
          <h2 className='text-[1.6rem] font-bold text-black'>
            프로필 이미지 변경
          </h2>
          <ImageUpload initialSrc={user?.profileImage} />
        </div>
      </div>
    </div>
  );
};

export default UserSetting;
