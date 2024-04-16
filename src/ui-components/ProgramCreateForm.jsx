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
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import {
  listInstructors,
  listMeetings,
  listStudents,
  listUnits,
} from "../graphql/queries";
import {
  createInstructorProgram,
  createProgram,
  createStudentProgram,
  updateMeeting,
  updateUnit,
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
export default function ProgramCreateForm(props) {
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
    name: "",
    type: "",
    price: "",
    discount: "",
    isLive: false,
    image: "",
    shortDescription: "",
    students: [],
    instructors: [],
    Units: [],
    Meetings: [],
  };
  const [name, setName] = React.useState(initialValues.name);
  const [type, setType] = React.useState(initialValues.type);
  const [price, setPrice] = React.useState(initialValues.price);
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [isLive, setIsLive] = React.useState(initialValues.isLive);
  const [image, setImage] = React.useState(initialValues.image);
  const [shortDescription, setShortDescription] = React.useState(
    initialValues.shortDescription
  );
  const [students, setStudents] = React.useState(initialValues.students);
  const [studentsLoading, setStudentsLoading] = React.useState(false);
  const [studentsRecords, setStudentsRecords] = React.useState([]);
  const [instructors, setInstructors] = React.useState(
    initialValues.instructors
  );
  const [instructorsLoading, setInstructorsLoading] = React.useState(false);
  const [instructorsRecords, setInstructorsRecords] = React.useState([]);
  const [Units, setUnits] = React.useState(initialValues.Units);
  const [UnitsLoading, setUnitsLoading] = React.useState(false);
  const [unitsRecords, setUnitsRecords] = React.useState([]);
  const [Meetings, setMeetings] = React.useState(initialValues.Meetings);
  const [MeetingsLoading, setMeetingsLoading] = React.useState(false);
  const [meetingsRecords, setMeetingsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setType(initialValues.type);
    setPrice(initialValues.price);
    setDiscount(initialValues.discount);
    setIsLive(initialValues.isLive);
    setImage(initialValues.image);
    setShortDescription(initialValues.shortDescription);
    setStudents(initialValues.students);
    setCurrentStudentsValue(undefined);
    setCurrentStudentsDisplayValue("");
    setInstructors(initialValues.instructors);
    setCurrentInstructorsValue(undefined);
    setCurrentInstructorsDisplayValue("");
    setUnits(initialValues.Units);
    setCurrentUnitsValue(undefined);
    setCurrentUnitsDisplayValue("");
    setMeetings(initialValues.Meetings);
    setCurrentMeetingsValue(undefined);
    setCurrentMeetingsDisplayValue("");
    setErrors({});
  };
  const [currentStudentsDisplayValue, setCurrentStudentsDisplayValue] =
    React.useState("");
  const [currentStudentsValue, setCurrentStudentsValue] =
    React.useState(undefined);
  const studentsRef = React.createRef();
  const [currentInstructorsDisplayValue, setCurrentInstructorsDisplayValue] =
    React.useState("");
  const [currentInstructorsValue, setCurrentInstructorsValue] =
    React.useState(undefined);
  const instructorsRef = React.createRef();
  const [currentUnitsDisplayValue, setCurrentUnitsDisplayValue] =
    React.useState("");
  const [currentUnitsValue, setCurrentUnitsValue] = React.useState(undefined);
  const UnitsRef = React.createRef();
  const [currentMeetingsDisplayValue, setCurrentMeetingsDisplayValue] =
    React.useState("");
  const [currentMeetingsValue, setCurrentMeetingsValue] =
    React.useState(undefined);
  const MeetingsRef = React.createRef();
  const getIDValue = {
    students: (r) => JSON.stringify({ id: r?.id }),
    instructors: (r) => JSON.stringify({ userId: r?.userId }),
    Units: (r) => JSON.stringify({ id: r?.id }),
    Meetings: (r) => JSON.stringify({ id: r?.id }),
  };
  const studentsIdSet = new Set(
    Array.isArray(students)
      ? students.map((r) => getIDValue.students?.(r))
      : getIDValue.students?.(students)
  );
  const instructorsIdSet = new Set(
    Array.isArray(instructors)
      ? instructors.map((r) => getIDValue.instructors?.(r))
      : getIDValue.instructors?.(instructors)
  );
  const UnitsIdSet = new Set(
    Array.isArray(Units)
      ? Units.map((r) => getIDValue.Units?.(r))
      : getIDValue.Units?.(Units)
  );
  const MeetingsIdSet = new Set(
    Array.isArray(Meetings)
      ? Meetings.map((r) => getIDValue.Meetings?.(r))
      : getIDValue.Meetings?.(Meetings)
  );
  const getDisplayValue = {
    students: (r) => `${r?.email ? r?.email + " - " : ""}${r?.id}`,
    instructors: (r) => `${r?.email ? r?.email + " - " : ""}${r?.userId}`,
    Units: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Meetings: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    name: [{ type: "Required" }],
    type: [{ type: "Required" }],
    price: [{ type: "Required" }],
    discount: [],
    isLive: [],
    image: [{ type: "URL" }],
    shortDescription: [],
    students: [],
    instructors: [],
    Units: [],
    Meetings: [],
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
  const fetchStudentsRecords = async (value) => {
    setStudentsLoading(true);
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
      var loaded = result.filter(
        (item) => !studentsIdSet.has(getIDValue.students?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setStudentsRecords(newOptions.slice(0, autocompleteLength));
    setStudentsLoading(false);
  };
  const fetchInstructorsRecords = async (value) => {
    setInstructorsLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ email: { contains: value } }, { userId: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listInstructors.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listInstructors?.items;
      var loaded = result.filter(
        (item) => !instructorsIdSet.has(getIDValue.instructors?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setInstructorsRecords(newOptions.slice(0, autocompleteLength));
    setInstructorsLoading(false);
  };
  const fetchUnitsRecords = async (value) => {
    setUnitsLoading(true);
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
          query: listUnits.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUnits?.items;
      var loaded = result.filter(
        (item) => !UnitsIdSet.has(getIDValue.Units?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUnitsRecords(newOptions.slice(0, autocompleteLength));
    setUnitsLoading(false);
  };
  const fetchMeetingsRecords = async (value) => {
    setMeetingsLoading(true);
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
          query: listMeetings.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMeetings?.items;
      var loaded = result.filter(
        (item) => !MeetingsIdSet.has(getIDValue.Meetings?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMeetingsRecords(newOptions.slice(0, autocompleteLength));
    setMeetingsLoading(false);
  };
  React.useEffect(() => {
    fetchStudentsRecords("");
    fetchInstructorsRecords("");
    fetchUnitsRecords("");
    fetchMeetingsRecords("");
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
          name,
          type,
          price,
          discount,
          isLive,
          image,
          shortDescription,
          students,
          instructors,
          Units,
          Meetings,
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
            name: modelFields.name,
            type: modelFields.type,
            price: modelFields.price,
            discount: modelFields.discount,
            isLive: modelFields.isLive,
            image: modelFields.image,
            shortDescription: modelFields.shortDescription,
          };
          const program = (
            await client.graphql({
              query: createProgram.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createProgram;
          const promises = [];
          promises.push(
            ...students.reduce((promises, student) => {
              promises.push(
                client.graphql({
                  query: createStudentProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      programId: program.id,
                      studentId: student.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...instructors.reduce((promises, instructor) => {
              promises.push(
                client.graphql({
                  query: createInstructorProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      programId: program.id,
                      instructorUserId: instructor.userId,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Units.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateUnit.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      programID: program.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Meetings.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateMeeting.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      programID: program.id,
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
      {...getOverrideProps(overrides, "ProgramCreateForm")}
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
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
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
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
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
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
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
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
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
      <SwitchField
        label="Is live"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isLive}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              isLive: value,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
            };
            const result = onChange(modelFields);
            value = result?.isLive ?? value;
          }
          if (errors.isLive?.hasError) {
            runValidationTasks("isLive", value);
          }
          setIsLive(value);
        }}
        onBlur={() => runValidationTasks("isLive", isLive)}
        errorMessage={errors.isLive?.errorMessage}
        hasError={errors.isLive?.hasError}
        {...getOverrideProps(overrides, "isLive")}
      ></SwitchField>
      <TextField
        label="Image"
        isRequired={false}
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
              isLive,
              image: value,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings,
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
        label="Short description"
        isRequired={false}
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
              isLive,
              image,
              shortDescription: value,
              students,
              instructors,
              Units,
              Meetings,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              isLive,
              image,
              shortDescription,
              students: values,
              instructors,
              Units,
              Meetings,
            };
            const result = onChange(modelFields);
            values = result?.students ?? values;
          }
          setStudents(values);
          setCurrentStudentsValue(undefined);
          setCurrentStudentsDisplayValue("");
        }}
        currentFieldValue={currentStudentsValue}
        label={"Students"}
        items={students}
        hasError={errors?.students?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("students", currentStudentsValue)
        }
        errorMessage={errors?.students?.errorMessage}
        getBadgeText={getDisplayValue.students}
        setFieldValue={(model) => {
          setCurrentStudentsDisplayValue(
            model ? getDisplayValue.students(model) : ""
          );
          setCurrentStudentsValue(model);
        }}
        inputFieldRef={studentsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Students"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Student"
          value={currentStudentsDisplayValue}
          options={studentsRecords.map((r) => ({
            id: getIDValue.students?.(r),
            label: getDisplayValue.students?.(r),
          }))}
          isLoading={studentsLoading}
          onSelect={({ id, label }) => {
            setCurrentStudentsValue(
              studentsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentStudentsDisplayValue(label);
            runValidationTasks("students", label);
          }}
          onClear={() => {
            setCurrentStudentsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchStudentsRecords(value);
            if (errors.students?.hasError) {
              runValidationTasks("students", value);
            }
            setCurrentStudentsDisplayValue(value);
            setCurrentStudentsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("students", currentStudentsDisplayValue)
          }
          errorMessage={errors.students?.errorMessage}
          hasError={errors.students?.hasError}
          ref={studentsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "students")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              isLive,
              image,
              shortDescription,
              students,
              instructors: values,
              Units,
              Meetings,
            };
            const result = onChange(modelFields);
            values = result?.instructors ?? values;
          }
          setInstructors(values);
          setCurrentInstructorsValue(undefined);
          setCurrentInstructorsDisplayValue("");
        }}
        currentFieldValue={currentInstructorsValue}
        label={"Instructors"}
        items={instructors}
        hasError={errors?.instructors?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("instructors", currentInstructorsValue)
        }
        errorMessage={errors?.instructors?.errorMessage}
        getBadgeText={getDisplayValue.instructors}
        setFieldValue={(model) => {
          setCurrentInstructorsDisplayValue(
            model ? getDisplayValue.instructors(model) : ""
          );
          setCurrentInstructorsValue(model);
        }}
        inputFieldRef={instructorsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Instructors"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Instructor"
          value={currentInstructorsDisplayValue}
          options={instructorsRecords.map((r) => ({
            id: getIDValue.instructors?.(r),
            label: getDisplayValue.instructors?.(r),
          }))}
          isLoading={instructorsLoading}
          onSelect={({ id, label }) => {
            setCurrentInstructorsValue(
              instructorsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentInstructorsDisplayValue(label);
            runValidationTasks("instructors", label);
          }}
          onClear={() => {
            setCurrentInstructorsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchInstructorsRecords(value);
            if (errors.instructors?.hasError) {
              runValidationTasks("instructors", value);
            }
            setCurrentInstructorsDisplayValue(value);
            setCurrentInstructorsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("instructors", currentInstructorsDisplayValue)
          }
          errorMessage={errors.instructors?.errorMessage}
          hasError={errors.instructors?.hasError}
          ref={instructorsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "instructors")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units: values,
              Meetings,
            };
            const result = onChange(modelFields);
            values = result?.Units ?? values;
          }
          setUnits(values);
          setCurrentUnitsValue(undefined);
          setCurrentUnitsDisplayValue("");
        }}
        currentFieldValue={currentUnitsValue}
        label={"Units"}
        items={Units}
        hasError={errors?.Units?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Units", currentUnitsValue)
        }
        errorMessage={errors?.Units?.errorMessage}
        getBadgeText={getDisplayValue.Units}
        setFieldValue={(model) => {
          setCurrentUnitsDisplayValue(
            model ? getDisplayValue.Units(model) : ""
          );
          setCurrentUnitsValue(model);
        }}
        inputFieldRef={UnitsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Units"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Unit"
          value={currentUnitsDisplayValue}
          options={unitsRecords
            .filter((r) => !UnitsIdSet.has(getIDValue.Units?.(r)))
            .map((r) => ({
              id: getIDValue.Units?.(r),
              label: getDisplayValue.Units?.(r),
            }))}
          isLoading={UnitsLoading}
          onSelect={({ id, label }) => {
            setCurrentUnitsValue(
              unitsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentUnitsDisplayValue(label);
            runValidationTasks("Units", label);
          }}
          onClear={() => {
            setCurrentUnitsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchUnitsRecords(value);
            if (errors.Units?.hasError) {
              runValidationTasks("Units", value);
            }
            setCurrentUnitsDisplayValue(value);
            setCurrentUnitsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Units", currentUnitsDisplayValue)}
          errorMessage={errors.Units?.errorMessage}
          hasError={errors.Units?.hasError}
          ref={UnitsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Units")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              type,
              price,
              discount,
              isLive,
              image,
              shortDescription,
              students,
              instructors,
              Units,
              Meetings: values,
            };
            const result = onChange(modelFields);
            values = result?.Meetings ?? values;
          }
          setMeetings(values);
          setCurrentMeetingsValue(undefined);
          setCurrentMeetingsDisplayValue("");
        }}
        currentFieldValue={currentMeetingsValue}
        label={"Meetings"}
        items={Meetings}
        hasError={errors?.Meetings?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Meetings", currentMeetingsValue)
        }
        errorMessage={errors?.Meetings?.errorMessage}
        getBadgeText={getDisplayValue.Meetings}
        setFieldValue={(model) => {
          setCurrentMeetingsDisplayValue(
            model ? getDisplayValue.Meetings(model) : ""
          );
          setCurrentMeetingsValue(model);
        }}
        inputFieldRef={MeetingsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Meetings"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Meeting"
          value={currentMeetingsDisplayValue}
          options={meetingsRecords
            .filter((r) => !MeetingsIdSet.has(getIDValue.Meetings?.(r)))
            .map((r) => ({
              id: getIDValue.Meetings?.(r),
              label: getDisplayValue.Meetings?.(r),
            }))}
          isLoading={MeetingsLoading}
          onSelect={({ id, label }) => {
            setCurrentMeetingsValue(
              meetingsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMeetingsDisplayValue(label);
            runValidationTasks("Meetings", label);
          }}
          onClear={() => {
            setCurrentMeetingsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMeetingsRecords(value);
            if (errors.Meetings?.hasError) {
              runValidationTasks("Meetings", value);
            }
            setCurrentMeetingsDisplayValue(value);
            setCurrentMeetingsValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Meetings", currentMeetingsDisplayValue)
          }
          errorMessage={errors.Meetings?.errorMessage}
          hasError={errors.Meetings?.hasError}
          ref={MeetingsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Meetings")}
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
