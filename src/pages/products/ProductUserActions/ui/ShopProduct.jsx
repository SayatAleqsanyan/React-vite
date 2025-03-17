import {useState} from "react";
import {useProductUserActions} from "../logic/useProductUserActions.jsx";

export const AddUserToProduct = ({ product, onActionComplete }) => {
  const { performAction } = useProductUserActions();
  const [userName, setUserName] = useState('');

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      alert('Խնդրում ենք մուտքագրել օգտատիրոջ անունը');
      return;
    }

    const result = await performAction(product, userName.trim(), 'ADD_USER');
    if (onActionComplete) onActionComplete(result);

    if (result.success) {
      setUserName('');
    }
  };

  return (
    <form onSubmit={handleAddUser} className="mt-4">
      <div className="flex">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Օգտատիրոջ անունը"
          className="flex-1 p-2 border rounded-l"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Ավելացնել օգտատեր
        </button>
      </div>
    </form>
  );
};