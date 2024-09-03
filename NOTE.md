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

3. 

