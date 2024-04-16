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
import { listAttendees, listMessages, listPrograms } from "../graphql/queries";
import {
  createMeeting,
  updateAttendee,
  updateMessage,
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
export default function MeetingCreateForm(props) {
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
    title: "",
    date: "",
    time: "",
    description: "",
    programID: undefined,
    channelArn: "",
    endpointMessaging: "",
    mediaCaptureData: "",
    Attendees: [],
    Messages: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [date, setDate] = React.useState(initialValues.date);
  const [time, setTime] = React.useState(initialValues.time);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [programID, setProgramID] = React.useState(initialValues.programID);
  const [programIDLoading, setProgramIDLoading] = React.useState(false);
  const [programIDRecords, setProgramIDRecords] = React.useState([]);
  const [selectedProgramIDRecords, setSelectedProgramIDRecords] =
    React.useState([]);
  const [channelArn, setChannelArn] = React.useState(initialValues.channelArn);
  const [endpointMessaging, setEndpointMessaging] = React.useState(
    initialValues.endpointMessaging
  );
  const [mediaCaptureData, setMediaCaptureData] = React.useState(
    initialValues.mediaCaptureData
  );
  const [Attendees, setAttendees] = React.useState(initialValues.Attendees);
  const [AttendeesLoading, setAttendeesLoading] = React.useState(false);
  const [attendeesRecords, setAttendeesRecords] = React.useState([]);
  const [Messages, setMessages] = React.useState(initialValues.Messages);
  const [MessagesLoading, setMessagesLoading] = React.useState(false);
  const [messagesRecords, setMessagesRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDate(initialValues.date);
    setTime(initialValues.time);
    setDescription(initialValues.description);
    setProgramID(initialValues.programID);
    setCurrentProgramIDValue(undefined);
    setCurrentProgramIDDisplayValue("");
    setChannelArn(initialValues.channelArn);
    setEndpointMessaging(initialValues.endpointMessaging);
    setMediaCaptureData(initialValues.mediaCaptureData);
    setAttendees(initialValues.Attendees);
    setCurrentAttendeesValue(undefined);
    setCurrentAttendeesDisplayValue("");
    setMessages(initialValues.Messages);
    setCurrentMessagesValue(undefined);
    setCurrentMessagesDisplayValue("");
    setErrors({});
  };
  const [currentProgramIDDisplayValue, setCurrentProgramIDDisplayValue] =
    React.useState("");
  const [currentProgramIDValue, setCurrentProgramIDValue] =
    React.useState(undefined);
  const programIDRef = React.createRef();
  const [currentAttendeesDisplayValue, setCurrentAttendeesDisplayValue] =
    React.useState("");
  const [currentAttendeesValue, setCurrentAttendeesValue] =
    React.useState(undefined);
  const AttendeesRef = React.createRef();
  const [currentMessagesDisplayValue, setCurrentMessagesDisplayValue] =
    React.useState("");
  const [currentMessagesValue, setCurrentMessagesValue] =
    React.useState(undefined);
  const MessagesRef = React.createRef();
  const getIDValue = {
    Attendees: (r) => JSON.stringify({ attendeeId: r?.attendeeId }),
    Messages: (r) => JSON.stringify({ id: r?.id }),
  };
  const AttendeesIdSet = new Set(
    Array.isArray(Attendees)
      ? Attendees.map((r) => getIDValue.Attendees?.(r))
      : getIDValue.Attendees?.(Attendees)
  );
  const MessagesIdSet = new Set(
    Array.isArray(Messages)
      ? Messages.map((r) => getIDValue.Messages?.(r))
      : getIDValue.Messages?.(Messages)
  );
  const getDisplayValue = {
    programID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Attendees: (r) => `${r?.name ? r?.name + " - " : ""}${r?.attendeeId}`,
    Messages: (r) => `${r?.content ? r?.content + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [{ type: "Required" }],
    date: [],
    time: [],
    description: [],
    programID: [],
    channelArn: [],
    endpointMessaging: [],
    mediaCaptureData: [],
    Attendees: [],
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
  const fetchProgramIDRecords = async (value) => {
    setProgramIDLoading(true);
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
      var loaded = result.filter((item) => programID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setProgramIDRecords(newOptions.slice(0, autocompleteLength));
    setProgramIDLoading(false);
  };
  const fetchAttendeesRecords = async (value) => {
    setAttendeesLoading(true);
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
      var loaded = result.filter(
        (item) => !AttendeesIdSet.has(getIDValue.Attendees?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setAttendeesRecords(newOptions.slice(0, autocompleteLength));
    setAttendeesLoading(false);
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
    fetchProgramIDRecords("");
    fetchAttendeesRecords("");
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
          title,
          date,
          time,
          description,
          programID,
          channelArn,
          endpointMessaging,
          mediaCaptureData,
          Attendees,
          Messages,
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
            title: modelFields.title,
            date: modelFields.date,
            time: modelFields.time,
            description: modelFields.description,
            programID: modelFields.programID,
            channelArn: modelFields.channelArn,
            endpointMessaging: modelFields.endpointMessaging,
            mediaCaptureData: modelFields.mediaCaptureData,
          };
          const meeting = (
            await client.graphql({
              query: createMeeting.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createMeeting;
          const promises = [];
          promises.push(
            ...Attendees.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateAttendee.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      attendeeId: original.attendeeId,
                      meetingID: meeting.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          promises.push(
            ...Messages.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateMessage.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                      meetingID: meeting.id,
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
      {...getOverrideProps(overrides, "MeetingCreateForm")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Título</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              date,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Fecha"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date: value,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Hora"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={time}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time: value,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(value);
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Descripción"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description: value,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
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
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID: value,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.programID ?? value;
          }
          setProgramID(value);
          setCurrentProgramIDValue(undefined);
        }}
        currentFieldValue={currentProgramIDValue}
        label={"Vincular al curso"}
        items={programID ? [programID] : []}
        hasError={errors?.programID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("programID", currentProgramIDValue)
        }
        errorMessage={errors?.programID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.programID(
                programIDRecords.find((r) => r.id === value) ??
                  selectedProgramIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentProgramIDDisplayValue(
            value
              ? getDisplayValue.programID(
                  programIDRecords.find((r) => r.id === value) ??
                    selectedProgramIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentProgramIDValue(value);
          const selectedRecord = programIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedProgramIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={programIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Vincular al curso"
          isRequired={false}
          isReadOnly={false}
          placeholder="Buscar curso"
          value={currentProgramIDDisplayValue}
          options={programIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.programID?.(r),
            }))}
          isLoading={programIDLoading}
          onSelect={({ id, label }) => {
            setCurrentProgramIDValue(id);
            setCurrentProgramIDDisplayValue(label);
            runValidationTasks("programID", label);
          }}
          onClear={() => {
            setCurrentProgramIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchProgramIDRecords(value);
            if (errors.programID?.hasError) {
              runValidationTasks("programID", value);
            }
            setCurrentProgramIDDisplayValue(value);
            setCurrentProgramIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("programID", currentProgramIDValue)}
          errorMessage={errors.programID?.errorMessage}
          hasError={errors.programID?.hasError}
          ref={programIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "programID")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Channel arn"
        isRequired={false}
        isReadOnly={false}
        value={channelArn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID,
              channelArn: value,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.channelArn ?? value;
          }
          if (errors.channelArn?.hasError) {
            runValidationTasks("channelArn", value);
          }
          setChannelArn(value);
        }}
        onBlur={() => runValidationTasks("channelArn", channelArn)}
        errorMessage={errors.channelArn?.errorMessage}
        hasError={errors.channelArn?.hasError}
        {...getOverrideProps(overrides, "channelArn")}
      ></TextField>
      <TextField
        label="Endpoint messaging"
        isRequired={false}
        isReadOnly={false}
        value={endpointMessaging}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging: value,
              mediaCaptureData,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.endpointMessaging ?? value;
          }
          if (errors.endpointMessaging?.hasError) {
            runValidationTasks("endpointMessaging", value);
          }
          setEndpointMessaging(value);
        }}
        onBlur={() =>
          runValidationTasks("endpointMessaging", endpointMessaging)
        }
        errorMessage={errors.endpointMessaging?.errorMessage}
        hasError={errors.endpointMessaging?.hasError}
        {...getOverrideProps(overrides, "endpointMessaging")}
      ></TextField>
      <TextField
        label="Media capture data"
        isRequired={false}
        isReadOnly={false}
        value={mediaCaptureData}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData: value,
              Attendees,
              Messages,
            };
            const result = onChange(modelFields);
            value = result?.mediaCaptureData ?? value;
          }
          if (errors.mediaCaptureData?.hasError) {
            runValidationTasks("mediaCaptureData", value);
          }
          setMediaCaptureData(value);
        }}
        onBlur={() => runValidationTasks("mediaCaptureData", mediaCaptureData)}
        errorMessage={errors.mediaCaptureData?.errorMessage}
        hasError={errors.mediaCaptureData?.hasError}
        {...getOverrideProps(overrides, "mediaCaptureData")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees: values,
              Messages,
            };
            const result = onChange(modelFields);
            values = result?.Attendees ?? values;
          }
          setAttendees(values);
          setCurrentAttendeesValue(undefined);
          setCurrentAttendeesDisplayValue("");
        }}
        currentFieldValue={currentAttendeesValue}
        label={"Attendees"}
        items={Attendees}
        hasError={errors?.Attendees?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Attendees", currentAttendeesValue)
        }
        errorMessage={errors?.Attendees?.errorMessage}
        getBadgeText={getDisplayValue.Attendees}
        setFieldValue={(model) => {
          setCurrentAttendeesDisplayValue(
            model ? getDisplayValue.Attendees(model) : ""
          );
          setCurrentAttendeesValue(model);
        }}
        inputFieldRef={AttendeesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Attendees"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Attendee"
          value={currentAttendeesDisplayValue}
          options={attendeesRecords
            .filter((r) => !AttendeesIdSet.has(getIDValue.Attendees?.(r)))
            .map((r) => ({
              id: getIDValue.Attendees?.(r),
              label: getDisplayValue.Attendees?.(r),
            }))}
          isLoading={AttendeesLoading}
          onSelect={({ id, label }) => {
            setCurrentAttendeesValue(
              attendeesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentAttendeesDisplayValue(label);
            runValidationTasks("Attendees", label);
          }}
          onClear={() => {
            setCurrentAttendeesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchAttendeesRecords(value);
            if (errors.Attendees?.hasError) {
              runValidationTasks("Attendees", value);
            }
            setCurrentAttendeesDisplayValue(value);
            setCurrentAttendeesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("Attendees", currentAttendeesDisplayValue)
          }
          errorMessage={errors.Attendees?.errorMessage}
          hasError={errors.Attendees?.hasError}
          ref={AttendeesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Attendees")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              date,
              time,
              description,
              programID,
              channelArn,
              endpointMessaging,
              mediaCaptureData,
              Attendees,
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
