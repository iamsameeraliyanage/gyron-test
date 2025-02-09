/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConfigurationGroup,
  ConfiguratorOption,
  SubConfigurationGroup,
} from '@/api/types';
import { ConfiggurationFormData } from '../components/configurator-form-body/ConfiguratorFormOld';
import { useCallback } from 'react';
import * as yup from 'yup';

const calculateTotalOptionPrice = (
  configurationGroups: ConfigurationGroup[],
  submittedData: Record<string, string | string[]>
): number => {
  let totalPrice = 0;

  const allOptions: ConfiguratorOption[] = [];
  configurationGroups.forEach((group) => {
    allOptions.push(...group.options);
    if (group.optionCategories) {
      group.optionCategories.forEach((subGroup) => {
        allOptions.push(...subGroup.options);
      });
    }
  });

  const optionsMap: Record<string, ConfiguratorOption> = {};
  allOptions.forEach((option) => {
    optionsMap[option.partId] = option;
  });

  Object.entries(submittedData).forEach(([_fieldName, value]) => {
    if (Array.isArray(value)) {
      value.forEach((partId) => {
        if (optionsMap[partId]) {
          totalPrice += optionsMap[partId].price;
        }
      });
    } else {
      if (optionsMap[value]) {
        totalPrice += optionsMap[value].price;
      }
    }
  });
  return parseFloat(totalPrice.toFixed(2));
};

const calculateTotalOptionWeight = (
  configurationGroups: ConfigurationGroup[],
  submittedData: Record<string, string | string[]>
): number => {
  let totalWeight = 0;

  const allOptions: ConfiguratorOption[] = [];
  configurationGroups.forEach((group) => {
    allOptions.push(...group.options);
    if (group.optionCategories) {
      group.optionCategories.forEach((subGroup) => {
        allOptions.push(...subGroup.options);
      });
    }
  });

  const optionsMap: Record<string, ConfiguratorOption> = {};
  allOptions.forEach((option) => {
    optionsMap[option.partId] = option;
  });

  Object.entries(submittedData).forEach(([_fieldName, value]) => {
    if (Array.isArray(value)) {
      value.forEach((partId) => {
        if (optionsMap[partId]) {
          totalWeight += optionsMap[partId].weight;
        }
      });
    } else {
      if (optionsMap[value]) {
        totalWeight += optionsMap[value].weight;
      }
    }
  });

  return parseFloat(totalWeight.toFixed(2));
};
const getWieghtBarColorClases = (
  totalWeight: number,
  modelMaxWeight: number
) => {
  let barColorClasses = `bg-skyline`;
  if (totalWeight >= modelMaxWeight) {
    barColorClasses = 'bg-red-500 w-full';
  } else if (totalWeight >= modelMaxWeight * 0.9) {
    barColorClasses = `bg-orange-500`;
  }
  return barColorClasses;
};

const generateValidationSchema = (updatedData: ConfigurationGroup[]) => {
  const buildSchema = (
    category: ConfigurationGroup | SubConfigurationGroup
  ): Record<string, yup.AnySchema> => {
    const schema: Record<string, yup.AnySchema> = {};
    if (category.isOptional) {
      return schema;
    }

    if (
      !('optionCategories' in category) ||
      category.optionCategories.length === 0
    ) {
      if (category.selectType === 'SINGLE_SELECT') {
        schema[category.fieldName!] = yup
          .string()
          .required(`${category.category} is required`);
      } else if (category.selectType === 'MULTI_SELECT') {
        schema[category.fieldName!] = yup
          .array()
          .min(
            1,
            `At least one option from ${category.category} must be selected`
          );
      }
    }

    if (
      'optionCategories' in category &&
      category.optionCategories.length > 0
    ) {
      category.optionCategories.forEach((subCategory) => {
        if (!subCategory.isOptional) {
          const subSchema = buildSchema(subCategory);
          Object.assign(schema, subSchema);
        }
      });
    }

    return schema;
  };

  return yup.object().shape(
    updatedData.reduce((acc, category) => {
      return { ...acc, ...buildSchema(category) };
    }, {})
  );
};

const useYupValidationResolver = (validationSchema: yup.AnyObjectSchema) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });
        return { values, errors: {} };
      } catch (errors) {
        return {
          values: {},
          errors: (errors as yup.ValidationError).inner.reduce(
            (allErrors, currentError) => {
              if (!currentError.path) return allErrors; // Skip if path is undefined
              return {
                ...allErrors,
                [currentError.path]: {
                  type: currentError.type ?? 'validation',
                  message: currentError.message,
                },
              };
            },
            {} as Record<string, { type: string; message: string }>
          ),
        };
      }
    },
    [validationSchema]
  );

const getDefaultValues = (
  updatedData: ConfigurationGroup[]
): ConfiggurationFormData => {
  return updatedData.reduce((acc, category) => {
    if (!category.optionCategories || category.optionCategories.length === 0) {
      const defaultOptions =
        category.options
          ?.filter((opt) => opt.isDefault)
          .map((opt) => opt.partId.toString()) || [];

      if (category.selectType === 'SINGLE_SELECT') {
        acc[category.fieldName!] =
          defaultOptions.length > 0 ? defaultOptions[0] : '';
      } else if (category.selectType === 'MULTI_SELECT') {
        acc[category.fieldName!] = defaultOptions;
      }
    }

    // Recursively set defaults for subcategories
    if (category.optionCategories && category.optionCategories.length > 0) {
      category.optionCategories.forEach((subCategory) => {
        const defaultSubOptions =
          subCategory.options
            ?.filter((opt) => opt.isDefault)
            .map((opt) => opt.partId.toString()) || [];

        if (subCategory.selectType === 'SINGLE_SELECT') {
          acc[subCategory.fieldName!] =
            defaultSubOptions.length > 0 ? defaultSubOptions[0] : ''; // Use first default option if available
        } else if (subCategory.selectType === 'MULTI_SELECT') {
          acc[subCategory.fieldName!] = defaultSubOptions;
        }
      });
    }

    return acc;
  }, {} as ConfiggurationFormData);
};

function getUpdatedDataWithFieldName(
  configurationList: ConfigurationGroup[]
): ConfigurationGroup[] {
  return configurationList.map((category) => {
    const categoryFieldName = category.category
      .toLowerCase()
      .replace(/\s+/g, '-');

    if (category.optionCategories && category.optionCategories.length > 0) {
      const updatedOptionCategories: SubConfigurationGroup[] =
        category.optionCategories.map((subCategory) => ({
          ...subCategory,
          fieldName: `${categoryFieldName}-${subCategory.category.toLowerCase().replace(/\s+/g, '-')}`,
        }));
      return {
        ...category,
        fieldName: categoryFieldName,
        optionCategories: updatedOptionCategories,
      };
    }

    return { ...category, fieldName: categoryFieldName };
  });
}

export {
  calculateTotalOptionPrice,
  calculateTotalOptionWeight,
  getWieghtBarColorClases,
  getDefaultValues,
  useYupValidationResolver,
  generateValidationSchema,
  getUpdatedDataWithFieldName,
};
