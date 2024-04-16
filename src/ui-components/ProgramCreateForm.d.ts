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
export declare type ProgramCreateFormInputValues = {
    name?: string;
    type?: string;
    price?: number;
    discount?: number;
    isLive?: boolean;
    image?: string;
    shortDescription?: string;
    students?: any[];
    instructors?: any[];
    Units?: any[];
    Meetings?: any[];
};
export declare type ProgramCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
    discount?: ValidationFunction<number>;
    isLive?: ValidationFunction<boolean>;
    image?: ValidationFunction<string>;
    shortDescription?: ValidationFunction<string>;
    students?: ValidationFunction<any>;
    instructors?: ValidationFunction<any>;
    Units?: ValidationFunction<any>;
    Meetings?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramCreateFormOverridesProps = {
    ProgramCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    discount?: PrimitiveOverrideProps<TextFieldProps>;
    isLive?: PrimitiveOverrideProps<SwitchFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    shortDescription?: PrimitiveOverrideProps<TextFieldProps>;
    students?: PrimitiveOverrideProps<AutocompleteProps>;
    instructors?: PrimitiveOverrideProps<AutocompleteProps>;
    Units?: PrimitiveOverrideProps<AutocompleteProps>;
    Meetings?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ProgramCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramCreateFormInputValues) => ProgramCreateFormInputValues;
    onSuccess?: (fields: ProgramCreateFormInputValues) => void;
    onError?: (fields: ProgramCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramCreateFormInputValues) => ProgramCreateFormInputValues;
    onValidate?: ProgramCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramCreateForm(props: ProgramCreateFormProps): React.ReactElement;
