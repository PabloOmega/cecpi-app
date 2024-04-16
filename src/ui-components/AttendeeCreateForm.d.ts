/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AttendeeCreateFormInputValues = {
    attendeeId?: string;
    name?: string;
    data?: string;
    raisedHand?: boolean;
    userArn?: string;
    meetingID?: string;
    Student?: any;
    Messages?: any[];
};
export declare type AttendeeCreateFormValidationValues = {
    attendeeId?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    data?: ValidationFunction<string>;
    raisedHand?: ValidationFunction<boolean>;
    userArn?: ValidationFunction<string>;
    meetingID?: ValidationFunction<string>;
    Student?: ValidationFunction<any>;
    Messages?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttendeeCreateFormOverridesProps = {
    AttendeeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    attendeeId?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    data?: PrimitiveOverrideProps<TextFieldProps>;
    raisedHand?: PrimitiveOverrideProps<SwitchFieldProps>;
    userArn?: PrimitiveOverrideProps<TextFieldProps>;
    meetingID?: PrimitiveOverrideProps<AutocompleteProps>;
    Student?: PrimitiveOverrideProps<AutocompleteProps>;
    Messages?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type AttendeeCreateFormProps = React.PropsWithChildren<{
    overrides?: AttendeeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AttendeeCreateFormInputValues) => AttendeeCreateFormInputValues;
    onSuccess?: (fields: AttendeeCreateFormInputValues) => void;
    onError?: (fields: AttendeeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AttendeeCreateFormInputValues) => AttendeeCreateFormInputValues;
    onValidate?: AttendeeCreateFormValidationValues;
} & React.CSSProperties>;
export default function AttendeeCreateForm(props: AttendeeCreateFormProps): React.ReactElement;
