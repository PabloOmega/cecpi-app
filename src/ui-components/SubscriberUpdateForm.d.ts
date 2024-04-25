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
export declare type SubscriberUpdateFormInputValues = {
    email?: string;
};
export declare type SubscriberUpdateFormValidationValues = {
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscriberUpdateFormOverridesProps = {
    SubscriberUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SubscriberUpdateFormProps = React.PropsWithChildren<{
    overrides?: SubscriberUpdateFormOverridesProps | undefined | null;
} & {
    email?: string;
    subscriber?: any;
    onSubmit?: (fields: SubscriberUpdateFormInputValues) => SubscriberUpdateFormInputValues;
    onSuccess?: (fields: SubscriberUpdateFormInputValues) => void;
    onError?: (fields: SubscriberUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscriberUpdateFormInputValues) => SubscriberUpdateFormInputValues;
    onValidate?: SubscriberUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SubscriberUpdateForm(props: SubscriberUpdateFormProps): React.ReactElement;
