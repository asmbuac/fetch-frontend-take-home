import DogOne from '@/assets/images/dog-1.webp';
import BlobOne from '@/assets/svgs/blob-1';

const LoginDogGraphic = () => (
  <div className="relative hidden md:flex md:h-full md:items-center md:justify-center">
    <BlobOne width={600} className="absolute z-0" />
    <img
      src={DogOne}
      alt="Login Dog Image"
      loading="lazy"
      width={600}
      className="z-10"
    />
    <div className="absolute right-56 top-12 z-0 h-[350px] w-[400px] bg-gradient-radial from-fetch-tertiary/50 to-[transparent_70%]" />
  </div>
);

export default LoginDogGraphic;
