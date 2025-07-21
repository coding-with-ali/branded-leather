import { groq } from "next-sanity";

export const allProducts = groq`*[_type == 'product']`;

export const featured = groq`*[_type == 'product' && 'isFeaturedProduct' ]`
export const four = groq`*[_type == 'product'][0..3]`;
export const five = groq`*[_type == 'product'][4..7]`;
export const six = groq`*[_type == 'product'][6..12]`;

export const singleProductQuery = `
  *[_type == "product" && _id == $id][0]{
    _id,
    name,
    price,
    description,
    image {
      asset-> {
        url
      }
    } 
  }
`;

export const allProductsQuery = `
  *[_type == "product"]{
    _id,
    name,
    price,
    description,
    image {
      asset-> {
        url
      }
    }
  }
`;


export const productsByCategory = (categoryTitle: string) => `
  *[_type == "product" && category->title == "${categoryTitle}"]{
    _id,
    name,
    image {
      asset-> {
        url
      }
    },
    priceUSD,
    discountPercentage,
    reviews[] {
      rating
    }
  }
`;

