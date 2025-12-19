import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

const CommentForm = ({
  postId,
  mutate,
  isLoading,
}: {
  postId: string;
  mutate: any;
  isLoading: boolean;
}) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!nickname.trim() || !comment.trim()) return;

    mutate.mutate({ postId, nickname, content: comment, password });
    setNickname('');
    setComment('');
    setPassword('');
  };

  return (
    <div className='p-6 shadow-sm ring-1 ring-slate-100'>
      <h3 className='mb-5 text-[1.6rem] font-bold'>댓글 작성</h3>

      <div className='space-y-4'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Input
            type='text'
            placeholder='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            type='password'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <textarea
          placeholder='댓글 내용을 입력하세요...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className='w-full rounded-lg border border-slate-200 p-3 text-[1.6rem] shadow-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
        />

        <div className='flex justify-end'>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !nickname.trim() || !comment.trim()}
            className='border-none bg-green-700 text-white hover:bg-green-600'
          >
            {isLoading ? '작성 중...' : '작성'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
