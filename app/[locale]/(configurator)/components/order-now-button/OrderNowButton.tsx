import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const OrderNowButton = ({
  disabled,
  totalPrice,
  totalWeight,
}: {
  disabled?: boolean;
  totalPrice: string;
  totalWeight: number;
}) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        `orderNowButton bg-white rounded-tl-lg rounded-tr-lg px-6 py-7 w-full group/configfooter cursor-pointer transition-all hover:bg-skyline drop-shadow-lg`,
        isSubmitting && 'isSubmitting',
        disabled && 'pointer-events-none'
      )}
    >
      <div className="flex justify-between items-end ">
        <div className="text-left">
          <div className="text-gray-400 text-xs group-hover/configfooter:text-white transition-all">
            Total Price
          </div>
          <div className="text-2xl font-bold transition-all group-hover/configfooter:text-white">
            {totalPrice}
          </div>
          <div className="text-gray-400 text-xs group-hover/configfooter:text-white transition-all">
            Weight: <b>{totalWeight}Kg</b>
          </div>
        </div>
        <div>
          <div className="orderNowText flex items-center rounded px-6 py-2 text-white font-bold whitespace-nowrap group-hover/configfooter:bg-primary transition-all">
            Order Now
          </div>
        </div>
      </div>
    </button>
  );
};

export default OrderNowButton;
