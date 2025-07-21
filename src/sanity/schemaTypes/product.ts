import { Rule as RuleType } from "@sanity/types";

export const product = {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: RuleType) => Rule.required().error('Name is required'),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
      description: 'Upload an image of the product.',
    },
    {
      name: 'priceUSD',
      type: 'number',
      title: 'Price (USD)',
      validation: (Rule: RuleType) => Rule.required().error('Price is required'),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      validation: (Rule: RuleType) =>
        Rule.min(0).max(100).warning('Discount must be between 0 and 100.'),
    },
    {
      name: 'isFeaturedProduct',
      type: 'boolean',
      title: 'Is Featured Product',
    },
    {
      name: 'stockLevel',
      type: 'number',
      title: 'Stock Level',
      validation: (Rule: RuleType) => Rule.min(0).error('Stock level must be a positive number.'),
    },
    {
      name: 'sizeOptions',
      type: 'array',
      title: 'Available Sizes',
      of: [{ type: 'string' }],
      options: {
        list: ['S', 'M', 'L', 'XL', 'XXL'], // Add more if needed
      },
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Reviewer Name',
              validation: (Rule: RuleType) => Rule.required(),
            },
            {
              name: 'rating',
              type: 'number',
              title: 'Rating',
              validation: (Rule: RuleType) => Rule.min(1).max(5).required(),
            },
            {
              name: 'description',
              type: 'text',
              title: 'Review Description',
            },
          ],
        },
      ],
    },
    {
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{ type: 'categoryType' }],
}
  ],
};
