import ProductCard from "@/src/components/ProductCard";
import prisma from "@/src/lib/db";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

// 返回内容的框架是固定的，根据路由地址输入获取对应的内容，然后填进框架里

async function getData(category: string) {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  try {
    const data = await prisma.product.findMany({
      where: {
        category: input as CategoryTypes,
      },
      select: {
        id: true,
        images: true,
        smallSummary: true,
        name: true,
        price: true,
      },
    });
  
    return data;
  } catch (error) {
    return null
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // 它用于声明性地标记某个组件或页面为 动态内容，从而阻止该内容被静态缓存。这对于需要始终从服务器获取最新数据的内容非常有用
  noStore();
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            price={product.price}
            name={product.name}
            id={product.id}
            smallSummary={product.smallSummary}
          />
        ))}
      </div>
    </section>
  );
}