"use client";
import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import NotifyAddTocart from "./NotifyAddTocart";
import AccordionInfo from "@/components/AccordionInfo";
import Image from "next/image";
import Link from "next/link";
import { getSingleProductAsync } from "@/lib/features/ProductSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { createCartAsync, getAllCartAsync } from "@/lib/features/CartSlice";
import { useRouter } from "next/navigation";

export interface ProductQuickViewProps {
  className?: string;
  id: any;
}

const ProductQuickView: FC<ProductQuickViewProps> = ({ className = "", id }) => {
  const dispatch = useAppDispatch();
  const { SingleProduct, loading } = useAppSelector((state: RootState) => state.product);
  const { user } = useAppSelector((state: RootState) => state.auth);
const router = useRouter()

  console.log('user',user)

  const [qualitySelected, setQualitySelected] = useState(1);
  const [price, setPrice] = useState(SingleProduct?.price || 0);

  useEffect(() => {
    dispatch(getSingleProductAsync(id));
  }, [id]);

  const notifyAddTocart = () => {
    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={SingleProduct?.image}
          qualitySelected={qualitySelected}
          name={SingleProduct?.name}
          price={SingleProduct?.price}
          show={t.visible}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const AddtoCart = () => {

if(!user)
  {
    toast.error('Login must')
    return;
  }
    if(user)
      {
    const data = {
      user: user?.id,
      items: [
        {
          product: SingleProduct?.id,
          quantity: qualitySelected,
          price: SingleProduct?.price,
        },
      ],
      totalPrice: price,
    };

    console.log('data',data)

    dispatch(createCartAsync(data))
      .then(() => {
        dispatch(getAllCartAsync())
        notifyAddTocart();
        router.push('/')

      })
      .catch((error: Error) => {
        console.error("Error:", error);
      });


    }
  };

  useEffect(() => {
    if (SingleProduct) {
      setPrice(SingleProduct.price * qualitySelected);
    }
  }, [SingleProduct, qualitySelected]);

  const renderSectionContent = () => {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold hover:text-primary-6000 transition-colors">
            <Link href="/product-detail">{SingleProduct?.name}</Link>
          </h2>
          <div className="flex justify-start rtl:justify-end items-center mt-5 space-x-4 sm:space-x-5 rtl:space-x-reverse">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={price}
            />
            <div className="h-6 border-s border-slate-300 dark:border-slate-700"></div>
            <div className="flex items-center">
              <Link
                href="/product-detail"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ms-1.5 flex">
                  <span>{SingleProduct?.ratings}</span>
                  <span className="block mx-2">·</span>
                  <span className="text-slate-600 dark:text-slate-400 underline">
                    {SingleProduct?.numberOfReviews} reviews
                  </span>
                </div>
              </Link>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <span className="ms-1 leading-none">{SingleProduct?.status}</span>
              </div>
            </div>
          </div>
        </div>

     
        <div className="flex space-x-3.5 rtl:space-x-reverse">
          <div className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
            <NcInputNumber
              defaultValue={qualitySelected}
              onChange={setQualitySelected}
            />
          </div>
          <ButtonPrimary
  className="flex-1 flex-shrink-0"
  onClick={() => {
    if (SingleProduct) { // Add this check
      AddtoCart();
      
  
    } else {
      console.error("SingleProduct is not available");
    }
  }}
>
  <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
  <span className="ms-3">Add to cart</span>
</ButtonPrimary>

        </div>
        <hr className=" border-slate-200 dark:border-slate-700"></hr>
        <div>
          <h3 className="text-lg font-semibold">Description</h3>
          <p>{SingleProduct?.description}</p>
        </div>
        <AccordionInfo
          data={[
          
            {
              name: "Features",
              content: `<ul class="list-disc list-inside leading-7">
                <li>Material: 43% Sorona Yarn + 57% Stretch Polyester</li>
                <li>Casual pants waist with elastic elastic inside</li>
                <li>The pants are a bit tight so you always feel comfortable</li>
                <li>Excool technology application 4-way stretch</li>
              </ul>`,
            },
          ]}
        />
      </div>
    );
  };

  return (
    <div className={`nc-ProductQuickView ${className}`}>
      <div className="lg:flex">
        <div className="w-full lg:w-[50%] ">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-16">
              <Image
                src={SingleProduct?.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full rounded-xl object-cover"
                alt="product detail 1"
              />
            </div>
            <LikeButton className="absolute end-3 top-3 " />
          </div>
        </div>
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:ps-7 xl:ps-8">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
