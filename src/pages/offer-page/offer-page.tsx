import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page/not-found-page';
import { MOCK_USERS } from '../../mocks/users';
import { MouseOverLeaveHandler } from '../../components/card-main/card-main';
import Map from '../../components/map/map';
import { useState } from 'react';
import CardMainList from '../../components/card-main-list/card-main-list';
import ReviewList from '../../components/review-list/review-list';
import { useCurrentCity } from '../../store/selectors';
import { Offer } from '../../types/offer';

type OfferPageProps = {
  offers: Offer[];
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id = '' } = useParams();
  const [activeCardId, setActiveCardId] = useState<string>('');
  const currentCity = useCurrentCity();
  const currentOffer = offers.find((offer) => offer.id === id) as Offer;

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const activeCard = offers.find((offer) => offer.id === activeCardId);

  const onMouseOverCard: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    if (evt.currentTarget.dataset.id) {
      setActiveCardId(evt.currentTarget.dataset.id);
    }
  };

  const onMouseLeaveCard: MouseOverLeaveHandler = (evt) => {
    evt.preventDefault();
    setActiveCardId('');
  };

  const host = MOCK_USERS.find((user) => user.name === currentOffer.host.name);

  const gallery = currentOffer.images.map((picture) => (
    <div className="offer__image-wrapper" key={`${id}-gallery-${picture}`}>
      <img className="offer__image" src={picture} alt="Photo studio" />
    </div>
  ));

  const FEATURES_CLASSES_SUFFIXES = ['entire', 'bedrooms', 'adults'];

  const features = currentOffer.goods.map((feature, index) => (
    <li
      className={`offer__feature offer__feature--${FEATURES_CLASSES_SUFFIXES[index]}`}
      key={`${id}-features-${feature}`}
    >
      {feature}
    </li>
  ));

  const inside = currentOffer.goods.map((service) => (
    <li className="offer__inside-item" key={`${id}-inside-${service}`}>
      {service}
    </li>
  ));

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
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
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">{gallery}</div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(currentOffer.rating / 5) * 100}%` }}
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">{features}</ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">{inside}</ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host?.avatar}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host?.name}</span>
                  <span className="offer__user-status">
                    {host?.isPro && 'Pro'}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <ReviewList currentOffer={currentOffer} />
            </div>
          </div>
          <section className="offer__map map container">
            <Map
              city={currentCity}
              offers={offers.slice(0, 3)}
              selectedOffer={activeCard}
              height="579px"
              zoom={13}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <CardMainList
              offers={offers.slice(0, 3)}
              page="offer"
              onMouseOverCard={onMouseOverCard}
              onMouseLeaveCard={onMouseLeaveCard}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
