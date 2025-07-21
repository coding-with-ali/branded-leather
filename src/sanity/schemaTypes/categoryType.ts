const categoryType = {
  name: 'categoryType',
  title: 'Category Type',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default categoryType;