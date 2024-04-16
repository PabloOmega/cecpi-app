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
export declare type ProgressUpdateFormInputValues = {
    progress?: string;
    studentID?: string;
    Step?: any;
};
export declare type ProgressUpdateFormValidationValues = {
    progress?: ValidationFunction<string>;
    studentID?: ValidationFunction<string>;
    Step?: ValidationFunction<any>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgressUpdateFormOverridesProps = {
    ProgressUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    progress?: PrimitiveOverrideProps<TextFieldProps>;
    studentID?: PrimitiveOverrideProps<AutocompleteProps>;
    Step?: PrimitiveOverrideProps<AutocompleteProps>;
} & EscapeHatchProps;
export declare type ProgressUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgressUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    progress?: any;
    onSubmit?: (fields: ProgressUpdateFormInputValues) => ProgressUpdateFormInputValues;
    onSuccess?: (fields: ProgressUpdateFormInputValues) => void;
    onError?: (fields: ProgressUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgressUpdateFormInputValues) => ProgressUpdateFormInputValues;
    onValidate?: ProgressUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgressUpdateForm(props: ProgressUpdateFormProps): React.ReactElement;
