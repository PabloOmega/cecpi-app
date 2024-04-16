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
  getAttendee,
  getMeeting,
  listMeetings,
  listMessages,
  listStudents,
} from "../graphql/queries";
import { updateAttendee, updateMessage } from "../graphql/mutations";
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
export default function AttendeeUpdateForm(props) {
  const {
    attendeeId: attendeeIdProp,
    attendee: attendeeModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    attendeeId: "",
    name: "",
    data: "",
    raisedHand: false,
    userArn: "",
    meetingID: undefined,
    Student: undefined,
    Messages: [],
  };
  const [attendeeId, setAttendeeId] = React.useState(initialValues.attendeeId);
  const [name, setName] = React.useState(initialValues.name);
  const [data, setData] = React.useState(initialValues.data);
  const [raisedHand, setRaisedHand] = React.useState(initialValues.raisedHand);
  const [userArn, setUserArn] = React.useState(initialValues.userArn);
  const [meetingID, setMeetingID] = React.useState(initialValues.meetingID);
  const [meetingIDLoading, setMeetingIDLoading] = React.useState(false);
  const [meetingIDRecords, setMeetingIDRecords] = React.useState([]);
  const [selectedMeetingIDRecords, setSelectedMeetingIDRecords] =
    React.useState([]);
  const [Student, setStudent] = React.useState(initialValues.Student);
  const [StudentLoading, setStudentLoading] = React.useState(false);
  const [studentRecords, setStudentRecords] = React.useState([]);
  const [Messages, setMessages] = React.useState(initialValues.Messages);
  const [MessagesLoading, setMessagesLoading] = React.useState(false);
  const [messagesRecords, setMessagesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = attendeeRecord
      ? {
          ...initialValues,
          ...attendeeRecord,
          meetingID,
          Student,
          Messages: linkedMessages,
        }
      : initialValues;
    setAttendeeId(cleanValues.attendeeId);
    setName(cleanValues.name);
    setData(cleanValues.data);
    setRaisedHand(cleanValues.raisedHand);
    setUserArn(cleanValues.userArn);
    setMeetingID(cleanValues.meetingID);
    setCurrentMeetingIDValue(undefined);
    setCurrentMeetingIDDisplayValue("");
    setStudent(cleanValues.Student);
    setCurrentStudentValue(undefined);
    setCurrentStudentDisplayValue("");
    setMessages(cleanValues.Messages ?? []);
    setCurrentMessagesValue(undefined);
    setCurrentMessagesDisplayValue("");
    setErrors({});
  };
  const [attendeeRecord, setAttendeeRecord] = React.useState(attendeeModelProp);
  const [linkedMessages, setLinkedMessages] = React.useState([]);
  const canUnlinkMessages = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = attendeeIdProp
        ? (
            await client.graphql({
              query: getAttendee.replaceAll("__typename", ""),
              variables: { attendeeId: attendeeIdProp },
            })
          )?.data?.getAttendee
        : attendeeModelProp;
      const meetingIDRecord = record ? record.meetingID : undefined;
      const meetingRecord = meetingIDRecord
        ? (
            await client.graphql({
              query: getMeeting.replaceAll("__typename", ""),
              variables: { id: meetingIDRecord },
            })
          )?.data?.getMeeting
        : undefined;
      setMeetingID(meetingIDRecord);
      setSelectedMeetingIDRecords([meetingRecord]);
      const StudentRecord = record ? await record.Student : undefined;
      setStudent(StudentRecord);
      const linkedMessages = record?.Messages?.items ?? [];
      setLinkedMessages(linkedMessages);
      setAttendeeRecord(record);
    };
    queryData();
  }, [attendeeIdProp, attendeeModelProp]);
  React.useEffect(resetStateValues, [
    attendeeRecord,
    meetingID,
    Student,
    linkedMessages,
  ]);
  const [currentMeetingIDDisplayValue, setCurrentMeetingIDDisplayValue] =
    React.useState("");
  const [currentMeetingIDValue, setCurrentMeetingIDValue] =
    React.useState(undefined);
  const meetingIDRef = React.createRef();
  const [currentStudentDisplayValue, setCurrentStudentDisplayValue] =
    React.useState("");
  const [currentStudentValue, setCurrentStudentValue] =
    React.useState(undefined);
  const StudentRef = React.createRef();
  const [currentMessagesDisplayValue, setCurrentMessagesDisplayValue] =
    React.useState("");
  const [currentMessagesValue, setCurrentMessagesValue] =
    React.useState(undefined);
  const MessagesRef = React.createRef();
  const getIDValue = {
    Student: (r) => JSON.stringify({ id: r?.id }),
    Messages: (r) => JSON.stringify({ id: r?.id }),
  };
  const StudentIdSet = new Set(
    Array.isArray(Student)
      ? Student.map((r) => getIDValue.Student?.(r))
      : getIDValue.Student?.(Student)
  );
  const MessagesIdSet = new Set(
    Array.isArray(Messages)
      ? Messages.map((r) => getIDValue.Messages?.(r))
      : getIDValue.Messages?.(Messages)
  );
  const getDisplayValue = {
    meetingID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    Student: (r) => `${r?.email ? r?.email + " - " : ""}${r?.id}`,
    Messages: (r) => `${r?.content ? r?.content + " - " : ""}${r?.id}`,
  };
  const validations = {
    attendeeId: [{ type: "Required" }],
    name: [],
    data: [],
    raisedHand: [],
    userArn: [],
    meetingID: [],
    Student: [],
    Messages: [],
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
  const fetchMeetingIDRecords = async (value) => {
    setMeetingIDLoading(true);
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
      var loaded = result.filter((item) => meetingID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMeetingIDRecords(newOptions.slice(0, autocompleteLength));
    setMeetingIDLoading(false);
  };
  const fetchStudentRecords = async (value) => {
    setStudentLoading(true);
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
        (item) => !StudentIdSet.has(getIDValue.Student?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setStudentRecords(newOptions.slice(0, autocompleteLength));
    setStudentLoading(false);
  };
  const fetchMessagesRecords = async (value) => {
    setMessagesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ content: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listMessages.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listMessages?.items;
      var loaded = result.filter(
        (item) => !MessagesIdSet.has(getIDValue.Messages?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setMessagesRecords(newOptions.slice(0, autocompleteLength));
    setMessagesLoading(false);
  };
  React.useEffect(() => {
    fetchMeetingIDRecords("");
    fetchStudentRecords("");
    fetchMessagesRecords("");
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
          attendeeId,
          name: name ?? null,
          data: data ?? null,
          raisedHand: raisedHand ?? null,
          userArn: userArn ?? null,
          meetingID: meetingID ?? null,
          Student: Student ?? null,
          Messages: Messages ?? null,
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
          const messagesToLink = [];
          const messagesToUnLink = [];
          const messagesSet = new Set();
          const linkedMessagesSet = new Set();
          Messages.forEach((r) => messagesSet.add(getIDValue.Messages?.(r)));
          linkedMessages.forEach((r) =>
            linkedMessagesSet.add(getIDValue.Messages?.(r))
          );
          linkedMessages.forEach((r) => {
            if (!messagesSet.has(getIDValue.Messages?.(r))) {
              messagesToUnLink.push(r);
            }
          });
          Messages.forEach((r) => {
            if (!linkedMessagesSet.has(getIDValue.Messages?.(r))) {
              messagesToLink.push(r);
            }
          });
          messagesToUnLink.forEach((original) => {
            if (!canUnlinkMessages) {
              throw Error(
                `Message ${original.id} cannot be unlinked from Attendee because attendeeID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateMessage.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    attendeeID: null,
                  },
                },
              })
            );
          });
          messagesToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateMessage.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    attendeeID: attendeeRecord.attendeeId,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            attendeeId: modelFields.attendeeId,
            name: modelFields.name ?? null,
            data: modelFields.data ?? null,
            raisedHand: modelFields.raisedHand ?? null,
            userArn: modelFields.userArn ?? null,
            meetingID: modelFields.meetingID ?? null,
            attendeeStudentId: modelFields?.Student?.id ?? null,
          };
          promises.push(
            client.graphql({
              query: updateAttendee.replaceAll("__typename", ""),
              variables: {
                input: {
                  attendeeId: attendeeRecord.attendeeId,
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
      {...getOverrideProps(overrides, "AttendeeUpdateForm")}
      {...rest}
    >
      <TextField
        label="Attendee id"
        isRequired={true}
        isReadOnly={true}
        value={attendeeId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              attendeeId: value,
              name,
              data,
              raisedHand,
              userArn,
              meetingID,
              Student,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.attendeeId ?? value;
          }
          if (errors.attendeeId?.hasError) {
            runValidationTasks("attendeeId", value);
          }
          setAttendeeId(value);
        }}
        onBlur={() => runValidationTasks("attendeeId", attendeeId)}
        errorMessage={errors.attendeeId?.errorMessage}
        hasError={errors.attendeeId?.hasError}
        {...getOverrideProps(overrides, "attendeeId")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              attendeeId,
              name: value,
              data,
              raisedHand,
              userArn,
              meetingID,
              Student,
              Messages,
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
        label="Data"
        isRequired={false}
        isReadOnly={false}
        value={data}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data: value,
              raisedHand,
              userArn,
              meetingID,
              Student,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.data ?? value;
          }
          if (errors.data?.hasError) {
            runValidationTasks("data", value);
          }
          setData(value);
        }}
        onBlur={() => runValidationTasks("data", data)}
        errorMessage={errors.data?.errorMessage}
        hasError={errors.data?.hasError}
        {...getOverrideProps(overrides, "data")}
      ></TextField>
      <SwitchField
        label="Raised hand"
        defaultChecked={false}
        isDisabled={false}
        isChecked={raisedHand}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data,
              raisedHand: value,
              userArn,
              meetingID,
              Student,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.raisedHand ?? value;
          }
          if (errors.raisedHand?.hasError) {
            runValidationTasks("raisedHand", value);
          }
          setRaisedHand(value);
        }}
        onBlur={() => runValidationTasks("raisedHand", raisedHand)}
        errorMessage={errors.raisedHand?.errorMessage}
        hasError={errors.raisedHand?.hasError}
        {...getOverrideProps(overrides, "raisedHand")}
      ></SwitchField>
      <TextField
        label="User arn"
        isRequired={false}
        isReadOnly={false}
        value={userArn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data,
              raisedHand,
              userArn: value,
              meetingID,
              Student,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.userArn ?? value;
          }
          if (errors.userArn?.hasError) {
            runValidationTasks("userArn", value);
          }
          setUserArn(value);
        }}
        onBlur={() => runValidationTasks("userArn", userArn)}
        errorMessage={errors.userArn?.errorMessage}
        hasError={errors.userArn?.hasError}
        {...getOverrideProps(overrides, "userArn")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data,
              raisedHand,
              userArn,
              meetingID: value,
              Student,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.meetingID ?? value;
          }
          setMeetingID(value);
          setCurrentMeetingIDValue(undefined);
        }}
        currentFieldValue={currentMeetingIDValue}
        label={"Meeting id"}
        items={meetingID ? [meetingID] : []}
        hasError={errors?.meetingID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("meetingID", currentMeetingIDValue)
        }
        errorMessage={errors?.meetingID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.meetingID(
                meetingIDRecords.find((r) => r.id === value) ??
                  selectedMeetingIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentMeetingIDDisplayValue(
            value
              ? getDisplayValue.meetingID(
                  meetingIDRecords.find((r) => r.id === value) ??
                    selectedMeetingIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentMeetingIDValue(value);
          const selectedRecord = meetingIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedMeetingIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={meetingIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Meeting id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Meeting"
          value={currentMeetingIDDisplayValue}
          options={meetingIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.meetingID?.(r),
            }))}
          isLoading={meetingIDLoading}
          onSelect={({ id, label }) => {
            setCurrentMeetingIDValue(id);
            setCurrentMeetingIDDisplayValue(label);
            runValidationTasks("meetingID", label);
          }}
          onClear={() => {
            setCurrentMeetingIDDisplayValue("");
          }}
          defaultValue={meetingID}
          onChange={(e) => {
            let { value } = e.target;
            fetchMeetingIDRecords(value);
            if (errors.meetingID?.hasError) {
              runValidationTasks("meetingID", value);
            }
            setCurrentMeetingIDDisplayValue(value);
            setCurrentMeetingIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("meetingID", currentMeetingIDValue)}
          errorMessage={errors.meetingID?.errorMessage}
          hasError={errors.meetingID?.hasError}
          ref={meetingIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "meetingID")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data,
              raisedHand,
              userArn,
              meetingID,
              Student: value,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.Student ?? value;
          }
          setStudent(value);
          setCurrentStudentValue(undefined);
          setCurrentStudentDisplayValue("");
        }}
        currentFieldValue={currentStudentValue}
        label={"Student"}
        items={Student ? [Student] : []}
        hasError={errors?.Student?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Student", currentStudentValue)
        }
        errorMessage={errors?.Student?.errorMessage}
        getBadgeText={getDisplayValue.Student}
        setFieldValue={(model) => {
          setCurrentStudentDisplayValue(
            model ? getDisplayValue.Student(model) : ""
          );
          setCurrentStudentValue(model);
        }}
        inputFieldRef={StudentRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Student"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Student"
          value={currentStudentDisplayValue}
          options={studentRecords
            .filter((r) => !StudentIdSet.has(getIDValue.Student?.(r)))
            .map((r) => ({
              id: getIDValue.Student?.(r),
              label: getDisplayValue.Student?.(r),
            }))}
          isLoading={StudentLoading}
          onSelect={({ id, label }) => {
            setCurrentStudentValue(
              studentRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentStudentDisplayValue(label);
            runValidationTasks("Student", label);
          }}
          onClear={() => {
            setCurrentStudentDisplayValue("");
          }}
          defaultValue={Student}
          onChange={(e) => {
            let { value } = e.target;
            fetchStudentRecords(value);
            if (errors.Student?.hasError) {
              runValidationTasks("Student", value);
            }
            setCurrentStudentDisplayValue(value);
            setCurrentStudentValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Student", currentStudentDisplayValue)
          }
          errorMessage={errors.Student?.errorMessage}
          hasError={errors.Student?.hasError}
          ref={StudentRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Student")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              attendeeId,
              name,
              data,
              raisedHand,
              userArn,
              meetingID,
              Student,
              Messages: values,
            };
            const result = onChange(modelFields);
            values = result?.Messages ?? values;
          }
          setMessages(values);
          setCurrentMessagesValue(undefined);
          setCurrentMessagesDisplayValue("");
        }}
        currentFieldValue={currentMessagesValue}
        label={"Messages"}
        items={Messages}
        hasError={errors?.Messages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Messages", currentMessagesValue)
        }
        errorMessage={errors?.Messages?.errorMessage}
        getBadgeText={getDisplayValue.Messages}
        setFieldValue={(model) => {
          setCurrentMessagesDisplayValue(
            model ? getDisplayValue.Messages(model) : ""
          );
          setCurrentMessagesValue(model);
        }}
        inputFieldRef={MessagesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Messages"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Message"
          value={currentMessagesDisplayValue}
          options={messagesRecords
            .filter((r) => !MessagesIdSet.has(getIDValue.Messages?.(r)))
            .map((r) => ({
              id: getIDValue.Messages?.(r),
              label: getDisplayValue.Messages?.(r),
            }))}
          isLoading={MessagesLoading}
          onSelect={({ id, label }) => {
            setCurrentMessagesValue(
              messagesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentMessagesDisplayValue(label);
            runValidationTasks("Messages", label);
          }}
          onClear={() => {
            setCurrentMessagesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchMessagesRecords(value);
            if (errors.Messages?.hasError) {
              runValidationTasks("Messages", value);
            }
            setCurrentMessagesDisplayValue(value);
            setCurrentMessagesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Messages", currentMessagesDisplayValue)
          }
          errorMessage={errors.Messages?.errorMessage}
          hasError={errors.Messages?.hasError}
          ref={MessagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Messages")}
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
          isDisabled={!(attendeeIdProp || attendeeModelProp)}
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
              !(attendeeIdProp || attendeeModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
