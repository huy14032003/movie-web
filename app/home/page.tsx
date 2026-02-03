import Banner from './components/Banner';
import ListMovie from './components/ListMovie';

const HomePage = () => {

  return (
    <div className='px-6 space-y-8'>
      <Banner />
      <div className="bg-[#0f0f0f] px-6 py-4 rounded-xl">
        <ListMovie title="Phim Hàn Quốc mới" />
        <ListMovie title="Phim Trung Quốc mới" />
        <ListMovie title="Phim US-UK mới" />
      </div>
    </div>
  );
};

export default HomePage;
