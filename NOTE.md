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

2. MenuBar的H无法生效，需要添加一个Tailwind插件

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

2. 

