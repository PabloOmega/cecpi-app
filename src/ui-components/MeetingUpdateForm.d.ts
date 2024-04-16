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
export declare type MeetingUpdateFormInputValues = {
    title?: string;
    data?: string;
    date?: string;
    time?: string;
    description?: string;
    channelArn?: string;
    endpointMessaging?: string;
    mediaCaptureData?: string;
    programID?: string;
    Attendees?: any[];
    Messages?: any[];
};
export declare type MeetingUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    data?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    time?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    channelArn?: ValidationFunction<string>;
    endpointMessaging?: ValidationFunction<string>;
    mediaCaptureData?: ValidationFunction<string>;
    programID?: ValidationFunction<string>;
    Attendees?: ValidationFunction<any>;
    Messages?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MeetingUpdateFormOverridesProps = {
    MeetingUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    data?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    time?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    channelArn?: PrimitiveOverrideProps<TextFieldProps>;
    endpointMessaging?: PrimitiveOverrideProps<TextFieldProps>;
    mediaCaptureData?: PrimitiveOverrideProps<TextFieldProps>;
    programID?: PrimitiveOverrideProps<AutocompleteProps>;
    Attendees?: PrimitiveOverrideProps<AutocompleteProps>;
    Messages?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type MeetingUpdateFormProps = React.PropsWithChildren<{
    overrides?: MeetingUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    meeting?: any;
    onSubmit?: (fields: MeetingUpdateFormInputValues) => MeetingUpdateFormInputValues;
    onSuccess?: (fields: MeetingUpdateFormInputValues) => void;
    onError?: (fields: MeetingUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MeetingUpdateFormInputValues) => MeetingUpdateFormInputValues;
    onValidate?: MeetingUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MeetingUpdateForm(props: MeetingUpdateFormProps): React.ReactElement;
