import useUserStore from '../../store/useUserStore';

const MyPageMain = () => {
  const { user } = useUserStore();

  return (
    <div>
      <h2>{user?.nickname}</h2>
    </div>
  );
};

export default MyPageMain;
