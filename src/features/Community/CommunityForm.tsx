import { useForm } from 'react-hook-form';
import type { PostForm } from '../../types/communityTypes';
import { useCommunity } from './hooks/useCommunity';
import Input from '../../components/Input';
import Button from '../../components/Button';

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>();

  const { handleAddPostMutate } = useCommunity();

  const onSubmit = async (data: PostForm) => {
    handleAddPostMutate.mutate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto w-full border bg-white shadow md:rounded-xl'
    >
      <h2 className='mb-4 p-5 text-center text-[2rem] font-bold'>
        게시글 작성
      </h2>

      <div className='flex flex-col gap-2 p-5 md:gap-8'>
        <div>
          <label className='p-2 text-[1.6rem] font-bold'>카테고리 선택</label>
          <select
            {...register('category')}
            className='w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-[1.6rem] text-gray-700 shadow-sm transition-all hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
          >
            <option className='font-bold' value='question'>
              질문
            </option>
            <option className='font-bold' value='information'>
              정보
            </option>
          </select>
        </div>

        <div>
          <label className='p-2 text-[1.6rem] font-bold'>제목</label>
          <Input
            {...register('title', { required: '제목을 입력해주세요.' })}
            placeholder='제목'
            className='mb-1 w-full rounded border border-gray-300 pl-5'
          />
          {errors.title && (
            <p className='mb-4 pl-3 text-[1.4rem] text-red-500'>
              {errors.title?.message}
            </p>
          )}
        </div>

        <div>
          <label className='p-2 text-[1.6rem] font-bold'>내용</label>
          <textarea
            {...register('content', { required: '내용을 입력해주세요.' })}
            placeholder='내용'
            className='w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-[1.6rem] shadow-sm transition-all hover:border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
            rows={6}
          />
          {errors.content && (
            <p className='mb-4 pl-3 text-[1.4rem] text-red-500'>
              {errors.content.message}
            </p>
          )}
        </div>

        <div className='flex gap-5'>
          <div className='w-full'>
            <Input
              {...register('nickname', { required: '닉네임을 입력해주세요.' })}
              placeholder='닉네임'
              className='mb-1 w-full rounded border border-gray-300 pl-5'
            />
            {errors.nickname && (
              <p className='mb-4 pl-3 text-[1.4rem] text-red-500'>
                {errors.nickname.message}
              </p>
            )}
          </div>

          <div className='w-full'>
            <Input
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: '비밀번호는 숫자 4자리여야 합니다.',
                },
              })}
              placeholder='4자리 비밀번호'
              type='password'
              className='mb-1 w-full rounded border border-gray-300 pl-5'
            />
            {errors.password && (
              <p className='mb-4 pl-3 text-[1.4rem] text-red-500'>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className='mt-2 w-full rounded-lg border-0 bg-emerald-600 py-3 text-[1.6rem] font-bold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]'
          onClick={() => {}}
        >
          작성하기
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
