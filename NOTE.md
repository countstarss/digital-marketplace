## Tiptap中需要注意的地方

1. 通过editorProps编辑属性
``` tsx
const editor = useEditor({
    extensions: [StarterKit],
    // content: '<p>Hello World! 🌎️</p>',
    editorProps:{
      attributes :{
        class :"focus:outline-none min-h-[100px]"
      }
    }
})
```

2. MenuBar的自定义按钮无法生效，需要添加一个Tailwind插件

- npm install -D @tailwindcss/typography
- [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- 添加这些属性 prose prose-slate prose-sm sm:prose-base ，编辑器就能正常使用了

## Prisma

1. 下载之后，首先需要初始化Prisma
   `npx prisma init`

2. 修改之后，可以Generate
   `npx prisma generate`

3. 如果需要迁移
   `npx prisma migrate`

4. 也可以直接推送到数据库端
   `npx prisma sb push`


## actions.ts中需要注意的部分

1. 我们使用zod确定了数据验证规则之后，下一步就是使用这些验证过的数据，所以我们就需要获取，获取的时候是通过name属性
   但不是所有的内容都通过Input等标签存储，有一个办法是：在组件中添加一个hidden类型的Input标签，设置name为目标值，使用value保存值
   `<input type="hidden" name='category' value={selectedCategory || ""}/>` SelectedCategory.tsx

## 如何使用Zod

1. 首先，要进行验证的数据要有name属性，这样才能获取到
2. 第一步，创建Zod Schema，定义数据的验证规则
3. 第二步，创建validateFields,获取到有效数据
   ``` ts
   const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
   });
   ```
4. 第三步，判断 ！validateFields.success,如果不是全部符合条件，就返回Error State

## 配置next.config.mjs使用外部图片

``` ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
        port: "",
      },
    ],
  },
};
export default nextConfig;
```

## 数据库获取数据实践

1. 从数据库中取数据要做好错误规避，在Server Side使用try catch包裹一下
2. 在页面中获取数据渲染时，也要判断是否有数据存在，然后才去渲染
3. **！！！否则会导致一旦取不到数据，应用马上崩溃**

``` tsx
// 最佳实践
'use client'
import React, { useState, useEffect } from 'react';
import prisma from '../lib/db';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

type Props = {};

async function fetchData() {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        smallSummary: true,
        description: true,
        images: true,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const NewestProducts = (props: Props) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataWithLocalStorage = async () => {
      // 先从本地存储中读取数据
      const localData = typeof window !== "undefined" ? localStorage.getItem('products') : null;
      if (localData) {
        setData(JSON.parse(localData));
        setLoading(false);
      }

      try {
        const result = await fetchData();
        if (result) {
          setData(result);
          // 更新本地存储
          if (typeof window !== "undefined") {
            localStorage.setItem('products', JSON.stringify(result));
          }
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchDataWithLocalStorage();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className='mt-12'>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 className='text-2xl font-extrabold tracking-tighter'>
          Newest Products
        </h2>
        <div className='flex flex-row items-center'>
          <Link href="/" className='text-md hidden font-bold text-primary hover:text-primary/75 md:block'>
            All Products 
          </Link>
          <ArrowRight className='hidden md:block'/>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 mt-4 gap-10'>
        {data.length > 0 ? (
          data.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              smallSummary={product.smallSummary}
              description={product.description}
              images={product.images}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
};

export default NewestProducts;
```


## Tailwind 确定图片尺寸

1. 使用插件@tailwindcss/aspect-ratio
2. 首先安装，然后在tailwind.config.ts中的pluglin中添加
``` json
plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
],
```
<!-- 使用 -->
``` tsx
<div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
  <Image
    src={item as string}
    alt="yoo"
    fill
    className="object-cover w-full h-full rounded-lg"
  />
</div>
```

## Loading 
- Next可以识别Loading page， 是因为引入了一种React Suspense的机制
- 
1. 在页面正在加载中时，使用Skeleton(龙骨)作为占位符

