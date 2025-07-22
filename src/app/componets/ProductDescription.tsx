import React from 'react';
import { PortableText } from '@portabletext/react';

const ProductDescription = ({ description }: { description: any }) => {
  return (
    <div className="prose max-w-none">
      <PortableText value={description} />
    </div>
  );
};

export default ProductDescription;
