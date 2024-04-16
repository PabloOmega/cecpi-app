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
export declare type CursosUpdateFormInputValues = {
    title?: string;
};
export declare type CursosUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CursosUpdateFormOverridesProps = {
    CursosUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CursosUpdateFormProps = React.PropsWithChildren<{
    overrides?: CursosUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    cursos?: any;
    onSubmit?: (fields: CursosUpdateFormInputValues) => CursosUpdateFormInputValues;
    onSuccess?: (fields: CursosUpdateFormInputValues) => void;
    onError?: (fields: CursosUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CursosUpdateFormInputValues) => CursosUpdateFormInputValues;
    onValidate?: CursosUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CursosUpdateForm(props: CursosUpdateFormProps): React.ReactElement;
