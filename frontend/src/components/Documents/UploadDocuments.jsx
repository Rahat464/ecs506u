import React, { useState } from 'react';
import axios from 'axios';

const UploadDocuments = () => {
  const [file, setFile] = useState(null);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !type) {
      setMessage('Please select a file and type.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await axios.post('http://localhost:4000/api/document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Document uploaded successfully.');
    } catch (error) {
      console.error('Error uploading document:', error);
      setMessage('Error uploading document.');
    }
  };

  return (
    <>
    <div>
      <h1>Upload Document</h1>
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Type" value={type} onChange={handleTypeChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
    </>
  );
};

export default UploadDocuments;
