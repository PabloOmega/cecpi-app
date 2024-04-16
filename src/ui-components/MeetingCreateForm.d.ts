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
export declare type MeetingCreateFormInputValues = {
    title?: string;
    date?: string;
    time?: string;
    description?: string;
    programID?: string;
    channelArn?: string;
    endpointMessaging?: string;
    mediaCaptureData?: string;
    Attendees?: any[];
    Messages?: any[];
};
export declare type MeetingCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    programID?: ValidationFunction<string>;
    channelArn?: ValidationFunction<string>;
    endpointMessaging?: ValidationFunction<string>;
    mediaCaptureData?: ValidationFunction<string>;
    Attendees?: ValidationFunction<any>;
    Messages?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MeetingCreateFormOverridesProps = {
    MeetingCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    programID?: PrimitiveOverrideProps<AutocompleteProps>;
    channelArn?: PrimitiveOverrideProps<TextFieldProps>;
    endpointMessaging?: PrimitiveOverrideProps<TextFieldProps>;
    mediaCaptureData?: PrimitiveOverrideProps<TextFieldProps>;
    Attendees?: PrimitiveOverrideProps<AutocompleteProps>;
    Messages?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MeetingCreateFormProps = React.PropsWithChildren<{
    overrides?: MeetingCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MeetingCreateFormInputValues) => MeetingCreateFormInputValues;
    onSuccess?: (fields: MeetingCreateFormInputValues) => void;
    onError?: (fields: MeetingCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MeetingCreateFormInputValues) => MeetingCreateFormInputValues;
    onValidate?: MeetingCreateFormValidationValues;
} & React.CSSProperties>;
export default function MeetingCreateForm(props: MeetingCreateFormProps): React.ReactElement;
