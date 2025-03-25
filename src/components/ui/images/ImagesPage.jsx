import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

const api = axios.create({
  baseURL: 'http://localhost:4001',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

const ImagesPage = () => {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [username, setUsername] = useState('');
  const maxNumber = 69;

  const loadCredentials = () => {
    try {
      const storedUsername = localStorage.getItem('Token') || '';

      if (!storedUsername || storedUsername.trim() === '') {
        console.error('Username բացակայում է');
        return null;
      }

      const safeUsername = storedUsername
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()
      .trim();

      return safeUsername;
    } catch (error) {
      console.error('Սխալ username-ի բեռնման ժամանակ:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadUsername = () => {
      const extractedUsername = loadCredentials();
      if (extractedUsername) {
        setUsername(extractedUsername);
      }
    };

    loadUsername();
  }, []);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const uploadToJsonServer = async () => {
    if (images.length === 0) return;

    const currentUsername = loadCredentials();
    if (!currentUsername) {
      alert('Username-ը բացակայում է');
      return;
    }

    setIsUploading(true);

    try {
      const uploadedImageUrls = [];

      for (const image of images) {
        const file = image.file;
        const formData = new FormData();
        formData.append('file', file);

        formData.append('Username', currentUsername);

        const response = await api.post('/upload', formData, {
          headers: {
            'Username': currentUsername,
            'x-username': currentUsername
          }
        });

        if (response.data.success) {
          uploadedImageUrls.push({
            name: file.name,
            url: response.data.url,
          });
        }
      }

      await api.post('/api/images', {
        id: Date.now(),
        userId: currentUsername,
        files: uploadedImageUrls,
        uploadDate: new Date().toISOString(),
      });

      setUploadedFiles(uploadedImageUrls);
      alert('Պատկերները հաջողությամբ վերբեռնվել են։');
      setImages([]);
    } catch (error) {
      console.error('Սխալ պատկերները վերբեռնելիս:', error);
      alert('Չհաջողվեց վերբեռնել պատկերները։');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-black ">
      <h2 className="text-2xl mb-4">Ֆայլերի Վերբեռնում</h2>
      <p className="mb-4">Օգտատեր: {username || 'Անանուն'}</p>

      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={['jpg', 'jpeg', 'png', 'gif']}
      >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
          <div className="upload__image-wrapper">
            <button
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Սեղմեք կամ քաշեք այստեղ
            </button>
            <button
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 ml-2"
              onClick={onImageRemoveAll}
            >
              Հեռացնել բոլոր պատկերները
            </button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item mt-2">
                <img
                  src={image['data_url']}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover"
                />
                <div className="image-item__btn-wrapper mt-1">
                  <button
                    onClick={() => onImageUpdate(index)}
                    className="text-sm text-blue-600 mr-2"
                  >
                    Թարմացնել
                  </button>
                  <button
                    onClick={() => onImageRemove(index)}
                    className="text-sm text-red-600"
                  >
                    Հեռացնել
                  </button>
                </div>
              </div>
            ))}

            {images.length > 0 && (
              <button
                onClick={uploadToJsonServer}
                disabled={isUploading}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isUploading ? 'Ընթացքում...' : 'Վերբեռնել'}
              </button>
            )}
          </div>
        )}
      </ImageUploading>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Ձեր ֆայլերը</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesPage;