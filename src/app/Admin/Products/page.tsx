'use client';
import { getAllProductAsync, createProductAsync, updateProductAsync, deleteProductAsync } from "@/lib/features/ProductSlice";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IoAdd, IoPencilOutline, IoTrash } from "react-icons/io5";
import { Product } from "@/data/data";

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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { Products, loading } = useAppSelector((state: RootState) => state.product);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);




  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteProductAsync(deleteId))
        .then(() => {
          setDeleteId(null);
          setDeleteModal(false);
          dispatch(getAllProductAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    }
  };





  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    image: '',
    description: '',
    tags: [],
    status: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      tags: product.tags,
      status: product.status
    });
    setIsOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = { ...formData };
    if (imageFile) {
    console.log('imgae file',imageFile.name)

      data.image = imageFile.name;
    }

    if (editProduct) {
      data.id = editProduct.id;

      console.log('edit product', data);
      dispatch(updateProductAsync(data))
        .then(() => {
          resetForm();
          setEditProduct(null);
          setIsOpen(false);
          dispatch(getAllProductAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    } else {
      dispatch(createProductAsync(data))
        .then(() => {
          setIsOpen(false);
          resetForm();
          dispatch(getAllProductAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      image: '',
      description: '',
      tags: [],
      status: ''
    });
    setImageFile(null);
  };

  const handleDelete = (productId: number) => {
    setDeleteId(productId);
    setDeleteModal(true);
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditProduct(null);
    document.body.style.overflow = 'auto';
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = Products?.products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(Products?.pagination?.totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts?.slice(startIndex, endIndex);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 mt-7 mb-0 mx-6 px-5 py-6 min-h-screen rounded-lg'>
      <h1 className='text-gray-800 dark:text-gray-200 text-3xl font-medium'>Product</      h1>

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
              placeholder="Search by Product Name"
              value={searchQuery}
              onChange={handleSearch}
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
<>


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
              {paginatedProducts?.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="w-20 p-2">
                    <img className="w-12 h-12 rounded-full" src={product.image} alt="Product" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => handleEdit(product)} className="inline-block rounded-sm border border-gray-700 bg-gray-600 p-1 hover:bg-gray-800 focus:outline-none focus:ring-0">
                      <IoPencilOutline size={20} className="text-white" />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="inline-block rounded-sm border border-gray-700 bg-gray-600 p-1 hover:bg-gray-800 focus:outline-none focus:ring-0">
                      <IoTrash size={20} className="text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex + 1}-{Math.min(endIndex, Products?.pagination?.totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">{Products?.pagination?.totalItems}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {Array.from(Array(totalPages).keys()).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                      currentPage === page + 1 ? 'text-blue-600 bg-blue-50 border-blue-300' : ''
                    }`}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>


          </>


      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-800 dark:text-gray-200 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {editProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Product Name
                </label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Price
                </label>
                <input type="number" id="price" name="price" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" value={formData.price} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Image
                </label>
                <input type="file" id="image" name="image" accept="image/*" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" onChange={handleImageChange} />
                {formData.image && <img src={formData.image} alt="Selected" className="mt-4 w-32 h-32 object-cover rounded-md" />}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Description
                </label>
                <textarea id="description" name="description" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" value={formData.description} onChange={handleChange} required></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Tags
                </label>
                <input type="text" id="tags" name="tags" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" value={formData.tags.join(', ')} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 dark:text-gray-200 mb-2">
                  Status
                </label>
                <select id="status" name="status" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring focus:ring-opacity-40 focus:ring-[#D9D9D9] border border-gray-300 dark:border-gray-600" value={formData.status} onChange={handleChange} required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-0">
                  {editProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Delete Product
            </h2>
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end">
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-md focus:outline-none focus:ring-0 mr-2">
                Delete
              </button>
              <button onClick={() => setDeleteModal(false)} className="px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-0">
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
