import { useState } from "react";
import ImageUploading from 'react-images-uploading';
import axios from 'axios';

const About = () => {
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const uploadToJsonServer = async () => {
    if (images.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedImageUrls = [];

      // Process each image one by one
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const file = image.file;

        // Create unique filename
        const timestamp = new Date().getTime();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const fileName = `${timestamp}-${randomStr}-${file.name}`;

        // Create FormData for this specific file
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);

        // Send file to your custom endpoint that handles saving to public folder
        // Note: You'll need to implement this endpoint
        const response = await axios.post('http://localhost:4001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          uploadedImageUrls.push({
            name: file.name,
            url: response.data.url
          });
        }
      }

      // Also save metadata to db.json if needed
      await axios.post('http://localhost:4001/images', {
        id: new Date().getTime(),
        files: uploadedImageUrls,
        uploadDate: new Date().toISOString()
      });

      setUploadedFiles(uploadedImageUrls);
      alert('Պատկերները հաջողությամբ վերբեռնվել են։');

    } catch (error) {
      console.error('Սխալ պատկերները վերբեռնելիս:', error);
      alert('Չհաջողվեց վերբեռնել պատկերները։ Խնդրում ենք կրկին փորձել։');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Սեղմեք կամ քաշեք այստեղ
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Հեռացնել բոլոր պատկերները</button>

            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Թարմացնել</button>
                  <button onClick={() => onImageRemove(index)}>Հեռացնել</button>
                </div>
              </div>
            ))}

            {images.length > 0 && (
              <button
                onClick={uploadToJsonServer}
                disabled={isUploading}
              >
                {isUploading ? 'Վերբեռնվում է...' : 'Վերբեռնել սերվեր'}
              </button>
            )}
          </div>
        )}
      </ImageUploading>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Վերբեռնված ֆայլեր:</h3>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default About;