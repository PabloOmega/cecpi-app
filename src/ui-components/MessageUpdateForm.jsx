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
import {
  getAttendee,
  getMeeting,
  getMessage,
  listAttendees,
  listMeetings,
} from "../graphql/queries";
import { updateMessage } from "../graphql/mutations";
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
export default function MessageUpdateForm(props) {
  const {
    id: idProp,
    message: messageModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    content: "",
    senderName: "",
    type: "",
    receiverID: "",
    meetingID: undefined,
    attendeeID: undefined,
  };
  const [content, setContent] = React.useState(initialValues.content);
  const [senderName, setSenderName] = React.useState(initialValues.senderName);
  const [type, setType] = React.useState(initialValues.type);
  const [receiverID, setReceiverID] = React.useState(initialValues.receiverID);
  const [meetingID, setMeetingID] = React.useState(initialValues.meetingID);
  const [meetingIDLoading, setMeetingIDLoading] = React.useState(false);
  const [meetingIDRecords, setMeetingIDRecords] = React.useState([]);
  const [selectedMeetingIDRecords, setSelectedMeetingIDRecords] =
    React.useState([]);
  const [attendeeID, setAttendeeID] = React.useState(initialValues.attendeeID);
  const [attendeeIDLoading, setAttendeeIDLoading] = React.useState(false);
  const [attendeeIDRecords, setAttendeeIDRecords] = React.useState([]);
  const [selectedAttendeeIDRecords, setSelectedAttendeeIDRecords] =
    React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = messageRecord
      ? { ...initialValues, ...messageRecord, meetingID, attendeeID }
      : initialValues;
    setContent(cleanValues.content);
    setSenderName(cleanValues.senderName);
    setType(cleanValues.type);
    setReceiverID(cleanValues.receiverID);
    setMeetingID(cleanValues.meetingID);
    setCurrentMeetingIDValue(undefined);
    setCurrentMeetingIDDisplayValue("");
    setAttendeeID(cleanValues.attendeeID);
    setCurrentAttendeeIDValue(undefined);
    setCurrentAttendeeIDDisplayValue("");
    setErrors({});
  };
  const [messageRecord, setMessageRecord] = React.useState(messageModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getMessage.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getMessage
        : messageModelProp;
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
      const attendeeIDRecord = record ? record.attendeeID : undefined;
      const attendeeRecord = attendeeIDRecord
        ? (
            await client.graphql({
              query: getAttendee.replaceAll("__typename", ""),
              variables: { id: attendeeIDRecord },
            })
          )?.data?.getAttendee
        : undefined;
      setAttendeeID(attendeeIDRecord);
      setSelectedAttendeeIDRecords([attendeeRecord]);
      setMessageRecord(record);
    };
    queryData();
  }, [idProp, messageModelProp]);
  React.useEffect(resetStateValues, [messageRecord, meetingID, attendeeID]);
  const [currentMeetingIDDisplayValue, setCurrentMeetingIDDisplayValue] =
    React.useState("");
  const [currentMeetingIDValue, setCurrentMeetingIDValue] =
    React.useState(undefined);
  const meetingIDRef = React.createRef();
  const [currentAttendeeIDDisplayValue, setCurrentAttendeeIDDisplayValue] =
    React.useState("");
  const [currentAttendeeIDValue, setCurrentAttendeeIDValue] =
    React.useState(undefined);
  const attendeeIDRef = React.createRef();
  const getDisplayValue = {
    meetingID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    attendeeID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.attendeeId}`,
  };
  const validations = {
    content: [],
    senderName: [],
    type: [],
    receiverID: [],
    meetingID: [],
    attendeeID: [],
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
  const fetchAttendeeIDRecords = async (value) => {
    setAttendeeIDLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { name: { contains: value } },
            { attendeeId: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listAttendees.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listAttendees?.items;
      var loaded = result.filter((item) => attendeeID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setAttendeeIDRecords(newOptions.slice(0, autocompleteLength));
    setAttendeeIDLoading(false);
  };
  React.useEffect(() => {
    fetchMeetingIDRecords("");
    fetchAttendeeIDRecords("");
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
          content: content ?? null,
          senderName: senderName ?? null,
          type: type ?? null,
          receiverID: receiverID ?? null,
          meetingID: meetingID ?? null,
          attendeeID: attendeeID ?? null,
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
            query: updateMessage.replaceAll("__typename", ""),
            variables: {
              input: {
                id: messageRecord.id,
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
      {...getOverrideProps(overrides, "MessageUpdateForm")}
      {...rest}
    >
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        value={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content: value,
              senderName,
              type,
              receiverID,
              meetingID,
              attendeeID,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <TextField
        label="Sender name"
        isRequired={false}
        isReadOnly={false}
        value={senderName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              senderName: value,
              type,
              receiverID,
              meetingID,
              attendeeID,
            };
            const result = onChange(modelFields);
            value = result?.senderName ?? value;
          }
          if (errors.senderName?.hasError) {
            runValidationTasks("senderName", value);
          }
          setSenderName(value);
        }}
        onBlur={() => runValidationTasks("senderName", senderName)}
        errorMessage={errors.senderName?.errorMessage}
        hasError={errors.senderName?.hasError}
        {...getOverrideProps(overrides, "senderName")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              senderName,
              type: value,
              receiverID,
              meetingID,
              attendeeID,
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
        label="Receiver id"
        isRequired={false}
        isReadOnly={false}
        value={receiverID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              content,
              senderName,
              type,
              receiverID: value,
              meetingID,
              attendeeID,
            };
            const result = onChange(modelFields);
            value = result?.receiverID ?? value;
          }
          if (errors.receiverID?.hasError) {
            runValidationTasks("receiverID", value);
          }
          setReceiverID(value);
        }}
        onBlur={() => runValidationTasks("receiverID", receiverID)}
        errorMessage={errors.receiverID?.errorMessage}
        hasError={errors.receiverID?.hasError}
        {...getOverrideProps(overrides, "receiverID")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              content,
              senderName,
              type,
              receiverID,
              meetingID: value,
              attendeeID,
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
              content,
              senderName,
              type,
              receiverID,
              meetingID,
              attendeeID: value,
            };
            const result = onChange(modelFields);
            value = result?.attendeeID ?? value;
          }
          setAttendeeID(value);
          setCurrentAttendeeIDValue(undefined);
        }}
        currentFieldValue={currentAttendeeIDValue}
        label={"Attendee id"}
        items={attendeeID ? [attendeeID] : []}
        hasError={errors?.attendeeID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("attendeeID", currentAttendeeIDValue)
        }
        errorMessage={errors?.attendeeID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.attendeeID(
                attendeeIDRecords.find((r) => r.attendeeId === value) ??
                  selectedAttendeeIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentAttendeeIDDisplayValue(
            value
              ? getDisplayValue.attendeeID(
                  attendeeIDRecords.find((r) => r.attendeeId === value) ??
                    selectedAttendeeIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentAttendeeIDValue(value);
          const selectedRecord = attendeeIDRecords.find(
            (r) => r.attendeeId === value
          );
          if (selectedRecord) {
            setSelectedAttendeeIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={attendeeIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Attendee id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Attendee"
          value={currentAttendeeIDDisplayValue}
          options={attendeeIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex(
                  (member) => member?.attendeeId === r?.attendeeId
                ) === i
            )
            .map((r) => ({
              id: r?.attendeeId,
              label: getDisplayValue.attendeeID?.(r),
            }))}
          isLoading={attendeeIDLoading}
          onSelect={({ id, label }) => {
            setCurrentAttendeeIDValue(id);
            setCurrentAttendeeIDDisplayValue(label);
            runValidationTasks("attendeeID", label);
          }}
          onClear={() => {
            setCurrentAttendeeIDDisplayValue("");
          }}
          defaultValue={attendeeID}
          onChange={(e) => {
            let { value } = e.target;
            fetchAttendeeIDRecords(value);
            if (errors.attendeeID?.hasError) {
              runValidationTasks("attendeeID", value);
            }
            setCurrentAttendeeIDDisplayValue(value);
            setCurrentAttendeeIDValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("attendeeID", currentAttendeeIDValue)
          }
          errorMessage={errors.attendeeID?.errorMessage}
          hasError={errors.attendeeID?.hasError}
          ref={attendeeIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "attendeeID")}
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
          isDisabled={!(idProp || messageModelProp)}
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
              !(idProp || messageModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
