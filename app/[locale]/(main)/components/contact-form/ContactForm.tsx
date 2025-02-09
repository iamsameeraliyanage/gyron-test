'use client';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import { BsArrowUpRight } from 'react-icons/bs';

interface ContactFormData {
  city: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  street: string;
  zipCode: string;
}

const ContactForm = () => {
  const methods = useForm<ContactFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
    },
    mode: 'onChange',
  });
  const { handleSubmit, control, formState } = methods;
  const { isValid, isSubmitting } = formState;

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className="py-4">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col overflow-auto"
        >
          <div className="flex flex-col">
            <div className="flex flex-col px-4">
              <div className="mb-6">
                <div className="flex -mx-4">
                  <div className="basis-1/2 max-w-[50%] px-4">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        required: 'First name is required',
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextInput
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          placeholder="First Name*"
                        />
                      )}
                    />
                  </div>
                  <div className="basis-1/2 max-w-[50%] px-4">
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{
                        required: 'Last name is required',
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextInput
                          {...field}
                          error={!!error}
                          helperText={error?.message}
                          placeholder="Last Name*"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      placeholder="Email*"
                    />
                  )}
                />
              </div>
              <div className="mb-6">
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Phone Number is required',
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextInput
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      placeholder="Phone Number*"
                    />
                  )}
                />
              </div>
              <div className="mb-6">
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: 'Last name is required',
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <TextArea
                      {...field}
                      error={!!error}
                      helperText={error?.message}
                      placeholder="Your Message.."
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center px-4 pt-4">
              <button
                className="bg-skyline flex justify-center hover:bg-gray-800 text-white w-full py-3 px-8 rounded-xl disabled:bg-gray-300 disabled:text-white disabled:pointer-events-none"
                type="submit"
                disabled={!isValid}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-4">
                    <span>Sending</span>
                    <span>
                      <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span>Send</span>
                    <span>
                      <BsArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContactForm;
