/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listSteps, listStudents } from "../graphql/queries";
import { createProgress } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ProgressCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    progress: "",
    studentID: undefined,
    Step: undefined,
  };
  const [progress, setProgress] = React.useState(initialValues.progress);
  const [studentID, setStudentID] = React.useState(initialValues.studentID);
  const [studentIDLoading, setStudentIDLoading] = React.useState(false);
  const [studentIDRecords, setStudentIDRecords] = React.useState([]);
  const [selectedStudentIDRecords, setSelectedStudentIDRecords] =
    React.useState([]);
  const [Step, setStep] = React.useState(initialValues.Step);
  const [StepLoading, setStepLoading] = React.useState(false);
  const [stepRecords, setStepRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setProgress(initialValues.progress);
    setStudentID(initialValues.studentID);
    setCurrentStudentIDValue(undefined);
    setCurrentStudentIDDisplayValue("");
    setStep(initialValues.Step);
    setCurrentStepValue(undefined);
    setCurrentStepDisplayValue("");
    setErrors({});
  };
  const [currentStudentIDDisplayValue, setCurrentStudentIDDisplayValue] =
    React.useState("");
  const [currentStudentIDValue, setCurrentStudentIDValue] =
    React.useState(undefined);
  const studentIDRef = React.createRef();
  const [currentStepDisplayValue, setCurrentStepDisplayValue] =
    React.useState("");
  const [currentStepValue, setCurrentStepValue] = React.useState(undefined);
  const StepRef = React.createRef();
  const getIDValue = {
    Step: (r) => JSON.stringify({ id: r?.id }),
  };
  const StepIdSet = new Set(
    Array.isArray(Step)
      ? Step.map((r) => getIDValue.Step?.(r))
      : getIDValue.Step?.(Step)
  );
  const getDisplayValue = {
    studentID: (r) => `${r?.email ? r?.email + " - " : ""}${r?.id}`,
    Step: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    progress: [],
    studentID: [{ type: "Required" }],
    Step: [],
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
  const fetchStudentIDRecords = async (value) => {
    setStudentIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ email: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listStudents.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listStudents?.items;
      var loaded = result.filter((item) => studentID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setStudentIDRecords(newOptions.slice(0, autocompleteLength));
    setStudentIDLoading(false);
  };
  const fetchStepRecords = async (value) => {
    setStepLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ title: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listSteps.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listSteps?.items;
      var loaded = result.filter(
        (item) => !StepIdSet.has(getIDValue.Step?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setStepRecords(newOptions.slice(0, autocompleteLength));
    setStepLoading(false);
  };
  React.useEffect(() => {
    fetchStudentIDRecords("");
    fetchStepRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          progress,
          studentID,
          Step,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
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
          const modelFieldsToSave = {
            progress: modelFields.progress,
            studentID: modelFields.studentID,
            progressStepId: modelFields?.Step?.id,
          };
          await client.graphql({
            query: createProgress.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFieldsToSave,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProgressCreateForm")}
      {...rest}
    >
      <TextField
        label="Progress"
        isRequired={false}
        isReadOnly={false}
        value={progress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              progress: value,
              studentID,
              Step,
            };
            const result = onChange(modelFields);
            value = result?.progress ?? value;
          }
          if (errors.progress?.hasError) {
            runValidationTasks("progress", value);
          }
          setProgress(value);
        }}
        onBlur={() => runValidationTasks("progress", progress)}
        errorMessage={errors.progress?.errorMessage}
        hasError={errors.progress?.hasError}
        {...getOverrideProps(overrides, "progress")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              progress,
              studentID: value,
              Step,
            };
            const result = onChange(modelFields);
            value = result?.studentID ?? value;
          }
          setStudentID(value);
          setCurrentStudentIDValue(undefined);
        }}
        currentFieldValue={currentStudentIDValue}
        label={"Student id"}
        items={studentID ? [studentID] : []}
        hasError={errors?.studentID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("studentID", currentStudentIDValue)
        }
        errorMessage={errors?.studentID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.studentID(
                studentIDRecords.find((r) => r.id === value) ??
                  selectedStudentIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentStudentIDDisplayValue(
            value
              ? getDisplayValue.studentID(
                  studentIDRecords.find((r) => r.id === value) ??
                    selectedStudentIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentStudentIDValue(value);
          const selectedRecord = studentIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedStudentIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={studentIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Student id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Student"
          value={currentStudentIDDisplayValue}
          options={studentIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.studentID?.(r),
            }))}
          isLoading={studentIDLoading}
          onSelect={({ id, label }) => {
            setCurrentStudentIDValue(id);
            setCurrentStudentIDDisplayValue(label);
            runValidationTasks("studentID", label);
          }}
          onClear={() => {
            setCurrentStudentIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchStudentIDRecords(value);
            if (errors.studentID?.hasError) {
              runValidationTasks("studentID", value);
            }
            setCurrentStudentIDDisplayValue(value);
            setCurrentStudentIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("studentID", currentStudentIDValue)}
          errorMessage={errors.studentID?.errorMessage}
          hasError={errors.studentID?.hasError}
          ref={studentIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "studentID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              progress,
              studentID,
              Step: value,
            };
            const result = onChange(modelFields);
            value = result?.Step ?? value;
          }
          setStep(value);
          setCurrentStepValue(undefined);
          setCurrentStepDisplayValue("");
        }}
        currentFieldValue={currentStepValue}
        label={"Step"}
        items={Step ? [Step] : []}
        hasError={errors?.Step?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Step", currentStepValue)
        }
        errorMessage={errors?.Step?.errorMessage}
        getBadgeText={getDisplayValue.Step}
        setFieldValue={(model) => {
          setCurrentStepDisplayValue(model ? getDisplayValue.Step(model) : "");
          setCurrentStepValue(model);
        }}
        inputFieldRef={StepRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Step"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Step"
          value={currentStepDisplayValue}
          options={stepRecords
            .filter((r) => !StepIdSet.has(getIDValue.Step?.(r)))
            .map((r) => ({
              id: getIDValue.Step?.(r),
              label: getDisplayValue.Step?.(r),
            }))}
          isLoading={StepLoading}
          onSelect={({ id, label }) => {
            setCurrentStepValue(
              stepRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentStepDisplayValue(label);
            runValidationTasks("Step", label);
          }}
          onClear={() => {
            setCurrentStepDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchStepRecords(value);
            if (errors.Step?.hasError) {
              runValidationTasks("Step", value);
            }
            setCurrentStepDisplayValue(value);
            setCurrentStepValue(undefined);
          }}
          onBlur={() => runValidationTasks("Step", currentStepDisplayValue)}
          errorMessage={errors.Step?.errorMessage}
          hasError={errors.Step?.hasError}
          ref={StepRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Step")}
        ></Autocomplete>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
