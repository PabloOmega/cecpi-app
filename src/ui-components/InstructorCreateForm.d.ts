/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type InstructorCreateFormInputValues = {
    userId?: string;
    email?: string;
    Programs?: any[];
    name?: string;
};
export declare type InstructorCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    Programs?: ValidationFunction<any>;
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InstructorCreateFormOverridesProps = {
    InstructorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    Programs?: PrimitiveOverrideProps<AutocompleteProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InstructorCreateFormProps = React.PropsWithChildren<{
    overrides?: InstructorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: InstructorCreateFormInputValues) => InstructorCreateFormInputValues;
    onSuccess?: (fields: InstructorCreateFormInputValues) => void;
    onError?: (fields: InstructorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InstructorCreateFormInputValues) => InstructorCreateFormInputValues;
    onValidate?: InstructorCreateFormValidationValues;
} & React.CSSProperties>;
export default function InstructorCreateForm(props: InstructorCreateFormProps): React.ReactElement;
