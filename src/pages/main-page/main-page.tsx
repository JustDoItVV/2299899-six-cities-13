import { Helmet } from 'react-helmet-async';
import CardMainList from '../../components/card-main-list/card-main-list';
import { Offer } from '../../mocks/offer';
import { Link } from 'react-router-dom';
import { AppRoute, SORT_OPTIONS } from '../../const';
import Map from '../../components/map/map';
import { useState } from 'react';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import { City } from '../../mocks/city';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import {
  sortPriceHighToLow,
  sortPriceLowToHigh,
  sortTop,
} from './sort-options';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
  cities: string[];
  currentCity: City;
};

function MainPage(props: MainPageProps): JSX.Element {
  const { offersCount, offers } = props;
  const { cities, currentCity } = props;

  const [activeCardId, setActiveCardId] = useState<number | undefined>(
    undefined
  );
  const [activeSort, setActiveSort] = useState<string>(SORT_OPTIONS[0]);
  const [isSortClosed, setIsSortClosed] = useState(true);

  const activeCard = offers.find((offer) => offer.id === activeCardId);
  const sortedOffers = [...offers];
  switch (activeSort) {
    case SORT_OPTIONS[1]:
      sortedOffers.sort(sortPriceLowToHigh);
      break;
    case SORT_OPTIONS[2]:
      sortedOffers.sort(sortPriceHighToLow);
      break;
    case SORT_OPTIONS[3]:
      sortedOffers.sort(sortTop);
      break;
  }

  const onMouseOverCard: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    setActiveCardId(Number(evt.currentTarget.dataset.id));
  };

  const onMouseLeaveCard: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    setActiveCardId(undefined);
  };

  const onSortClick: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    setActiveSort(evt.currentTarget.innerText);
    setIsSortClosed(!isSortClosed);
  };

  const onSortOptionsClick = () => setIsSortClosed(!isSortClosed);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.Main}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={cities} currentCity={currentCity.title} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersCount} places to stay in Amsterdam
              </b>
              <SortOptions
                activeSort={activeSort}
                onSortClick={onSortClick}
                isSortClosed={isSortClosed}
                onSortOptionsClick={onSortOptionsClick}
              />
              <CardMainList
                offers={sortedOffers}
                page="main"
                onMouseOverCard={onMouseOverCard}
                onMouseLeaveCard={onMouseLeaveCard}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={currentCity}
                  offers={offers}
                  selectedOffer={activeCard}
                  height="500px"
                  zoom={10}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
