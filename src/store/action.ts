import { Offer } from '../types/offer';
import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';

export const updateCity = createAction<string>('updateCity');

export const updateOffers = createAction<Offer[]>('updateoffers');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const loadNearOffers = createAction<Offer[]>('data/loadNearOffers');

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);

export const setError = createAction<string | null>('data/setError');

export const setOffersLoadingStatus = createAction<boolean>(
  'data/setOffersLoadingStatus'
);

export const setOfferLoadingStatus = createAction<boolean>(
  'data/setOfferLoadingStatus'
);

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

export const setCurrentUser = createAction<UserData | null>(
  'data/setCurrentUser'
);
