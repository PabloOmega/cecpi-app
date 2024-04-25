/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, HeadingProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SubscriberCreateFormInputValues = {
    email?: string;
};
export declare type SubscriberCreateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscriberCreateFormOverridesProps = {
    SubscriberCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    SectionalElement0?: PrimitiveOverrideProps<HeadingProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscriberCreateFormProps = React.PropsWithChildren<{
    overrides?: SubscriberCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubscriberCreateFormInputValues) => SubscriberCreateFormInputValues;
    onSuccess?: (fields: SubscriberCreateFormInputValues) => void;
    onError?: (fields: SubscriberCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscriberCreateFormInputValues) => SubscriberCreateFormInputValues;
    onValidate?: SubscriberCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubscriberCreateForm(props: SubscriberCreateFormProps): React.ReactElement;
