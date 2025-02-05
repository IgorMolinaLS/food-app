import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

const products = await db.product.findMany({
  where: {
    discountPercentage: {
      gt: 0,
    },
  },
  take: 10,
  include: {
    restaurant: {
      select: {
        name: true,
      },
    },
  },
});

const Home = () => {
  return (
    <div className="">
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas!"
        />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5 font-semibold">
          <h2>Pedidos recomendados</h2>
          <Button
            variant="ghost"
            className="h-1 p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />

        <div className="px-5 pt-6">
          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches!"
          />
        </div>

        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between px-5 font-semibold">
            <h2>Restaurantes recomendados</h2>
            <Button
              variant="ghost"
              className="h-1 p-0 text-primary hover:bg-transparent"
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default Home;
