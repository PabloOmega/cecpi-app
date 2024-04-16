/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CoursesUpdateFormInputValues = {
    name?: string;
    type?: string;
    price?: number;
    discount?: number;
    shortDescription?: string;
    description?: string;
    image?: string;
    duration?: string;
    weeks?: number;
    startDate?: string;
    endDate?: string;
    schedule?: string;
};
export declare type CoursesUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    discount?: ValidationFunction<number>;
    shortDescription?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
    duration?: ValidationFunction<string>;
    weeks?: ValidationFunction<number>;
    startDate?: ValidationFunction<string>;
    endDate?: ValidationFunction<string>;
    schedule?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoursesUpdateFormOverridesProps = {
    CoursesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    discount?: PrimitiveOverrideProps<TextFieldProps>;
    shortDescription?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
    weeks?: PrimitiveOverrideProps<TextFieldProps>;
    startDate?: PrimitiveOverrideProps<TextFieldProps>;
    endDate?: PrimitiveOverrideProps<TextFieldProps>;
    schedule?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoursesUpdateFormProps = React.PropsWithChildren<{
    overrides?: CoursesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    courses?: any;
    onSubmit?: (fields: CoursesUpdateFormInputValues) => CoursesUpdateFormInputValues;
    onSuccess?: (fields: CoursesUpdateFormInputValues) => void;
    onError?: (fields: CoursesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoursesUpdateFormInputValues) => CoursesUpdateFormInputValues;
    onValidate?: CoursesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CoursesUpdateForm(props: CoursesUpdateFormProps): React.ReactElement;
