import ImageUploading from 'react-images-uploading'

const MyImageUploading = ({
  images,
  onChange,
  maxNumber,
  uploadToJsonServer,
  isUploading
}) => {
  return (
    <div>
      <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
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
            <button style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps}>
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
              <button onClick={uploadToJsonServer} disabled={isUploading}>
                {isUploading ? 'Վերբեռնվում է...' : 'Վերբեռնել սերվեր'}
              </button>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}

export default MyImageUploading
