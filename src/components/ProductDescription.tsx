'use client'

import React from 'react'
import Tiptap from './Tiptap'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, type JSONContent, useEditor } from '@tiptap/react'

type Props = {}

const ProductDescription = ({content}: {content:JSONContent | null}) => {

  const editor = useEditor({
    extensions: [StarterKit],
    editable:false,
    content:content,
    editorProps:{
      attributes :{
        class :"focus:outline-none prose prose-sm sm:prose-base dark:text-white"
      }
    },
    immediatelyRender: false,
  })
  return (
    <EditorContent editor={editor} className='dark:text-white'/>

  )
}

export default ProductDescription