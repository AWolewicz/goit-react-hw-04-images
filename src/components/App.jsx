// my API key: 42622707-d3cf547bb9e78dbb6ae1d32a2
// pixabay: https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

import axios from "axios";
import css from './App.module.css'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./Loader/Loader";
import { useState } from 'react';
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedImages, setSearchedImages] = useState('')
  const [totalHits, setTotalHits] = useState(0)
  const [disabledButton, setDisabledButton] = useState(true);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalSrc, setModalSrc] = useState('')

  const fetchGallery = async (q, page) => {
    const baseURL = `https://pixabay.com/api/?q=${q}&page=${page}&key=42622707-d3cf547bb9e78dbb6ae1d32a2&image_type=photo&orientation=horizontal&per_page=12`
    try {
      const response = await axios.get(baseURL);
      return response.data
    } catch (error) {
      console.error('Fetching error:', error)
    };
  };

  const fetchSearchedValue = async (data) => {
    setIsLoading(true);
    setSearchedImages(data);
    setCurrentPage(1);
    setTotalHits(0);
    await fetchGallery(data, currentPage)
      .then((results) => {
        if (currentPage === 1) {
          setImages(results.hits)
          setTotalHits(() => results.totalHits);
          checkIfLoadMore(results.totalHits);
        };
      });
    setTimeout(() => { setIsLoading(false) }, 1000);
  };

  const checkIfLoadMore = (data) => {
    if (data > 12) {
      setDisabledButton(false);
      setCurrentPage(currentPage => currentPage + 1);
      setTotalHits(totalHits => totalHits - 12);
    } else {
      setDisabledButton(true)
    };
  };

  const loadMore = async () => {
    setIsLoading(true);
    await fetchGallery(searchedImages, currentPage)
      .then(data => setImages(data.hits));
    checkIfLoadMore(totalHits);
    setTimeout(() => { setIsLoading(false) }, 1000);
  };

  const handleImageClick = image => {
    setOpenModal(true);
    setModalSrc(image.largeImageURL) //sprawdzić czy działa, jak nie to jak pobrać large url żeby wstawić jako source 
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={fetchSearchedValue}/>
      <ImageGallery>
        {isLoading ? <Loader /> : <ImageGalleryItem images={images} onClick={handleImageClick } /> }
      </ImageGallery>
      {totalHits !== 0 && <Button disabled={disabledButton} onClick={loadMore} />}
      {openModal && <Modal onClick={closeModal} openModal={modalSrc } />}
    </div>
  );
};