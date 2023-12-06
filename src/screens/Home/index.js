import React, { useEffect ,useState} from 'react'
import { connect } from 'react-redux';
import useNews from '../../hooks/useNews';
import Screen from '../../components/common/Screen';
import SearchBar from '../../components/SearchBar';
import FeaturedNews from '../../components/FeaturedNews';
import BreakingNews from '../../components/BreakingNews';
import PoliticalNews from '../../components/PoliticalNews';
import TechNews from '../../components/TechNews';
import EntertainmentNews from '../../components/EntertainmentNews';

const Home = ({...props}) => {

  const [isSearchFocused, setSearchFocused] = useState(false);
  const [
    featuredNews,
    politicalNews,
    entertainmentNews,
    techNews,
    breakingNews,
  ] = useNews();

    useEffect(() => {
        console.log("props ", props);
    }, []);

    return (
      <>
      <Screen isSearchFocused={isSearchFocused}>
        <SearchBar setSearchFocused={setSearchFocused} />
        <FeaturedNews  item={featuredNews} />
        <BreakingNews data={breakingNews} />
        <PoliticalNews data={politicalNews} />
        <TechNews data={techNews} />
        <EntertainmentNews data={entertainmentNews} />
      </Screen>
    </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn,
    }
}
const mapDispatchToProps = (disptach) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
