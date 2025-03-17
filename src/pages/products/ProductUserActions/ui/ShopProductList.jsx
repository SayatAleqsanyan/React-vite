export const ProductUsersList = ({ product }) => {
  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Օգտատերեր</h3>
      {product.users.length > 0 ? (
        <ul className="list-disc list-inside">
          {product.users.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      ) : (
        <p>Այս ապրանքին օգտատերեր չեն ավելացվել:</p>
      )}

      <h3 className="font-semibold mb-2 mt-4">Հավանումներ</h3>
      {product.like.length > 0 ? (
        <ul className="list-disc list-inside">
          {product.like.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      ) : (
        <p>Այս ապրանքը հավանումներ չունի:</p>
      )}

      <h3 className="font-semibold mb-2 mt-4">Հակահավանումներ</h3>
      {product.dislike.length > 0 ? (
        <ul className="list-disc list-inside">
          {product.dislike.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      ) : (
        <p>Այս ապրանքը հակահավանումներ չունի:</p>
      )}

      <h3 className="font-semibold mb-2 mt-4">Նախընտրածներ</h3>
      {product.favorites.length > 0 ? (
        <ul className="list-disc list-inside">
          {product.favorites.map((userName) => (
            <li key={userName}>{userName}</li>
          ))}
        </ul>
      ) : (
        <p>Այս ապրանքը նախընտրածներում չի:</p>
      )}
    </div>
  );
};
