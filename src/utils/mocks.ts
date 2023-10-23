import { Product, CameraType, CameraLevel, CameraCategory, Promo, Review, Comment } from '../types/types';
import { name, datatype, lorem , image, commerce } from 'faker';

const cameraTypeValues: CameraType[] = ['Коллекционная', 'Моментальная', 'Цифровая', 'Плёночная'];
const cameraLevelValues: CameraLevel[] = ['Нулевой', 'Любительский', 'Профессиональный'];
const cameraCategoryValues: CameraCategory[] = ['Видеокамера', 'Фотоаппарат'];

function getRandomElement<T>(arr : T[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export const makeFakeCamera = () : Product => ({
  id: datatype.number(),
  name: name.firstName(),
  vendorCode: datatype.uuid(),
  type: getRandomElement(cameraTypeValues),
  category: getRandomElement(cameraCategoryValues),
  description: lorem.sentence(),
  level: getRandomElement(cameraLevelValues),
  price: parseFloat(commerce.price()),
  rating: datatype.number({ min: 1, max: 5 }),
  reviewCount: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakePromos = () : Promo[] => (
  new Array(3).fill(null).map(() => (
    {
      id: datatype.number(),
      name: name.firstName(),
      previewImg: image.imageUrl(),
      previewImg2x: image.imageUrl(),
      previewImgWebp: image.imageUrl(),
      previewImgWebp2x: image.imageUrl(),
    }
  ))
);

export const makeFakeProducts = () : Product[] => (
  new Array(5).fill(null).map(() => (
    makeFakeCamera()
  ))
);

export const makeFakeComments = () : Review[] => (
  new Array(6).fill(null).map(() => (
    {
      id: datatype.uuid(),
      createAt: datatype.datetime.toString(),
      cameraId: datatype.number(),
      userName: name.firstName(),
      advantage: lorem.sentence(),
      disadvantage: lorem.sentence(),
      review: lorem.sentences(),
      rating: datatype.number({ min: 1, max: 5 }),
    }
  ))
);

export const makeFakeUserComment = (): Comment => ({
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentences(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeComment = (): Review => ({
  id: datatype.uuid(),
  createAt: datatype.datetime.toString(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.sentences(),
  rating: datatype.number({ min: 1, max: 5 }),
});
