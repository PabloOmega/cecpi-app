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
export declare type UnitUpdateFormInputValues = {
    title?: string;
    poster?: string;
    order?: number;
    programID?: string;
    Steps?: any[];
};
export declare type UnitUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    poster?: ValidationFunction<string>;
    order?: ValidationFunction<number>;
    programID?: ValidationFunction<string>;
    Steps?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UnitUpdateFormOverridesProps = {
    UnitUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    poster?: PrimitiveOverrideProps<TextFieldProps>;
    order?: PrimitiveOverrideProps<TextFieldProps>;
    programID?: PrimitiveOverrideProps<AutocompleteProps>;
    Steps?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type UnitUpdateFormProps = React.PropsWithChildren<{
    overrides?: UnitUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    unit?: any;
    onSubmit?: (fields: UnitUpdateFormInputValues) => UnitUpdateFormInputValues;
    onSuccess?: (fields: UnitUpdateFormInputValues) => void;
    onError?: (fields: UnitUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UnitUpdateFormInputValues) => UnitUpdateFormInputValues;
    onValidate?: UnitUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UnitUpdateForm(props: UnitUpdateFormProps): React.ReactElement;
