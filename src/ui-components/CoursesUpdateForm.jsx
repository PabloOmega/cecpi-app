/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getCourses } from "../graphql/queries";
import { updateCourses } from "../graphql/mutations";
const client = generateClient();
export default function CoursesUpdateForm(props) {
  const {
    id: idProp,
    courses: coursesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    type: "",
    price: "",
    discount: "",
    shortDescription: "",
    description: "",
    image: "",
    duration: "",
    weeks: "",
    startDate: "",
    endDate: "",
    schedule: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [type, setType] = React.useState(initialValues.type);
  const [price, setPrice] = React.useState(initialValues.price);
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [shortDescription, setShortDescription] = React.useState(
    initialValues.shortDescription
  );
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [image, setImage] = React.useState(initialValues.image);
  const [duration, setDuration] = React.useState(initialValues.duration);
  const [weeks, setWeeks] = React.useState(initialValues.weeks);
  const [startDate, setStartDate] = React.useState(initialValues.startDate);
  const [endDate, setEndDate] = React.useState(initialValues.endDate);
  const [schedule, setSchedule] = React.useState(initialValues.schedule);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = coursesRecord
      ? { ...initialValues, ...coursesRecord }
      : initialValues;
    setName(cleanValues.name);
    setType(cleanValues.type);
    setPrice(cleanValues.price);
    setDiscount(cleanValues.discount);
    setShortDescription(cleanValues.shortDescription);
    setDescription(cleanValues.description);
    setImage(cleanValues.image);
    setDuration(cleanValues.duration);
    setWeeks(cleanValues.weeks);
    setStartDate(cleanValues.startDate);
    setEndDate(cleanValues.endDate);
    setSchedule(cleanValues.schedule);
    setErrors({});
  };
  const [coursesRecord, setCoursesRecord] = React.useState(coursesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCourses.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCourses
        : coursesModelProp;
      setCoursesRecord(record);
    };
    queryData();
  }, [idProp, coursesModelProp]);
  React.useEffect(resetStateValues, [coursesRecord]);
  const validations = {
    name: [{ type: "Required" }],
    type: [{ type: "Required" }],
    price: [{ type: "Required" }],
    discount: [],
    shortDescription: [{ type: "Required" }],
    description: [],
    image: [{ type: "Required" }, { type: "URL" }],
    duration: [],
    weeks: [],
    startDate: [],
    endDate: [],
    schedule: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          type,
          price,
          discount: discount ?? null,
          shortDescription,
          description: description ?? null,
          image,
          duration: duration ?? null,
          weeks: weeks ?? null,
          startDate: startDate ?? null,
          endDate: endDate ?? null,
          schedule: schedule ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateCourses.replaceAll("__typename", ""),
            variables: {
              input: {
                id: coursesRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CoursesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type: value,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              type,
              price: value,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Discount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={discount}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount: value,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.discount ?? value;
          }
          if (errors.discount?.hasError) {
            runValidationTasks("discount", value);
          }
          setDiscount(value);
        }}
        onBlur={() => runValidationTasks("discount", discount)}
        errorMessage={errors.discount?.errorMessage}
        hasError={errors.discount?.hasError}
        {...getOverrideProps(overrides, "discount")}
      ></TextField>
      <TextField
        label="Short description"
        isRequired={true}
        isReadOnly={false}
        value={shortDescription}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription: value,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.shortDescription ?? value;
          }
          if (errors.shortDescription?.hasError) {
            runValidationTasks("shortDescription", value);
          }
          setShortDescription(value);
        }}
        onBlur={() => runValidationTasks("shortDescription", shortDescription)}
        errorMessage={errors.shortDescription?.errorMessage}
        hasError={errors.shortDescription?.hasError}
        {...getOverrideProps(overrides, "shortDescription")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description: value,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Image"
        isRequired={true}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image: value,
              duration,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <TextField
        label="Duration"
        isRequired={false}
        isReadOnly={false}
        value={duration}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration: value,
              weeks,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.duration ?? value;
          }
          if (errors.duration?.hasError) {
            runValidationTasks("duration", value);
          }
          setDuration(value);
        }}
        onBlur={() => runValidationTasks("duration", duration)}
        errorMessage={errors.duration?.errorMessage}
        hasError={errors.duration?.hasError}
        {...getOverrideProps(overrides, "duration")}
      ></TextField>
      <TextField
        label="Weeks"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={weeks}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks: value,
              startDate,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.weeks ?? value;
          }
          if (errors.weeks?.hasError) {
            runValidationTasks("weeks", value);
          }
          setWeeks(value);
        }}
        onBlur={() => runValidationTasks("weeks", weeks)}
        errorMessage={errors.weeks?.errorMessage}
        hasError={errors.weeks?.hasError}
        {...getOverrideProps(overrides, "weeks")}
      ></TextField>
      <TextField
        label="Start date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={startDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate: value,
              endDate,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.startDate ?? value;
          }
          if (errors.startDate?.hasError) {
            runValidationTasks("startDate", value);
          }
          setStartDate(value);
        }}
        onBlur={() => runValidationTasks("startDate", startDate)}
        errorMessage={errors.startDate?.errorMessage}
        hasError={errors.startDate?.hasError}
        {...getOverrideProps(overrides, "startDate")}
      ></TextField>
      <TextField
        label="End date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={endDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate: value,
              schedule,
            };
            const result = onChange(modelFields);
            value = result?.endDate ?? value;
          }
          if (errors.endDate?.hasError) {
            runValidationTasks("endDate", value);
          }
          setEndDate(value);
        }}
        onBlur={() => runValidationTasks("endDate", endDate)}
        errorMessage={errors.endDate?.errorMessage}
        hasError={errors.endDate?.hasError}
        {...getOverrideProps(overrides, "endDate")}
      ></TextField>
      <TextField
        label="Schedule"
        isRequired={false}
        isReadOnly={false}
        value={schedule}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              shortDescription,
              description,
              image,
              duration,
              weeks,
              startDate,
              endDate,
              schedule: value,
            };
            const result = onChange(modelFields);
            value = result?.schedule ?? value;
          }
          if (errors.schedule?.hasError) {
            runValidationTasks("schedule", value);
          }
          setSchedule(value);
        }}
        onBlur={() => runValidationTasks("schedule", schedule)}
        errorMessage={errors.schedule?.errorMessage}
        hasError={errors.schedule?.hasError}
        {...getOverrideProps(overrides, "schedule")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || coursesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || coursesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
