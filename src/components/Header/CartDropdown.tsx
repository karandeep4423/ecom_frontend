import { Popover, Transition } from "@/app/headlessui";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteCartAsync, getAllCartAsync } from "@/lib/features/CartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "@/lib/store";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
export default function CartDropdown() {
  const dispatch = useAppDispatch();
  const { Carts, loading } = useSelector((state: RootState) => state.Cart);

  useEffect(() => {
    dispatch(getAllCartAsync());
  }, []);

  const confirmDelete = (cartId: any) => {
    dispatch(deleteCartAsync(cartId))
      .then(() => {
        dispatch(getAllCartAsync());
      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });
  };

  const renderProduct = (item: any, index: number, cartId: string, totalPrice: number) => {
    const { product, quantity } = item;
    const { name, image, id, price } = product;

    return (
      <div key={index} className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
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
                <div className="mt-1 sm:mt-2.5 flex flex-col text-sm text-slate-600 dark:text-slate-300">
                  <p>{quantity}</p>
                  <p>${price}</p> {/* Display total price */}
                </div>
              </div>
            </div>

            <div className="flex mt-auto items-end justify-between text-sm">
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

  // Calculate subtotal across all carts
const subtotal = Carts?.carts?.reduce((acc, cart) => acc + cart.totalPrice, 0);

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
         <Popover.Button
            className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
          >
            <div className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
              <span className="mt-[1px]">{Carts?.carts?.length}</span>
            </div>
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 8H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Link className="block md:hidden absolute inset-0" href={"/cart"} />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 w-screen max-w-xs sm:max-w-md px-4 mt-3.5 -right-28 sm:right-0 sm:px-0">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                <div className="relative bg-white dark:bg-neutral-800 p-3">
                  <h3 className="text-xl font-semibold mb-2 text-center">Shopping cart</h3>

                  <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                    {Carts?.carts?.map((cart, index) => (
                      <div className="divide-y divide-slate-100 dark:divide-slate-700 mb-3" key={index}>
                        {cart?.items.map((item, idx) => renderProduct(item, idx, cart.id, cart.totalPrice))}
                      </div>
                    ))}
                  </div>
                  <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                    <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 dark:text-slate-400 font-normal">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                      <span>${subtotal?.toFixed(2)}</span> {/* Display subtotal */}
                    </p>
                  </div>

                  <div className="flex space-x-2 mt-5">
                    <ButtonSecondary
                      href="/cart"
                      className="flex-1 border border-slate-200 dark:border-slate-700"
                      onClick={close}
                    >
                      View cart
                    </ButtonSecondary>
                    <ButtonPrimary href="/checkout" onClick={close} className="flex-1">
                      Check out
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
