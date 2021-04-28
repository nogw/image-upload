import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { Container, DropzoneContainer, File } from './styles';
import { IoCopySharp } from 'react-icons/io5'
import api from '../../services/api';

const postImage = (values: string[], setProgress: any, setLink: any) => {
  let fd = new FormData();
  
  values.map((file: any) => {
    return fd.append('fileUpload',file);
  });
  
  api.post(`/`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: e => {
      const progress = Math.round((e.loaded * 100) / e.total)
      setProgress(progress)
    }
  })
    .then((response) => {
      setLink(response.data.imageURLs[0].url);
    })
    .catch(error => {
      console.log(error);
    })
}

const Upload: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [copy, setCopy] = useState(false)
  const [link, setLink] = useState("")

  const onDrop = useCallback(acceptedFiles => {
    postImage(acceptedFiles, setProgress, setLink)
  }, [])
  
  function fallbackCopyTextToClipboard() {
    var textArea = document.createElement("textarea");
    textArea.value = link;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      successful ? setCopy(true) : setCopy(false)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }

  const {
    getRootProps, 
    acceptedFiles,
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop
  })

  const acceptedFileItems = acceptedFiles.map(file => (
    <File key={file.size} copy={copy} progress={`${progress}%`}>
      <div className="file__info">
        <h3 className="file__name">{file.name}</h3>
        <h3 className="file__size">{Math.floor(file.size / 1000)}kb</h3>
      </div>
      <div className="bar">
        <div className="bar__gray"/>
        <div className="bar__purple"/>
      </div>

      {
        link && (
          <div className="link">
            <div className="text">
              <p>{link}</p>
            </div>

            <button className="copy" onClick={fallbackCopyTextToClipboard}>
              <IoCopySharp className="icon"/>
            </button>
          </div>
        )
      }
    </File>
  ));

  const dragMessage = () => {
    if (isDragReject) {
      return "insert just one image format file"
    } else if (isDragAccept) {
      return "Drop the file here..."
    } else {
      return "Drop file here, or click to select"
    }
  } 

  return (
    <Container>
      {acceptedFileItems}
      <DropzoneContainer {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>{dragMessage()}</p>
      </DropzoneContainer>
    </Container>
  );
}

export default Upload;