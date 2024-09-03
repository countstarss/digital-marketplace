'use client'

import { Button } from '@/components/ui/button'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'



export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if(!editor) {
    return null
  }

  return (
      <div className='flex flex-row gap-5'>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level :1}).run()}
          variant={
            editor.isActive("heading", { level :1 }) ? "default" : "secondary"
          }
          type='button'
        >
          H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level :2}).run()}
          variant={
            editor.isActive("heading", { level :2 }) ? "default" : "secondary"
          }
          type='button'
        >
          H2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level :3}).run()}
          variant={
            editor.isActive("heading", { level :3 }) ? "default" : "secondary"
          }
          type='button'
        >
          H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={
            editor.isActive("bold") ? "default" : "secondary"}
          type='button'
        >
          B
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={
            editor.isActive("italic") ? "default" : "secondary"}
          type='button'
        >
          Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={
            editor.isActive("strike") ? "default" : "secondary"}
          type='button'
        >
          Strike
        </Button>
      </div>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    // content: '<p>Hello World! 🌎️</p>',
    editorProps:{
      attributes :{
        class :"focus:outline-none min-h-[150px] prose prose-slate prose-sm sm:prose-base"
      }
    }
  })

  return (
    <div className='flex flex-col gap-y-2'>
    <MenuBar editor={editor}/>
    <EditorContent 
      editor={editor} 
      className=' border-slate-300 border-2 rounded-lg outline-violet-300 p-4 focus:outline-violet-300'/>
    </div>
)
}

export default Tiptap
