'use client';
import { getAllProductAsync, createProductAsync, updateProductAsync, deleteProductAsync } from "@/lib/features/ProductSlice";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { IoAdd, IoPencilOutline, IoTrash } from "react-icons/io5";
import { Order } from "@/data/data";
import { deleteOrderAsync, getAllOrderAsync, updateOrderAsync } from "@/lib/features/OrderSlice";

interface FormData {
  name: string;
  price: string;
  image: string;
  description: string;
  tags: string[];
  status: string;
}

const Page = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { Orders, loading } = useSelector((state: RootState) => state.Order);
 
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [editModal, setEditModal] = useState<boolean>(false);


  useEffect(() => {
    dispatch(getAllOrderAsync());
  }, [dispatch]);

  const handleEdit = (order: Order) => {
    console.log('order',order)
    setEditOrder(order);
    setOrderStatus(order.status);
    setEditModal(true);
  };
  
  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteOrderAsync(deleteId))
        .then(() => {
          setDeleteId(null);
          setDeleteModal(false);
          dispatch(getAllOrderAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleDelete = (orderId: number) => {
    setDeleteId(orderId);
    setDeleteModal(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = Orders?.orders?.filter(order =>
    order.items[0].product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(Orders?.pagination?.totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditOrder(null);
  };

  const handleUpdateOrderStatus = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editOrder) {
      const data ={
        id:editOrder?.id,
        status: orderStatus
      }
      dispatch(updateOrderAsync(data))
        .then(() => {
          closeEditModal();
          dispatch(getAllOrderAsync());
        })
        .catch((error: Error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <section className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 mt-7 mb-0 mx-6 px-5 py-6 min-h-screen rounded-lg'>
      <h1 className='text-gray-800 dark:text-gray-200 text-3xl font-medium'>Order</h1>

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
      </div>

      {loading ? (
        <div className="pt-16 flex justify-center mt-12 items-center">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-gray-700 dark:text-gray-100 rounded-full" role="status" aria-label="loading">
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
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                  Action
                </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders?.map((order) => (
                  <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-20 p-2">
                      <img className="w-12 h-12 rounded-full" src={order.items[0].product.image} alt="Product" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {order.items[0].product.name}
                    </td>
                    <td className="px-6 py-4">
                      {order.items[0].quantity}
                    </td>
                    <td className="px-6 py-4">
                      ${order.totalPrice}
                    </td>

                    <td className="px-6 py-4">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-4">
                    <button onClick={() => handleEdit(order)} className="inline-block rounded-sm border border-gray-700 bg-gray-600 p-1 hover:bg-gray-800 focus:outline-none focus:ring-0">
                      <IoPencilOutline size={20} className="text-white" />
                    </button>
                    <button onClick={() => handleDelete(order.id)} className="inline-block rounded-sm border border-gray-700 bg-gray-600 p-1 hover:bg-gray-800 focus:outline-none focus:ring-0">
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
                {startIndex + 1}-{Math.min(endIndex, Orders?.pagination?.totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">{Orders?.pagination?.totalItems}</span>
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

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Delete Order
            </h2>
            <p className="mb-4">Are you sure you want to delete this Order?</p>
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

      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Edit Order Status
            </h2>
            <form onSubmit={handleUpdateOrderStatus}>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Order Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
               
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-0 mr-2">
                  Save
                </button>
                <button onClick={closeEditModal} className="px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-0">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
