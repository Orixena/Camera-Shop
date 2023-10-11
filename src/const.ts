export const PRODUCTS_PRO_PAGE = 9;

export const MAX_PAGINATION_PAGES_COUNT = 3;

export enum AppRoute {
  Main = '/',
  Product = '/product/:id',
  Basket = '/basket',
  Catalogue = '/',
  Guarantees = '/',
  Delivery = '/',
  AboutCompany = '/',
  NotFound = '*',
}

export enum FetchingNameSpace {
  Products = 'PRODUCTS',
  Product = 'PRODUCT',
  Promo = 'PROMO',
}

export enum RequestStatus {
  Unsent = 'UNSENT',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export enum APIRoute {
  Products = '/cameras',
  Promo = '/promo',
  ActiveProduct = '/cameras/',
}

