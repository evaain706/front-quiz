import type { Post, PostResponse } from '../../../../types/communityTypes';
import { useNavigate } from 'react-router-dom';

const PostGrid = ({ data }: { data: PostResponse }) => {
  const navigate = useNavigate();

  const handleNavigateDetail = (post: Post) => {
    navigate(`/community/detail/${post._id}`);
  };

  return (
    <div className='w-[30rem] overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm md:w-[80rem] md:max-w-[120rem]'>
      <div className='grid grid-cols-3 border-b bg-gray-100 px-4 py-3 text-[1.4rem] font-bold text-white'>
        <p>카테고리</p>
        <p>작성자</p>
        <p>제목</p>
      </div>

      {data?.posts?.length > 0 ? (
        data.posts.map((post: Post) => (
          <div
            key={post._id}
            className='group grid cursor-pointer grid-cols-3 border-b px-4 py-5 text-[1.2rem] transition md:py-10 md:text-[1.4rem]'
            onClick={() => handleNavigateDetail(post)}
          >
            <p
              className={`${
                post.category === 'question'
                  ? 'text-blue-500'
                  : 'text-green-500'
              } font-bold`}
            >
              {post.category === 'question' ? '질문' : '정보'}
            </p>
            <p className='text-black'>{post.nickname}</p>
            <p className='truncate font-bold text-black'>{post.title}</p>
          </div>
        ))
      ) : (
        <p className='py-10 text-center text-[1.6rem] text-gray-400'>
          게시글이 없습니다
        </p>
      )}
    </div>
  );
};

export default PostGrid;
