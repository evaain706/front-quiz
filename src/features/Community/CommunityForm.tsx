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
      className='mx-auto h-full w-full border bg-white shadow md:rounded-xl'
    >
      <h2 className='mb-4 p-5 text-center text-[2rem] font-bold'>
        게시글 작성
      </h2>

      <div className='flex flex-col gap-2 p-5 md:gap-8'>
        <div>
          <label className='p-2 text-[1.6rem] font-bold'>카테고리 선택</label>
          <select
            {...register('category')}
            className='mb-3 w-full rounded-lg border-2 border-gray-600 bg-white p-2 px-4 py-4 text-[1.6rem] text-black'
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
            className='mb-1 w-full rounded border-2 border-gray-600 pl-5'
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
            className='mb-1 w-full rounded border-2 border-gray-600 p-2 text-[1.6rem] font-bold'
            rows={5}
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
              className='mb-1 w-full rounded border-2 border-gray-600 pl-5'
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
              className='mb-1 w-full rounded border-2 border-gray-600 pl-5'
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
          className='w-full self-center rounded'
          onClick={() => {}}
        >
          작성하기
        </Button>
      </div>
    </form>
  );
};

export default CreatePost;
