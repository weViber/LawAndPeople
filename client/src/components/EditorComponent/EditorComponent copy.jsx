import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ImageUploader = ({ onImageUpload }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    uploadImageToServer(file)
      .then((imageUrl) => {
        onImageUpload(imageUrl);
      })
      .catch((error) => {
        console.error('Image upload failed:', error);
      });
  };

  return (
    <input type="file" accept="image/*" onChange={handleImageUpload} />
  );
};

const QuillEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleImageUpload = (imageUrl) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', imageUrl);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          input.onchange = () => {
            const file = input.files[0];
            uploadImageToServer(file)
              .then((imageUrl) => {
                handleImageUpload(imageUrl);
              })
              .catch((error) => {
                console.error('Image upload failed:', error);
              });
          };
        },
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const quillRef = React.useRef();

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
