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
export declare type MessageCreateFormInputValues = {
    content?: string;
    senderName?: string;
    type?: string;
    receiverID?: string;
    meetingID?: string;
    attendeeID?: string;
};
export declare type MessageCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    senderName?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    receiverID?: ValidationFunction<string>;
    meetingID?: ValidationFunction<string>;
    attendeeID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MessageCreateFormOverridesProps = {
    MessageCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    senderName?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    receiverID?: PrimitiveOverrideProps<TextFieldProps>;
    meetingID?: PrimitiveOverrideProps<AutocompleteProps>;
    attendeeID?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MessageCreateFormProps = React.PropsWithChildren<{
    overrides?: MessageCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MessageCreateFormInputValues) => MessageCreateFormInputValues;
    onSuccess?: (fields: MessageCreateFormInputValues) => void;
    onError?: (fields: MessageCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MessageCreateFormInputValues) => MessageCreateFormInputValues;
    onValidate?: MessageCreateFormValidationValues;
} & React.CSSProperties>;
export default function MessageCreateForm(props: MessageCreateFormProps): React.ReactElement;
