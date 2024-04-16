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
export declare type StepCreateFormInputValues = {
    title?: string;
    description?: string;
    poster?: string;
    order?: number;
    Video?: any;
    unitID?: string;
};
export declare type StepCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    poster?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
    Video?: ValidationFunction<any>;
    unitID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StepCreateFormOverridesProps = {
    StepCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    poster?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
    Video?: PrimitiveOverrideProps<AutocompleteProps>;
    unitID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type StepCreateFormProps = React.PropsWithChildren<{
    overrides?: StepCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StepCreateFormInputValues) => StepCreateFormInputValues;
    onSuccess?: (fields: StepCreateFormInputValues) => void;
    onError?: (fields: StepCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StepCreateFormInputValues) => StepCreateFormInputValues;
    onValidate?: StepCreateFormValidationValues;
} & React.CSSProperties>;
export default function StepCreateForm(props: StepCreateFormProps): React.ReactElement;
