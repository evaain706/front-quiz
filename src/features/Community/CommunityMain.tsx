import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../apis/instance';

const CommunityMain = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await instance.get('/api/community/getPost');
        setData(response.data);
      } catch (error) {
        console.error('데이터를 불러오지 못했습니다:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleNavigateDetail = (post: any) => {
    navigate(`/community/detail/${post._id}`);
  };

  return (
    <div className='flex w-[120rem] flex-col items-center justify-center gap-5 p-10'>
      <h1 className='mb-6 text-2xl font-bold'>커뮤니티 게시판</h1>

      <div className='w-full rounded-xl border border-gray-300 bg-white shadow'>
        <div className='grid grid-cols-3 border-b bg-gray-100 px-4 py-2 font-semibold'>
          <span>카테고리</span>
          <span>작성자</span>
          <span>제목</span>
        </div>

        {data.map((post: any) => (
          <div
            key={post._id}
            className='grid cursor-pointer grid-cols-3 border-b px-4 py-3 transition hover:bg-gray-50'
            onClick={() => handleNavigateDetail(post)}
          >
            <span
              className={`${
                post.category === 'question'
                  ? 'text-blue-500'
                  : 'text-green-500'
              } font-medium`}
            >
              {post.category === 'question' ? '질문' : '정보'}
            </span>
            <span className='text-gray-700'>{post.nickname}</span>
            <span className='truncate text-gray-900'>{post.title}</span>
          </div>
        ))}
      </div>

      <button
        className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        onClick={() => navigate('/community/create')}
      >
        새 글 작성
      </button>
    </div>
  );
};

export default CommunityMain;
