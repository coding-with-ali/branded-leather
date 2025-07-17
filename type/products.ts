


export interface Product {
  _id: string;
  name: string;
  image?: {
        asset : {
            _ref : "image";
        }
    };
  price: number;
  rating: number;
  reviewCount: number;
  quantity: number;
  primeDelivery: boolean;
  _type: "product";
  description: string;
  category: string;
  sizeOptions: string[];
}
