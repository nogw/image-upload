import axios from 'axios';
import React, { useCallback } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone'
import { Container, DropzoneContainer, File } from './styles';

const Upload: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  const {
    getRootProps, 
    acceptedFiles,
    getInputProps, 
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'image/*',
    onDrop
  })

  const postImage = (img: Blob) => {
    let formData = new FormData()
    formData.append("fileUpload", img)
  
    axios({
      method: 'post',
      url: '/',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <File>
      <h3 className="file__name">{file.name}</h3>
      <h3 className="file__size">{Math.floor(file.size / 1000)}kb</h3>
    </File>
  ));

  const dragMessage = () => {
    if (isDragReject) {
      return "Insert only image files"
    } else if (isDragAccept) {
      return "Drop the files here..."
    } else {
      return "Drop files here, or click to select"
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