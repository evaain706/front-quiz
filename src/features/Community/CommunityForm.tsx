import { useForm } from 'react-hook-form';
import type { PostForm } from '../../types/communityTypes';
import { useCommunity } from './hooks/useCommunity';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/svg/BackIcon';
import { useEffect } from 'react';

const CommunityForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const postToEdit = location.state?.post;
  const isEditMode = !!postToEdit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>();

  const { handleAddPostMutate, handleEditPostMutation } = useCommunity();

  useEffect(() => {
    if (isEditMode && postToEdit) {
      reset({
        title: postToEdit.title,
        content: postToEdit.content,
        category: postToEdit.category,
        nickname: postToEdit.nickname,
      });
    }
  }, [isEditMode, postToEdit, reset]);

  const onSubmit = async (data: PostForm) => {
    if (isEditMode) {
      handleEditPostMutation.mutate(
        { ...data, postId: postToEdit._id },
        {
          onSuccess: () => {
            navigate(`/community/detail/${postToEdit._id}`);
          },
        },
      );
    } else {
      handleAddPostMutate.mutate(data, {
        onSuccess: () => {
          navigate('/community');
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto w-full border bg-white p-10 shadow md:rounded-xl'
    >
      <div className='relative mb-6 flex flex-col items-center'>
        <h1 className='text-[3rem] font-bold'>
          {isEditMode ? '게시글 수정' : '새 게시글 작성'}
        </h1>

        <Button
          onClick={() => navigate(-1)}
          className='mt-4 w-20 md:absolute md:right-0 md:mt-0'
        >
          <BackIcon />
        </Button>
      </div>

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
              disabled={isEditMode}
            />
            {errors.nickname && (
              <p className='mb-4 pl-3 text-[1.4rem] text-red-500'>
                {errors.nickname.message}
              </p>
            )}
          </div>

          {!isEditMode && (
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
          )}
        </div>

        <Button
          type='submit'
          className='mt-2 w-full rounded-lg border-0 bg-emerald-600 py-3 text-[1.6rem] font-bold text-white shadow-md transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-[0.98]'
        >
          {isEditMode ? '수정하기' : '작성하기'}
        </Button>
      </div>
    </form>
  );
};

export default CommunityForm;
