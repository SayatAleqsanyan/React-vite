export const ImagePreview = ({ imgURL }) => {
  if (!imgURL) return null;

  return (
    <div className="mt-2">
      <img src={imgURL} alt="Profile" className="w-24 h-24 object-cover rounded" />
    </div>
  );
};
