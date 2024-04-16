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
export declare type UnitCreateFormInputValues = {
    title?: string;
    poster?: string;
    order?: number;
    programID?: string;
    Steps?: any[];
};
export declare type UnitCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    poster?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
    programID?: ValidationFunction<string>;
    Steps?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UnitCreateFormOverridesProps = {
    UnitCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    poster?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
    programID?: PrimitiveOverrideProps<AutocompleteProps>;
    Steps?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UnitCreateFormProps = React.PropsWithChildren<{
    overrides?: UnitCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UnitCreateFormInputValues) => UnitCreateFormInputValues;
    onSuccess?: (fields: UnitCreateFormInputValues) => void;
    onError?: (fields: UnitCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UnitCreateFormInputValues) => UnitCreateFormInputValues;
    onValidate?: UnitCreateFormValidationValues;
} & React.CSSProperties>;
export default function UnitCreateForm(props: UnitCreateFormProps): React.ReactElement;
