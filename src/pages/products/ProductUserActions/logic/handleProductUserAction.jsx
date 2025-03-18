import {updateProduct} from "../../../../redux/slices/productsSlice.js";

export const handleProductUserAction = async (product, userName, actionType, dispatch) => {
  if (!product || !userName) {
    console.error('Product և userName-ը պարտադիր են');
    return { success: false, message: 'Invalid product or userName' };
  }

  let updatedProduct = { ...product };
  let message = '';

  switch (actionType) {
    case 'ADD_LIKE':
      if (product.like.includes(userName)) {
        updatedProduct = {
          ...product,
          like: product.like.filter(name => name !== userName)
        };
        message = 'Հավանումը հեռացվեց';
      } else {
        let updatedDislike = [...product.dislike];
        if (product.dislike.includes(userName)) {
          updatedDislike = product.dislike.filter(name => name !== userName);
        }

        updatedProduct = {
          ...product,
          like: [...product.like, userName],
          dislike: updatedDislike
        };
        message = 'Հավանումն ավելացվեց';
      }
      break;

    case 'ADD_DISLIKE':
      if (product.dislike.includes(userName)) {
        updatedProduct = {
          ...product,
          dislike: product.dislike.filter(name => name !== userName)
        };
        message = 'Հակահավանումը հեռացվեց';
      } else {
        let updatedLike = [...product.like];
        if (product.like.includes(userName)) {
          updatedLike = product.like.filter(name => name !== userName);
        }

        updatedProduct = {
          ...product,
          dislike: [...product.dislike, userName],
          like: updatedLike
        };
        message = 'Հակահավանումն ավելացվեց';
      }
      break;

    case 'TOGGLE_FAVORITE':
      if (product.favorites.includes(userName)) {
        updatedProduct = {
          ...product,
          favorites: product.favorites.filter(name => name !== userName)
        };
        message = 'Հեռացվեց նախընտրածներից';
      } else {
        updatedProduct = {
          ...product,
          favorites: [...product.favorites, userName]
        };
        message = 'Ավելացվեց նախընտրածներին';
      }
      break;

    default:
      return { success: false, message: 'Անհայտ գործողություն' };
  }

  try {
    const resultAction = await dispatch(updateProduct({
      id: product.id,
      updatedProduct
    }));

    if (updateProduct.fulfilled.match(resultAction)) {
      return { success: true, message, updatedProduct: resultAction.payload };
    } else {
      return {
        success: false,
        message: `Սխալ: ${resultAction.error?.message || 'Անհայտ սխալ'}`
      };
    }
  } catch (error) {
    console.error('Չհաջողվեց թարմացնել:', error);
    return { success: false, message: `Սխալ: ${error.message}` };
  }
};