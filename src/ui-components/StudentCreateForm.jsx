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
import { listPrograms, listProgresses } from "../graphql/queries";
import {
  createStudent,
  createStudentProgram,
  updateProgress,
} from "../graphql/mutations";
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
export default function StudentCreateForm(props) {
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
    userId: "",
    email: "",
    Programs: [],
    name: "",
    Progresses: [],
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [email, setEmail] = React.useState(initialValues.email);
  const [Programs, setPrograms] = React.useState(initialValues.Programs);
  const [ProgramsLoading, setProgramsLoading] = React.useState(false);
  const [programsRecords, setProgramsRecords] = React.useState([]);
  const [name, setName] = React.useState(initialValues.name);
  const [Progresses, setProgresses] = React.useState(initialValues.Progresses);
  const [ProgressesLoading, setProgressesLoading] = React.useState(false);
  const [progressesRecords, setProgressesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setEmail(initialValues.email);
    setPrograms(initialValues.Programs);
    setCurrentProgramsValue(undefined);
    setCurrentProgramsDisplayValue("");
    setName(initialValues.name);
    setProgresses(initialValues.Progresses);
    setCurrentProgressesValue(undefined);
    setCurrentProgressesDisplayValue("");
    setErrors({});
  };
  const [currentProgramsDisplayValue, setCurrentProgramsDisplayValue] =
    React.useState("");
  const [currentProgramsValue, setCurrentProgramsValue] =
    React.useState(undefined);
  const ProgramsRef = React.createRef();
  const [currentProgressesDisplayValue, setCurrentProgressesDisplayValue] =
    React.useState("");
  const [currentProgressesValue, setCurrentProgressesValue] =
    React.useState(undefined);
  const ProgressesRef = React.createRef();
  const getIDValue = {
    Programs: (r) => JSON.stringify({ id: r?.id }),
    Progresses: (r) => JSON.stringify({ id: r?.id }),
  };
  const ProgramsIdSet = new Set(
    Array.isArray(Programs)
      ? Programs.map((r) => getIDValue.Programs?.(r))
      : getIDValue.Programs?.(Programs)
  );
  const ProgressesIdSet = new Set(
    Array.isArray(Progresses)
      ? Progresses.map((r) => getIDValue.Progresses?.(r))
      : getIDValue.Progresses?.(Progresses)
  );
  const getDisplayValue = {
    Programs: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Progresses: (r) => `${r?.progress ? r?.progress + " - " : ""}${r?.id}`,
  };
  const validations = {
    userId: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    Programs: [],
    name: [{ type: "Required" }],
    Progresses: [],
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
  const fetchProgramsRecords = async (value) => {
    setProgramsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ name: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listPrograms.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listPrograms?.items;
      var loaded = result.filter(
        (item) => !ProgramsIdSet.has(getIDValue.Programs?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setProgramsRecords(newOptions.slice(0, autocompleteLength));
    setProgramsLoading(false);
  };
  const fetchProgressesRecords = async (value) => {
    setProgressesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ progress: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listProgresses.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listProgresses?.items;
      var loaded = result.filter(
        (item) => !ProgressesIdSet.has(getIDValue.Progresses?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setProgressesRecords(newOptions.slice(0, autocompleteLength));
    setProgressesLoading(false);
  };
  React.useEffect(() => {
    fetchProgramsRecords("");
    fetchProgressesRecords("");
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
          userId,
          email,
          Programs,
          name,
          Progresses,
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
            userId: modelFields.userId,
            email: modelFields.email,
            name: modelFields.name,
          };
          const student = (
            await client.graphql({
              query: createStudent.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createStudent;
          const promises = [];
          promises.push(
            ...Programs.reduce((promises, program) => {
              promises.push(
                client.graphql({
                  query: createStudentProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      studentId: student.id,
                      programId: program.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Progresses.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateProgress.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      studentID: student.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "StudentCreateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              email,
              Programs,
              name,
              Progresses,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email: value,
              Programs,
              name,
              Progresses,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              Programs: values,
              name,
              Progresses,
            };
            const result = onChange(modelFields);
            values = result?.Programs ?? values;
          }
          setPrograms(values);
          setCurrentProgramsValue(undefined);
          setCurrentProgramsDisplayValue("");
        }}
        currentFieldValue={currentProgramsValue}
        label={"Programs"}
        items={Programs}
        hasError={errors?.Programs?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Programs", currentProgramsValue)
        }
        errorMessage={errors?.Programs?.errorMessage}
        getBadgeText={getDisplayValue.Programs}
        setFieldValue={(model) => {
          setCurrentProgramsDisplayValue(
            model ? getDisplayValue.Programs(model) : ""
          );
          setCurrentProgramsValue(model);
        }}
        inputFieldRef={ProgramsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Programs"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Program"
          value={currentProgramsDisplayValue}
          options={programsRecords.map((r) => ({
            id: getIDValue.Programs?.(r),
            label: getDisplayValue.Programs?.(r),
          }))}
          isLoading={ProgramsLoading}
          onSelect={({ id, label }) => {
            setCurrentProgramsValue(
              programsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentProgramsDisplayValue(label);
            runValidationTasks("Programs", label);
          }}
          onClear={() => {
            setCurrentProgramsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchProgramsRecords(value);
            if (errors.Programs?.hasError) {
              runValidationTasks("Programs", value);
            }
            setCurrentProgramsDisplayValue(value);
            setCurrentProgramsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Programs", currentProgramsDisplayValue)
          }
          errorMessage={errors.Programs?.errorMessage}
          hasError={errors.Programs?.hasError}
          ref={ProgramsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Programs")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              Programs,
              name: value,
              Progresses,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              Programs,
              name,
              Progresses: values,
            };
            const result = onChange(modelFields);
            values = result?.Progresses ?? values;
          }
          setProgresses(values);
          setCurrentProgressesValue(undefined);
          setCurrentProgressesDisplayValue("");
        }}
        currentFieldValue={currentProgressesValue}
        label={"Progresses"}
        items={Progresses}
        hasError={errors?.Progresses?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Progresses", currentProgressesValue)
        }
        errorMessage={errors?.Progresses?.errorMessage}
        getBadgeText={getDisplayValue.Progresses}
        setFieldValue={(model) => {
          setCurrentProgressesDisplayValue(
            model ? getDisplayValue.Progresses(model) : ""
          );
          setCurrentProgressesValue(model);
        }}
        inputFieldRef={ProgressesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Progresses"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Progress"
          value={currentProgressesDisplayValue}
          options={progressesRecords
            .filter((r) => !ProgressesIdSet.has(getIDValue.Progresses?.(r)))
            .map((r) => ({
              id: getIDValue.Progresses?.(r),
              label: getDisplayValue.Progresses?.(r),
            }))}
          isLoading={ProgressesLoading}
          onSelect={({ id, label }) => {
            setCurrentProgressesValue(
              progressesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentProgressesDisplayValue(label);
            runValidationTasks("Progresses", label);
          }}
          onClear={() => {
            setCurrentProgressesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchProgressesRecords(value);
            if (errors.Progresses?.hasError) {
              runValidationTasks("Progresses", value);
            }
            setCurrentProgressesDisplayValue(value);
            setCurrentProgressesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Progresses", currentProgressesDisplayValue)
          }
          errorMessage={errors.Progresses?.errorMessage}
          hasError={errors.Progresses?.hasError}
          ref={ProgressesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Progresses")}
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
