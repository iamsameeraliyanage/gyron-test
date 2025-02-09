import React from 'react';
import Dialog from '../dialog/Dialog';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import TextInput from '../form/TextInput';
import TextArea from '../form/TextArea';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Checkbox from '../form/Checkbox';
import { ConfiggurationFormData } from '../configurator-form-body/ConfiguratorForm';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  consent: boolean;
}

const CheckoutFormDialog = ({
  onClose,
  orderData,
}: {
  onClose: () => void;
  orderData: ConfiggurationFormData;
}) => {
  const methods = useForm<CheckoutFormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      phone: '',
      consent: false,
    },
    mode: 'onChange',
  });
  const { handleSubmit, control, formState } = methods;

  const { isValid, isSubmitting } = formState;

  const onSubmit = (data: CheckoutFormData) => {
    console.log(orderData);
    console.log(data);
  };

  return (
    <Dialog isOpen={true} onClose={onClose}>
      <div>
        <div className="mb-4 px-4">
          <h2 className="text-lg font-bold">Checkout the Order</h2>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="h-full flex flex-col overflow-auto"
          >
            <div className="flex flex-col">
              <div className="flex flex-col px-4">
                <div className="mb-4">
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
                            label="First Name"
                            error={!!error}
                            helperText={error?.message}
                            placeholder='Eg: "John"'
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
                            label="Last Name"
                            error={!!error}
                            helperText={error?.message}
                            placeholder='Eg: "Doe"'
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex -mx-4">
                    <div className="basis-1/2 max-w-[50%] px-4">
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
                            label="Email Address"
                            error={!!error}
                            helperText={error?.message}
                            placeholder='Eg: "2xk8Y@example.com"'
                          />
                        )}
                      />
                    </div>
                    <div className="basis-1/2 max-w-[50%] px-4">
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: 'Phone number is required',
                          pattern: {
                            value: /^\d+$/,
                            message: 'Invalid phone number',
                          },
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextInput
                            {...field}
                            label="Phone Number"
                            error={!!error}
                            helperText={error?.message}
                            placeholder='Eg: "123-4567-890"'
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Controller
                    name="message"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextArea
                        {...field}
                        label="Special Requests"
                        error={!!error}
                        helperText={error?.message}
                        placeholder='Eg: "I need a customised color gyrocpter"'
                        optional
                      />
                    )}
                  />
                </div>
                <div className="mb-4">
                  <div>
                    <div>
                      <Controller
                        name="consent"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <Checkbox
                            {...field}
                            id="consent"
                            label="You must consent to the storage of your data before proceeding"
                            error={!!error}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center px-4 pt-4">
                <button
                  className="border border-gray-500  py-4 px-8 rounded-xl hover:border-gray-700 text-primary hover:text-gray-800"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="bg-primary hover:bg-gray-800 text-white py-4 px-8 rounded-xl disabled:bg-gray-300 disabled:text-white disabled:pointer-events-none"
                  type="submit"
                  disabled={!isValid}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span>Saving</span>
                      <span>
                        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                      </span>
                    </div>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </Dialog>
  );
};

export default CheckoutFormDialog;
