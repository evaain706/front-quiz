import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../apis/instance';

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await instance.post('/api/community/createPost', data);
    reset();
    navigate('/community');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto mt-10 w-full max-w-4xl rounded-xl border bg-white p-6 shadow'
    >
      <h2 className='mb-4 text-xl font-bold'>게시글 작성</h2>

      <select
        {...register('category')}
        className='mb-3 w-full rounded border p-2'
      >
        <option value='question'>질문</option>
        <option value='information'>정보</option>
      </select>

      <input
        {...register('title', { required: '제목을 입력해주세요.' })}
        placeholder='제목'
        className='mb-1 w-full rounded border p-2'
      />
      {errors.title && (
        <p className='mb-3 text-sm text-red-500'>{errors.title?.message}</p>
      )}

      <textarea
        {...register('content', { required: '내용을 입력해주세요.' })}
        placeholder='내용'
        className='mb-1 w-full rounded border p-2'
        rows={5}
      />
      {errors.content && (
        <p className='mb-3 text-sm text-red-500'>{errors.content.message}</p>
      )}

      <input
        {...register('nickname', { required: '닉네임을 입력해주세요.' })}
        placeholder='닉네임'
        className='mb-1 w-full rounded border p-2'
      />
      {errors.nickname && (
        <p className='mb-3 text-sm text-red-500'>{errors.nickname.message}</p>
      )}

      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
          pattern: {
            value: /^[0-9]{4}$/,
            message: '비밀번호는 숫자 4자리여야 합니다.',
          },
        })}
        placeholder='4자리 비밀번호'
        type='password'
        className='mb-1 w-full rounded border p-2'
      />
      {errors.password && (
        <p className='mb-4 text-sm text-red-500'>{errors.password.message}</p>
      )}

      <button className='w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600'>
        작성하기
      </button>
    </form>
  );
};

export default CreatePost;
