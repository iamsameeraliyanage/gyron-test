'use client';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../form/TextInput';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface SubscribeFormData {
  email: string;
  honeypot: string;
}

const SubscribeForm = () => {
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const translate = useTranslations('Homepage.event.form');

  const methods = useForm<SubscribeFormData>({
    defaultValues: {
      email: '',
      honeypot: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, formState, reset } = methods;
  const { isSubmitting } = formState;

  const now = Date.now();
  const recentlySubmitted = lastSubmitTime && now - lastSubmitTime < 5000;

  const onSubmit = (data: SubscribeFormData) => {
    setErrorMessage(null); // Reset error message on new attempt

    if (recentlySubmitted) {
      setErrorMessage(translate('emailError'));
      return;
    }
    if (data.honeypot) {
      setErrorMessage(translate('emailSpam'));
      return;
    }

    setLastSubmitTime(now);
    console.log(data);
    reset();
    toast.success(translate('emailSent'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="flex gap-2 items-start w-full">
        <div className="grow">
          <Controller
            name="email"
            control={control}
            rules={{
              required: translate('emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translate('emailRequired'),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                error={!!error}
                helperText={error?.message}
                placeholder={translate('invalidEmail')}
              />
            )}
          />
          <Controller
            name="honeypot"
            control={control}
            defaultValue=""
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </div>
        <div>
          <button
            className="bg-primary text-white py-3 px-4 rounded-md hover:bg-skyline transition-all"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span>
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                </span>
              </div>
            ) : (
              <>{translate('subscribeButton')}</>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-2 text-red-500 text-sm">{errorMessage}</p>
      )}
    </form>
  );
};

export default SubscribeForm;
