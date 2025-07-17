import Link from "next/link";
import ProductSection from "../../componets/ProductSection";

const Home: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="w-full h-[286px] bg-black relative">
        <div className="absolute top-48 left-10 md:top-20 md:left-60">
          <h2 className="text-white font-dancing lg:font-[forte] text-[36px] md:text-[36px] font-[800]">
            Product Details
          </h2>
          <Link href="/" className="px-2 text-white font-playfair">
            Home
          </Link>
          <span className="px-2 text-white ">/</span>
          <Link href="/products" className="px-2 text-white font-playfair">
            Page
          </Link>
          <span className="text-white text-[16px] font-[500] px-2 font-playfair">
            Shop Lists
          </span>
        </div>
      </div>

    {/* Sidebar and Product List */}
    <div >
      <main >
        <div className="p-4">
          <ProductSection  />
        </div>
      </main>
    </div>
    </div>
  );
};

export default Home;
