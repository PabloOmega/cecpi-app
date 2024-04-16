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
import { listUnits, listVideos } from "../graphql/queries";
import { createStep } from "../graphql/mutations";
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
export default function StepCreateForm(props) {
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
    description: "",
    poster: "",
    order: "",
    Video: undefined,
    unitID: undefined,
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [poster, setPoster] = React.useState(initialValues.poster);
  const [order, setOrder] = React.useState(initialValues.order);
  const [Video, setVideo] = React.useState(initialValues.Video);
  const [VideoLoading, setVideoLoading] = React.useState(false);
  const [videoRecords, setVideoRecords] = React.useState([]);
  const [unitID, setUnitID] = React.useState(initialValues.unitID);
  const [unitIDLoading, setUnitIDLoading] = React.useState(false);
  const [unitIDRecords, setUnitIDRecords] = React.useState([]);
  const [selectedUnitIDRecords, setSelectedUnitIDRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setDescription(initialValues.description);
    setPoster(initialValues.poster);
    setOrder(initialValues.order);
    setVideo(initialValues.Video);
    setCurrentVideoValue(undefined);
    setCurrentVideoDisplayValue("");
    setUnitID(initialValues.unitID);
    setCurrentUnitIDValue(undefined);
    setCurrentUnitIDDisplayValue("");
    setErrors({});
  };
  const [currentVideoDisplayValue, setCurrentVideoDisplayValue] =
    React.useState("");
  const [currentVideoValue, setCurrentVideoValue] = React.useState(undefined);
  const VideoRef = React.createRef();
  const [currentUnitIDDisplayValue, setCurrentUnitIDDisplayValue] =
    React.useState("");
  const [currentUnitIDValue, setCurrentUnitIDValue] = React.useState(undefined);
  const unitIDRef = React.createRef();
  const getIDValue = {
    Video: (r) => JSON.stringify({ id: r?.id }),
  };
  const VideoIdSet = new Set(
    Array.isArray(Video)
      ? Video.map((r) => getIDValue.Video?.(r))
      : getIDValue.Video?.(Video)
  );
  const getDisplayValue = {
    Video: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
    unitID: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [{ type: "Required" }],
    description: [],
    poster: [],
    order: [],
    Video: [],
    unitID: [],
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
  const fetchVideoRecords = async (value) => {
    setVideoLoading(true);
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
          query: listVideos.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listVideos?.items;
      var loaded = result.filter(
        (item) => !VideoIdSet.has(getIDValue.Video?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setVideoRecords(newOptions.slice(0, autocompleteLength));
    setVideoLoading(false);
  };
  const fetchUnitIDRecords = async (value) => {
    setUnitIDLoading(true);
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
      var loaded = result.filter((item) => unitID !== item.id);
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUnitIDRecords(newOptions.slice(0, autocompleteLength));
    setUnitIDLoading(false);
  };
  React.useEffect(() => {
    fetchVideoRecords("");
    fetchUnitIDRecords("");
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
          description,
          poster,
          order,
          Video,
          unitID,
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
            description: modelFields.description,
            poster: modelFields.poster,
            order: modelFields.order,
            stepVideoId: modelFields?.Video?.id,
            unitID: modelFields.unitID,
          };
          await client.graphql({
            query: createStep.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "StepCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              description,
              poster,
              order,
              Video,
              unitID,
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
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description: value,
              poster,
              order,
              Video,
              unitID,
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
        label="Poster"
        isRequired={false}
        isReadOnly={false}
        value={poster}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              description,
              poster: value,
              order,
              Video,
              unitID,
            };
            const result = onChange(modelFields);
            value = result?.poster ?? value;
          }
          if (errors.poster?.hasError) {
            runValidationTasks("poster", value);
          }
          setPoster(value);
        }}
        onBlur={() => runValidationTasks("poster", poster)}
        errorMessage={errors.poster?.errorMessage}
        hasError={errors.poster?.hasError}
        {...getOverrideProps(overrides, "poster")}
      ></TextField>
      <TextField
        label="Order"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={order}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              title,
              description,
              poster,
              order: value,
              Video,
              unitID,
            };
            const result = onChange(modelFields);
            value = result?.order ?? value;
          }
          if (errors.order?.hasError) {
            runValidationTasks("order", value);
          }
          setOrder(value);
        }}
        onBlur={() => runValidationTasks("order", order)}
        errorMessage={errors.order?.errorMessage}
        hasError={errors.order?.hasError}
        {...getOverrideProps(overrides, "order")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              description,
              poster,
              order,
              Video: value,
              unitID,
            };
            const result = onChange(modelFields);
            value = result?.Video ?? value;
          }
          setVideo(value);
          setCurrentVideoValue(undefined);
          setCurrentVideoDisplayValue("");
        }}
        currentFieldValue={currentVideoValue}
        label={"Video"}
        items={Video ? [Video] : []}
        hasError={errors?.Video?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Video", currentVideoValue)
        }
        errorMessage={errors?.Video?.errorMessage}
        getBadgeText={getDisplayValue.Video}
        setFieldValue={(model) => {
          setCurrentVideoDisplayValue(
            model ? getDisplayValue.Video(model) : ""
          );
          setCurrentVideoValue(model);
        }}
        inputFieldRef={VideoRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Video"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Video"
          value={currentVideoDisplayValue}
          options={videoRecords
            .filter((r) => !VideoIdSet.has(getIDValue.Video?.(r)))
            .map((r) => ({
              id: getIDValue.Video?.(r),
              label: getDisplayValue.Video?.(r),
            }))}
          isLoading={VideoLoading}
          onSelect={({ id, label }) => {
            setCurrentVideoValue(
              videoRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentVideoDisplayValue(label);
            runValidationTasks("Video", label);
          }}
          onClear={() => {
            setCurrentVideoDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchVideoRecords(value);
            if (errors.Video?.hasError) {
              runValidationTasks("Video", value);
            }
            setCurrentVideoDisplayValue(value);
            setCurrentVideoValue(undefined);
          }}
          onBlur={() => runValidationTasks("Video", currentVideoDisplayValue)}
          errorMessage={errors.Video?.errorMessage}
          hasError={errors.Video?.hasError}
          ref={VideoRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Video")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              title,
              description,
              poster,
              order,
              Video,
              unitID: value,
            };
            const result = onChange(modelFields);
            value = result?.unitID ?? value;
          }
          setUnitID(value);
          setCurrentUnitIDValue(undefined);
        }}
        currentFieldValue={currentUnitIDValue}
        label={"Unit id"}
        items={unitID ? [unitID] : []}
        hasError={errors?.unitID?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("unitID", currentUnitIDValue)
        }
        errorMessage={errors?.unitID?.errorMessage}
        getBadgeText={(value) =>
          value
            ? getDisplayValue.unitID(
                unitIDRecords.find((r) => r.id === value) ??
                  selectedUnitIDRecords.find((r) => r.id === value)
              )
            : ""
        }
        setFieldValue={(value) => {
          setCurrentUnitIDDisplayValue(
            value
              ? getDisplayValue.unitID(
                  unitIDRecords.find((r) => r.id === value) ??
                    selectedUnitIDRecords.find((r) => r.id === value)
                )
              : ""
          );
          setCurrentUnitIDValue(value);
          const selectedRecord = unitIDRecords.find((r) => r.id === value);
          if (selectedRecord) {
            setSelectedUnitIDRecords([selectedRecord]);
          }
        }}
        inputFieldRef={unitIDRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Unit id"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Unit"
          value={currentUnitIDDisplayValue}
          options={unitIDRecords
            .filter(
              (r, i, arr) =>
                arr.findIndex((member) => member?.id === r?.id) === i
            )
            .map((r) => ({
              id: r?.id,
              label: getDisplayValue.unitID?.(r),
            }))}
          isLoading={unitIDLoading}
          onSelect={({ id, label }) => {
            setCurrentUnitIDValue(id);
            setCurrentUnitIDDisplayValue(label);
            runValidationTasks("unitID", label);
          }}
          onClear={() => {
            setCurrentUnitIDDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchUnitIDRecords(value);
            if (errors.unitID?.hasError) {
              runValidationTasks("unitID", value);
            }
            setCurrentUnitIDDisplayValue(value);
            setCurrentUnitIDValue(undefined);
          }}
          onBlur={() => runValidationTasks("unitID", currentUnitIDValue)}
          errorMessage={errors.unitID?.errorMessage}
          hasError={errors.unitID?.hasError}
          ref={unitIDRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "unitID")}
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
