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
export declare type ActionCreateFormInputValues = {
    title?: string;
    description?: string;
    vector?: string;
    url?: string;
    programID?: string;
};
export declare type ActionCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    vector?: ValidationFunction<string>;
    url?: ValidationFunction<string>;
    programID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ActionCreateFormOverridesProps = {
    ActionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    vector?: PrimitiveOverrideProps<TextFieldProps>;
    url?: PrimitiveOverrideProps<TextFieldProps>;
    programID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ActionCreateFormProps = React.PropsWithChildren<{
    overrides?: ActionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ActionCreateFormInputValues) => ActionCreateFormInputValues;
    onSuccess?: (fields: ActionCreateFormInputValues) => void;
    onError?: (fields: ActionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ActionCreateFormInputValues) => ActionCreateFormInputValues;
    onValidate?: ActionCreateFormValidationValues;
} & React.CSSProperties>;
export default function ActionCreateForm(props: ActionCreateFormProps): React.ReactElement;
