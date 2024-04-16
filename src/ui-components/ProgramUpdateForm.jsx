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
import {
  getProgram,
  instructorProgramsByProgramId,
  listInstructorPrograms,
  listInstructors,
  listMeetings,
  listStudentPrograms,
  listStudents,
  listUnits,
  studentProgramsByProgramId,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import {
  createInstructorProgram,
  createStudentProgram,
  deleteInstructorProgram,
  deleteStudentProgram,
  updateMeeting,
  updateProgram,
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
export default function ProgramUpdateForm(props) {
  const {
    id: idProp,
    program: programModelProp,
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
    const cleanValues = programRecord
      ? {
          ...initialValues,
          ...programRecord,
          students: linkedStudents,
          instructors: linkedInstructors,
          Units: linkedUnits,
          Meetings: linkedMeetings,
        }
      : initialValues;
    setName(cleanValues.name);
    setType(cleanValues.type);
    setPrice(cleanValues.price);
    setDiscount(cleanValues.discount);
    setIsLive(cleanValues.isLive);
    setImage(cleanValues.image);
    setShortDescription(cleanValues.shortDescription);
    setStudents(cleanValues.students ?? []);
    setCurrentStudentsValue(undefined);
    setCurrentStudentsDisplayValue("");
    setInstructors(cleanValues.instructors ?? []);
    setCurrentInstructorsValue(undefined);
    setCurrentInstructorsDisplayValue("");
    setUnits(cleanValues.Units ?? []);
    setCurrentUnitsValue(undefined);
    setCurrentUnitsDisplayValue("");
    setMeetings(cleanValues.Meetings ?? []);
    setCurrentMeetingsValue(undefined);
    setCurrentMeetingsDisplayValue("");
    setErrors({});
  };
  const [programRecord, setProgramRecord] = React.useState(programModelProp);
  const [linkedStudents, setLinkedStudents] = React.useState([]);
  const canUnlinkStudents = false;
  const [linkedInstructors, setLinkedInstructors] = React.useState([]);
  const canUnlinkInstructors = false;
  const [linkedUnits, setLinkedUnits] = React.useState([]);
  const canUnlinkUnits = false;
  const [linkedMeetings, setLinkedMeetings] = React.useState([]);
  const canUnlinkMeetings = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getProgram.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getProgram
        : programModelProp;
      const linkedStudents = record
        ? (
            await client.graphql({
              query: studentProgramsByProgramId.replaceAll("__typename", ""),
              variables: {
                programId: record.id,
              },
            })
          ).data.studentProgramsByProgramId.items.map((t) => t.student)
        : [];
      setLinkedStudents(linkedStudents);
      const linkedInstructors = record
        ? (
            await client.graphql({
              query: instructorProgramsByProgramId.replaceAll("__typename", ""),
              variables: {
                programId: record.id,
              },
            })
          ).data.instructorProgramsByProgramId.items.map((t) => t.instructor)
        : [];
      setLinkedInstructors(linkedInstructors);
      const linkedUnits = record?.Units?.items ?? [];
      setLinkedUnits(linkedUnits);
      const linkedMeetings = record?.Meetings?.items ?? [];
      setLinkedMeetings(linkedMeetings);
      setProgramRecord(record);
    };
    queryData();
  }, [idProp, programModelProp]);
  React.useEffect(resetStateValues, [
    programRecord,
    linkedStudents,
    linkedInstructors,
    linkedUnits,
    linkedMeetings,
  ]);
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
          discount: discount ?? null,
          isLive: isLive ?? null,
          image: image ?? null,
          shortDescription: shortDescription ?? null,
          students: students ?? null,
          instructors: instructors ?? null,
          Units: Units ?? null,
          Meetings: Meetings ?? null,
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
          const studentsToLinkMap = new Map();
          const studentsToUnLinkMap = new Map();
          const studentsMap = new Map();
          const linkedStudentsMap = new Map();
          students.forEach((r) => {
            const count = studentsMap.get(getIDValue.students?.(r));
            const newCount = count ? count + 1 : 1;
            studentsMap.set(getIDValue.students?.(r), newCount);
          });
          linkedStudents.forEach((r) => {
            const count = linkedStudentsMap.get(getIDValue.students?.(r));
            const newCount = count ? count + 1 : 1;
            linkedStudentsMap.set(getIDValue.students?.(r), newCount);
          });
          linkedStudentsMap.forEach((count, id) => {
            const newCount = studentsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                studentsToUnLinkMap.set(id, diffCount);
              }
            } else {
              studentsToUnLinkMap.set(id, count);
            }
          });
          studentsMap.forEach((count, id) => {
            const originalCount = linkedStudentsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                studentsToLinkMap.set(id, diffCount);
              }
            } else {
              studentsToLinkMap.set(id, count);
            }
          });
          studentsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const studentProgramRecords = (
              await client.graphql({
                query: listStudentPrograms.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { studentId: { eq: recordKeys.id } },
                      { programId: { eq: programRecord.id } },
                    ],
                  },
                },
              })
            )?.data?.listStudentPrograms?.items;
            for (let i = 0; i < count; i++) {
              promises.push(
                client.graphql({
                  query: deleteStudentProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: studentProgramRecords[i].id,
                    },
                  },
                })
              );
            }
          });
          studentsToLinkMap.forEach((count, id) => {
            const studentToLink = studentsRecords.find((r) =>
              Object.entries(JSON.parse(id)).every(
                ([key, value]) => r[key] === value
              )
            );
            for (let i = count; i > 0; i--) {
              promises.push(
                client.graphql({
                  query: createStudentProgram.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      programId: programRecord.id,
                      studentId: studentToLink.id,
                    },
                  },
                })
              );
            }
          });
          const instructorsToLinkMap = new Map();
          const instructorsToUnLinkMap = new Map();
          const instructorsMap = new Map();
          const linkedInstructorsMap = new Map();
          instructors.forEach((r) => {
            const count = instructorsMap.get(getIDValue.instructors?.(r));
            const newCount = count ? count + 1 : 1;
            instructorsMap.set(getIDValue.instructors?.(r), newCount);
          });
          linkedInstructors.forEach((r) => {
            const count = linkedInstructorsMap.get(getIDValue.instructors?.(r));
            const newCount = count ? count + 1 : 1;
            linkedInstructorsMap.set(getIDValue.instructors?.(r), newCount);
          });
          linkedInstructorsMap.forEach((count, id) => {
            const newCount = instructorsMap.get(id);
            if (newCount) {
              const diffCount = count - newCount;
              if (diffCount > 0) {
                instructorsToUnLinkMap.set(id, diffCount);
              }
            } else {
              instructorsToUnLinkMap.set(id, count);
            }
          });
          instructorsMap.forEach((count, id) => {
            const originalCount = linkedInstructorsMap.get(id);
            if (originalCount) {
              const diffCount = count - originalCount;
              if (diffCount > 0) {
                instructorsToLinkMap.set(id, diffCount);
              }
            } else {
              instructorsToLinkMap.set(id, count);
            }
          });
          instructorsToUnLinkMap.forEach(async (count, id) => {
            const recordKeys = JSON.parse(id);
            const instructorProgramRecords = (
              await client.graphql({
                query: listInstructorPrograms.replaceAll("__typename", ""),
                variables: {
                  filter: {
                    and: [
                      { instructorUserId: { eq: recordKeys.userId } },
                      { programId: { eq: programRecord.id } },
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
          instructorsToLinkMap.forEach((count, id) => {
            const instructorToLink = instructorsRecords.find((r) =>
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
                      programId: programRecord.id,
                      instructorUserId: instructorToLink.userId,
                    },
                  },
                })
              );
            }
          });
          const unitsToLink = [];
          const unitsToUnLink = [];
          const unitsSet = new Set();
          const linkedUnitsSet = new Set();
          Units.forEach((r) => unitsSet.add(getIDValue.Units?.(r)));
          linkedUnits.forEach((r) => linkedUnitsSet.add(getIDValue.Units?.(r)));
          linkedUnits.forEach((r) => {
            if (!unitsSet.has(getIDValue.Units?.(r))) {
              unitsToUnLink.push(r);
            }
          });
          Units.forEach((r) => {
            if (!linkedUnitsSet.has(getIDValue.Units?.(r))) {
              unitsToLink.push(r);
            }
          });
          unitsToUnLink.forEach((original) => {
            if (!canUnlinkUnits) {
              throw Error(
                `Unit ${original.id} cannot be unlinked from Program because programID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateUnit.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    programID: null,
                  },
                },
              })
            );
          });
          unitsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateUnit.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    programID: programRecord.id,
                  },
                },
              })
            );
          });
          const meetingsToLink = [];
          const meetingsToUnLink = [];
          const meetingsSet = new Set();
          const linkedMeetingsSet = new Set();
          Meetings.forEach((r) => meetingsSet.add(getIDValue.Meetings?.(r)));
          linkedMeetings.forEach((r) =>
            linkedMeetingsSet.add(getIDValue.Meetings?.(r))
          );
          linkedMeetings.forEach((r) => {
            if (!meetingsSet.has(getIDValue.Meetings?.(r))) {
              meetingsToUnLink.push(r);
            }
          });
          Meetings.forEach((r) => {
            if (!linkedMeetingsSet.has(getIDValue.Meetings?.(r))) {
              meetingsToLink.push(r);
            }
          });
          meetingsToUnLink.forEach((original) => {
            if (!canUnlinkMeetings) {
              throw Error(
                `Meeting ${original.id} cannot be unlinked from Program because programID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateMeeting.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    programID: null,
                  },
                },
              })
            );
          });
          meetingsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateMeeting.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    programID: programRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            name: modelFields.name,
            type: modelFields.type,
            price: modelFields.price,
            discount: modelFields.discount ?? null,
            isLive: modelFields.isLive ?? null,
            image: modelFields.image ?? null,
            shortDescription: modelFields.shortDescription ?? null,
          };
          promises.push(
            client.graphql({
              query: updateProgram.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: programRecord.id,
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
      {...getOverrideProps(overrides, "ProgramUpdateForm")}
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || programModelProp)}
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
              !(idProp || programModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
