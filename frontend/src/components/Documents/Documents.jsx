import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../header/header';
import './Documents.css';
import { Link } from 'react-router-dom';

const Document = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/document/getList');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:4000/api/document/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchDocuments();

      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='wrapper'>
        <div className='Documents-header'>
          <h1>Your Documents</h1>
        </div>
        <div className='info'>
          {documents.map((document, index) => (
            <div key={index} className="document-item">
              <div className="left">
                <p>{document.name} ({document.type})</p>
              </div>
              <div className="middle">
                <p>{formatDate(document.date)}</p>
              </div>
              <div className="right">
                <a href={document.url} download>
                  <button>Download</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='edit-button'>
        <Link to='/FileUploadForm'>
          <button className='button'>Upload Documents</button>
        </Link>
      </div>
    </>
  );
  

};

export default Document;
