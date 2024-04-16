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
import {
  getInstructor,
  instructorProgramsByInstructorUserId,
  listInstructorPrograms,
  listPrograms,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createInstructorProgram,
  deleteInstructorProgram,
  updateInstructor,
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
export default function InstructorUpdateForm(props) {
  const {
    userId: userIdProp,
    instructor: instructorModelProp,
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
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [email, setEmail] = React.useState(initialValues.email);
  const [Programs, setPrograms] = React.useState(initialValues.Programs);
  const [ProgramsLoading, setProgramsLoading] = React.useState(false);
  const [programsRecords, setProgramsRecords] = React.useState([]);
  const [name, setName] = React.useState(initialValues.name);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = instructorRecord
      ? { ...initialValues, ...instructorRecord, Programs: linkedPrograms }
      : initialValues;
    setUserId(cleanValues.userId);
    setEmail(cleanValues.email);
    setPrograms(cleanValues.Programs ?? []);
    setCurrentProgramsValue(undefined);
    setCurrentProgramsDisplayValue("");
    setName(cleanValues.name);
    setErrors({});
  };
  const [instructorRecord, setInstructorRecord] =
    React.useState(instructorModelProp);
  const [linkedPrograms, setLinkedPrograms] = React.useState([]);
  const canUnlinkPrograms = false;
  React.useEffect(() => {
    const queryData = async () => {
      const record = userIdProp
        ? (
            await client.graphql({
              query: getInstructor.replaceAll("__typename", ""),
              variables: { userId: userIdProp },
            })
          )?.data?.getInstructor
        : instructorModelProp;
      const linkedPrograms = record
        ? (
            await client.graphql({
              query: instructorProgramsByInstructorUserId.replaceAll(
                "__typename",
                ""
              ),
              variables: {
                instructorUserId: record.userId,
              },
            })
          ).data.instructorProgramsByInstructorUserId.items.map(
            (t) => t.program
          )
        : [];
      setLinkedPrograms(linkedPrograms);
      setInstructorRecord(record);
    };
    queryData();
  }, [userIdProp, instructorModelProp]);
  React.useEffect(resetStateValues, [instructorRecord, linkedPrograms]);
  const [currentProgramsDisplayValue, setCurrentProgramsDisplayValue] =
    React.useState("");
  const [currentProgramsValue, setCurrentProgramsValue] =
    React.useState(undefined);
  const ProgramsRef = React.createRef();
  const getIDValue = {
    Programs: (r) => JSON.stringify({ id: r?.id }),
  };
  const ProgramsIdSet = new Set(
    Array.isArray(Programs)
      ? Programs.map((r) => getIDValue.Programs?.(r))
      : getIDValue.Programs?.(Programs)
  );
  const getDisplayValue = {
    Programs: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
  };
  const validations = {
    userId: [{ type: "Required" }],
    email: [{ type: "Required" }, { type: "Email" }],
    Programs: [],
    name: [{ type: "Required" }],
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
  React.useEffect(() => {
    fetchProgramsRecords("");
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
          Programs: Programs ?? null,
          name,
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
          const promises = [];
          const programsToLinkMap = new Map();
          const programsToUnLinkMap = new Map();
          const programsMap = new Map();
          const linkedProgramsMap = new Map();
          Programs.forEach((r) => {
            const count = programsMap.get(getIDValue.Programs?.(r));
            const newCount = count ? count + 1 : 1;
            programsMap.set(getIDValue.Programs?.(r), newCount);
          });
          linkedPrograms.forEach((r) => {
            const count = linkedProgramsMap.get(getIDValue.Programs?.(r));
            const newCount = count ? count + 1 : 1;
            linkedProgramsMap.set(getIDValue.Programs?.(r), newCount);
          });
          linkedProgramsMap.forEach((count, id) => {
            const newCount = programsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                programsToUnLinkMap.set(id, diffCount);
              }
            } else {
              programsToUnLinkMap.set(id, count);
            }
          });
          programsMap.forEach((count, id) => {
            const originalCount = linkedProgramsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                programsToLinkMap.set(id, diffCount);
              }
            } else {
              programsToLinkMap.set(id, count);
            }
          });
          programsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const instructorProgramRecords = (
              await client.graphql({
                query: listInstructorPrograms.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { programId: { eq: recordKeys.id } },
                      { instructorUserId: { eq: instructorRecord.userId } },
                    ],
                  },
                },
              })
            )?.data?.listInstructorPrograms?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deleteInstructorProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: instructorProgramRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          programsToLinkMap.forEach((count, id) => {
            const programToLink = programsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createInstructorProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      instructorUserId: instructorRecord.userId,
                      programId: programToLink.id,
                    },
                  },
                })
              );
            }
          });
          const modelFieldsToSave = {
            userId: modelFields.userId,
            email: modelFields.email,
            name: modelFields.name,
          };
          promises.push(
            client.graphql({
              query: updateInstructor.replaceAll("__typename", ""),
              variables: {
                input: {
                  userId: instructorRecord.userId,
                  ...modelFieldsToSave,
                },
              },
            })
          );
          await Promise.all(promises);
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
      {...getOverrideProps(overrides, "InstructorUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={true}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              email,
              Programs,
              name,
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
          isDisabled={!(userIdProp || instructorModelProp)}
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
              !(userIdProp || instructorModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
