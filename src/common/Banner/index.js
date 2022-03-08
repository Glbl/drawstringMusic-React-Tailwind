import BannerImage from '../../assets/Banner.png';

const Banner = () => {
    return (
        <div className="w-full relative">
            <img src={BannerImage} className="w-full h-[360px] object-cover rounded-[30px]" alt="banner" />
            <div className='absolute bottom-8 left-10 flex flex-col space-y-2.5 text-white'>
                <h1 className='font-bold text-[100px] leading-[100px] capitalize'>wale</h1>
                <p className='text-lg pl-3'>1 Album, 12 songs</p>
            </div>
        </div>
    );
};

export default Banner;
