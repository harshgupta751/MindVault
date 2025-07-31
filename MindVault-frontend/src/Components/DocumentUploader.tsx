// Required dependencies
// npm install react-dropzone
// very final 
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {toast} from 'react-hot-toast'

const DocumentUploader = ({ setContent }: { setContent: (url: string) => void; }) => {
  const [fileName, setFileName] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');



useEffect(() => {
  return () => {
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
    }
  };
}, [filePreviewUrl]);

const onDropRejected = (fileRejections: any[]) => {
  const rejectedTypes = fileRejections.map(rej => rej.file.type).join(', ');
  toast.error(`File type not allowed: ${rejectedTypes}`);
};


const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
setFilePreviewUrl(URL.createObjectURL(file)); 

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', 'http://localhost:3000/api/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          setContent(data.publicId);
        } else {
          alert('Upload failed');
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        alert('Upload error');
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert('Upload error');
    }
  }, [setContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
  accept: {
    'application/msword': ['.doc', '.docx'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'application/vnd.ms-powerpoint': ['.ppt', '.pptx'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'text/plain': ['.txt']
  }
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Upload Document</label>
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
          <p>Drop the file here ...</p>
         <div className='text-xs'>(Only .doc, .docx, .ppt, .pptx, and .txt files are accepted — PDFs not allowed)</div>
          </>
        ) : (
          <>
          <p>Drag & drop your document here, or click to select</p>
  <div className='text-xs'>(Only .doc, .docx, .ppt, .pptx, and .txt files are accepted — PDFs not allowed)</div>
          </>
        )}
      </div>
{fileName && (
  <p className="text-sm mt-2 text-gray-700">
    📎 {fileName}
    {filePreviewUrl && (
      <a
        href={filePreviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 text-blue-600 underline hover:text-blue-800"
      >
        Open Preview
      </a>
    )}
  </p>
)}

      {uploading && (
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div className="h-2 bg-blue-500 rounded" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
