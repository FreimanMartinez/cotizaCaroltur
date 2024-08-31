import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import firebase from '../firebaseConfig/firebase'; // Assuming firebase.config.js is in firebaseConfig folder

// Initialize Firebase (replace with your actual firebaseConfig)
const app = firebase
const storage = getStorage(app);

function Album() {

    const location = useLocation();
  const { carpeta } = location.state;
    const folderName="portafolio/"+carpeta
    console.log(carpeta)
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, folderName);
        const result = await listAll(listRef);
        const promises = result.items.map(itemRef => getDownloadURL(itemRef));
        const urls = await Promise.all(promises);
        setImages(urls.map(url => ({ original: url, thumbnail: url })));
        console.log(images)
      } catch (error) {
        console.error("Error fetching images:", error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    };
    fetchImages();
  }, [folderName, storage]); // Incluye 'storage' en las dependencias para evitar problemas si cambia

  return (
    <div>
      {images.length > 0 ? (
        <ImageGallery
          items={images}
          showPlayButton={false}
          showBullets={true}
          infinite={true}
          showNav={true}
        />
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default Album;