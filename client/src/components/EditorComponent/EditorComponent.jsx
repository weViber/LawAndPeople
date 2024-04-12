import { useMemo, useRef, useState } from "react"
import ReactQuill, { Quill } from 'react-quill';
import { uploadImg } from "../../service/uploadService"
import "react-quill/dist/quill.snow.css"
// import ImageResize from '@looop/quill-image-resize-module-react';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

const EditorComponent = ({ content, setContent })=>{
  const quillRef = useRef();
  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); 

    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);
      try {
        const result = await uploadImg({ formData : formData });
        console.log('성공 시, 백엔드가 보내주는 데이터', result.data.url);
        const IMG_URL = result.data.url;
        const editor = quillRef.current.getEditor(); 
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error.message);
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6,false] }],
          ["bold", "italic", "underline", "strike", 'blockquote'],
          [{ list: "ordered" }, { list: "bullet" }, {'indent' : '-1'}, {'indent' : '+1'}],
          ["link", "image"],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['clean']
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment')
      }
    };
  }, []);
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'align', 'color', 'background',        
  ];

    return(
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="내용을 입력해주세요"
        value={ content }
        onChange={ setContent }
        modules={ modules }
        formats={formats}
      />
    </div>
  )
}
export default EditorComponent;