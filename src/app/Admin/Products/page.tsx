'use client'
import { getAllProductAsync, createProductAsync, updateProductAsync, deleteProductAsync } from "@/lib/features/ProductSlice";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { IoAdd, IoPencilOutline, IoTrash } from "react-icons/io5";
import { Product } from "@/data/data";

interface Shop {
  id: number;
  branchName: string;
}

interface FormData {
  name: string;
  price: string;
  image: string;
  description: string;
  tags: string[];
  status: string;
}

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { Products, loading } = useSelector((state: RootState) => state.Product);
  const [editShop, setEditShop] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getAllProductAsync())
  }, [dispatch]);

  console.log('products', Products)

  // State variables to hold form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    image: '',
    description: '',
    tags: [],
    status: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Function to handle changes in form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'tags' ? value.split(', ') : value
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleEdit = (shop: Shop) => {
    setEditShop(shop);
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      tags: [],
      status: ''
    }); // Assuming form data reset
    setIsOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image;
    if (imageFile) {
      // Here you can upload the image to your backend and get the URL
      // const uploadedImageUrl = await uploadImage(imageFile);
      const uploadedImageUrl = URL.createObjectURL(imageFile); // For demo purposes, replace with actual upload logic
      imageUrl = uploadedImageUrl;
    }

    const data = { ...formData, image: imageUrl };

    if (editShop) {
      (data as any).branchId = editShop.id;

      console.log('delete icon', data);
      dispatch(updateProductAsync(data))
        .then(() => {
          setFormData({
            name: '',
            price: '',
            image: '',
            description: '',
            tags: [],
            status: ''
          });
          setEditShop(null);
          setIsOpen(false);
          dispatch(getAllProductAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    } else {
      dispatch(createProductAsync(data))
        .then(() => {
          setFormData({
            name: '',
            price: '',
            image: '',
            description: '',
            tags: [],
            status: ''
          });
          setIsOpen(false);
          dispatch(getAllProductAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleDelete = (shopId: any) => {
    console.log('id', shopId)
    setDeleteId(shopId); // Set the ID of the shop to be deleted
    setDeleteId(true); // Open confirmation modal
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 mt-7 mb-0 mx-6 px-5 py-6 min-h-screen rounded-lg'>
      <h1 className='text-gray-800 dark:text-gray-200 text-3xl font-medium'>Product</h1>

      <div className="header flex justify-between items-center pt-6 mx-2">
        <div className="search_bar mr-2">
          <div className="relative mt-4 md:mt-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-800 dark:text-gray-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              className="md:w-64 lg:w-72 py-2 pl-10 pr-4 text-gray-800 dark:text-gray-200 bg-transparent border border-[#D9D9D9] rounded-lg focus:border-[#D9D9D9] focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] placeholder:text-sm dark:placeholder:text-gray-300"
              placeholder="Search by Design Number"
              // value={searchText}
              // onChange={handleSearch}
            />
          </div>
        </div>

        <button onClick={openModal} className="inline-block rounded-sm border border-gray-700 bg-gray-600 p-1.5 hover:bg-gray-800 focus:outline-none focus:ring-0">
          <IoAdd size={22} className='text-white' />
        </button>
      </div>

      {loading ? (
        <div className="pt-16 flex justify-center mt-12 items-center">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-gray-700 dark:text-gray-100 rounded-full " role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="relative mx-4 my-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Products.map((data: Product) => (
                <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img
                      src={data.image}
                      className="w-16 md:w-20 max-w-full max-h-full"
                      alt="Product"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {data.name}
                  </td>
                  <td className="px-6 py-4">
                    {data.status}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {data.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(data)}
                    >
                      <IoPencilOutline size={22} />
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ml-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      <IoTrash size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-800 flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-700">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  value={formData.tags.join(', ')}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select status</option>
                  <option value="available">Available</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  {editShop ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-800 flex">
          <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-700">
            <p className="text-gray-700">Are you sure you want to delete this product?</p>
            <div className="flex items-center justify-between mt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                onClick={() => {
                  dispatch(deleteProductAsync(deleteId));
                  setDeleteId(null);
                  dispatch(getAllProductAsync());
                }}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
