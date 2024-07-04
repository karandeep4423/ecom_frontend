'use client'
import React, { FC, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import { useAppDispatch,useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllProductAsync } from "@/lib/features/ProductSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: Product[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  
}) => {
  const sliderRef = useRef(null);

  
  const [isShow, setIsShow] = useState(false);


  const dispatch = useAppDispatch();
  const { Products, loading } = useAppSelector((state:RootState) => state.product);
  console.log('data',Products)







  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(getAllProductAsync()).then(() => {
      toast.success('Products fetched successfully');
    }).catch((error) => {
      toast.error('Failed to fetch products');
      console.error(error);
    });
  
    const OPTIONS: Partial<Glide.Options> = {
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: { perView: 4 - 1 },
        1024: { gap: 20, perView: 4 - 1 },
        768: { gap: 20, perView: 4 - 2 },
        640: { gap: 20, perView: 1.5 },
        500: { gap: 20, perView: 1.3 },
      },
    };
  
    if (!sliderRef.current) return;
  
    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
  
    return () => {
      slider.destroy();
    };
  }, [dispatch]); // Only dispatch is a dependency here
  
  
 

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          
      
          <ul className="glide__slides">

          {Products.products && Products.products.length > 0 ? (
  Products.products.map((item: Product, index: any) => (
    <li key={index} className={`glide__slide ${itemClassName}`}>
      <ProductCard data={item} />
    </li>
  ))
) : (
  <p>No products available</p>
)}

          
          </ul>

        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
