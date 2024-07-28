import AdvertisementListing from './components/AdvertisementListing';
import CategorySection from './components/CategorySection';
import {HeroSection} from './components/HeroSection';
import SearchSection from './components/SearchSection';
import useHomePage from './useHomePage';

const HomePage = () => {
  const { advertisements, categories, cities, user, handleLike, handleSave } = useHomePage();

  return (
    <>
      <HeroSection />
      <SearchSection cities={cities} categories={categories} advertisements={advertisements}/>
      <CategorySection categories={categories} />
      <AdvertisementListing advertisements={advertisements} user={user} handleLike={handleLike} handleSave={handleSave} />
    </>
  ); 
};

export default HomePage;
