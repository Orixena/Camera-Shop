import { RequestStatus } from '../const';

type CameraType = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
type CameraLevel = 'Нулевой' | 'Любительский' | 'Профессиональный';
type CameraCategory = 'Видеокамера' | 'Фотоаппарат';

export type Product = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevel;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  }

export type ProductsData = {
  products: Product[];
  fetchingStatusProducts: RequestStatus;
}

