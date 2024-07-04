'use client'
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { deleteCartAsync, getAllCartAsync } from "@/lib/features/CartSlice";
import { RootState } from "@/lib/store";
import { Product } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { Carts, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getAllCartAsync());
  }, [dispatch]);

  const confirmDelete = (cartId: any) => {
    dispatch(deleteCartAsync(cartId))
      .then(() => {
        dispatch(getAllCartAsync());
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const renderStatusSoldout = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <NoSymbolIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">Sold Out</span>
      </div>
    );
  };

  const renderStatusInstock = () => {
    return (
      <div className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <CheckIcon className="w-3.5 h-3.5" />
        <span className="ml-1 leading-none">In Stock</span>
      </div>
    );
  };

  const renderProduct = (item: Product, index: number, cartId: string) => {
    const { product, quantity, price } = item;
    const { name, image, id } = product;

    return (
      <div key={index} className="relative flex py-8 mb-4 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
        <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            src={image}
            alt={name}
            sizes="300px"
            className="h-full w-full object-contain object-center"
          />
          <Link href="/product-detail" className="absolute inset-0"></Link>
        </div>

        <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between">
              <div className="flex-[1.5]">
                <h3 className="text-base font-semibold">
                  <Link href="/product-detail">{name}</Link>
                </h3>
                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                  {/* Render attributes */}
                </div>
              </div>
            </div>

            <div className="flex justify-between  gap-12 mt-auto pt-4 items-center text-sm">
              {quantity > 0 ? renderStatusInstock() : renderStatusSoldout()}

              <button
                onClick={() => confirmDelete(cartId)}
                className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
              >
                <span>Remove</span>
              </button>

              
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    // Example pagination code (replace with actual logic based on pagination data)
    return (
      <nav className="flex items-center flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        {/* Pagination elements */}
      </nav>
    );
  };

const subtotal = Carts?.carts?.reduce((acc, cart) => acc + cart.totalPrice, 0);


  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        {/* Cart items */}
         <div className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Shopping Cart
            </div>
       
          <div  className="mb-12 sm:mb-16">
           
            <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">  
            {Carts?.carts?.map((cart, index) => (
              <div key={index} className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700">
                {cart.items.map((item, idx) => renderProduct(item, idx, cart.id))}
              </div>

            ))}
             </div>
            
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="sticky top-28">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                  <div className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                    <div className="flex justify-between pb-4">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-200">${subtotal}</span>
                    </div>
                  
                  </div>
                  <ButtonPrimary href="/checkout" className="mt-8 w-full">
                    Checkout
                  </ButtonPrimary>
                  <div className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                    <p className="block relative pl-5">
                      <svg
                        className="w-4 h-4 absolute -left-1 top-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.9945 16H12.0035"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Learn more{` `}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Taxes
                      </a>
                      <span>
                        {` `}and{` `}
                      </span>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="##"
                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                      >
                        Shipping
                      </a>
                      {` `} infomation
                    </p>
                  </div>
                </div>
              </div>



            </div>



          </div>
      

        {/* Pagination */}
        {renderPagination()}
      </main>
    </div>
  );
};

export default CartPage;
