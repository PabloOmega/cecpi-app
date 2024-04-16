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
  getProgram,
  getUnit,
  listPrograms,
  listSteps,
} from "../graphql/queries";
import { updateStep, updateUnit } from "../graphql/mutations";
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
export default function UnitUpdateForm(props) {
  const {
    id: idProp,
    unit: unitModelProp,
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
    poster: "",
    order: "",
    programID: undefined,
    Steps: [],
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [poster, setPoster] = React.useState(initialValues.poster);
  const [order, setOrder] = React.useState(initialValues.order);
  const [programID, setProgramID] = React.useState(initialValues.programID);
  const [programIDLoading, setProgramIDLoading] = React.useState(false);
  const [programIDRecords, setProgramIDRecords] = React.useState([]);
  const [selectedProgramIDRecords, setSelectedProgramIDRecords] =
    React.useState([]);
  const [Steps, setSteps] = React.useState(initialValues.Steps);
  const [StepsLoading, setStepsLoading] = React.useState(false);
  const [stepsRecords, setStepsRecords] = React.useState([]);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = unitRecord
      ? { ...initialValues, ...unitRecord, programID, Steps: linkedSteps }
      : initialValues;
    setTitle(cleanValues.title);
    setPoster(cleanValues.poster);
    setOrder(cleanValues.order);
    setProgramID(cleanValues.programID);
    setCurrentProgramIDValue(undefined);
    setCurrentProgramIDDisplayValue("");
    setSteps(cleanValues.Steps ?? []);
    setCurrentStepsValue(undefined);
    setCurrentStepsDisplayValue("");
    setErrors({});
  };
  const [unitRecord, setUnitRecord] = React.useState(unitModelProp);
  const [linkedSteps, setLinkedSteps] = React.useState([]);
  const canUnlinkSteps = true;
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUnit.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUnit
        : unitModelProp;
      const programIDRecord = record ? record.programID : undefined;
      const programRecord = programIDRecord
        ? (
            await client.graphql({
              query: getProgram.replaceAll("__typename", ""),
              variables: { id: programIDRecord },
            })
          )?.data?.getProgram
        : undefined;
      setProgramID(programIDRecord);
      setSelectedProgramIDRecords([programRecord]);
      const linkedSteps = record?.Steps?.items ?? [];
      setLinkedSteps(linkedSteps);
      setUnitRecord(record);
    };
    queryData();
  }, [idProp, unitModelProp]);
  React.useEffect(resetStateValues, [unitRecord, programID, linkedSteps]);
  const [currentProgramIDDisplayValue, setCurrentProgramIDDisplayValue] =
    React.useState("");
  const [currentProgramIDValue, setCurrentProgramIDValue] =
    React.useState(undefined);
  const programIDRef = React.createRef();
  const [currentStepsDisplayValue, setCurrentStepsDisplayValue] =
    React.useState("");
  const [currentStepsValue, setCurrentStepsValue] = React.useState(undefined);
  const StepsRef = React.createRef();
  const getIDValue = {
    Steps: (r) => JSON.stringify({ id: r?.id }),
  };
  const StepsIdSet = new Set(
    Array.isArray(Steps)
      ? Steps.map((r) => getIDValue.Steps?.(r))
      : getIDValue.Steps?.(Steps)
  );
  const getDisplayValue = {
    programID: (r) => `${r?.name ? r?.name + " - " : ""}${r?.id}`,
    Steps: (r) => `${r?.title ? r?.title + " - " : ""}${r?.id}`,
  };
  const validations = {
    title: [{ type: "Required" }],
    poster: [],
    order: [],
    programID: [{ type: "Required" }],
    Steps: [],
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
  const fetchStepsRecords = async (value) => {
    setStepsLoading(true);
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
        (item) => !StepsIdSet.has(getIDValue.Steps?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setStepsRecords(newOptions.slice(0, autocompleteLength));
    setStepsLoading(false);
  };
  React.useEffect(() => {
    fetchProgramIDRecords("");
    fetchStepsRecords("");
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
          poster: poster ?? null,
          order: order ?? null,
          programID,
          Steps: Steps ?? null,
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
          const stepsToLink = [];
          const stepsToUnLink = [];
          const stepsSet = new Set();
          const linkedStepsSet = new Set();
          Steps.forEach((r) => stepsSet.add(getIDValue.Steps?.(r)));
          linkedSteps.forEach((r) => linkedStepsSet.add(getIDValue.Steps?.(r)));
          linkedSteps.forEach((r) => {
            if (!stepsSet.has(getIDValue.Steps?.(r))) {
              stepsToUnLink.push(r);
            }
          });
          Steps.forEach((r) => {
            if (!linkedStepsSet.has(getIDValue.Steps?.(r))) {
              stepsToLink.push(r);
            }
          });
          stepsToUnLink.forEach((original) => {
            if (!canUnlinkSteps) {
              throw Error(
                `Step ${original.id} cannot be unlinked from Unit because unitID is a required field.`
              );
            }
            promises.push(
              client.graphql({
                query: updateStep.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    unitID: null,
                  },
                },
              })
            );
          });
          stepsToLink.forEach((original) => {
            promises.push(
              client.graphql({
                query: updateStep.replaceAll("__typename", ""),
                variables: {
                  input: {
                    id: original.id,
                    unitID: unitRecord.id,
                  },
                },
              })
            );
          });
          const modelFieldsToSave = {
            title: modelFields.title,
            poster: modelFields.poster ?? null,
            order: modelFields.order ?? null,
            programID: modelFields.programID,
          };
          promises.push(
            client.graphql({
              query: updateUnit.replaceAll("__typename", ""),
              variables: {
                input: {
                  id: unitRecord.id,
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
      {...getOverrideProps(overrides, "UnitUpdateForm")}
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
              poster,
              order,
              programID,
              Steps,
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
        label="Poster"
        isRequired={false}
        isReadOnly={false}
        value={poster}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              poster: value,
              order,
              programID,
              Steps,
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
              poster,
              order: value,
              programID,
              Steps,
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
              poster,
              order,
              programID: value,
              Steps,
            };
            const result = onChange(modelFields);
            value = result?.programID ?? value;
          }
          setProgramID(value);
          setCurrentProgramIDValue(undefined);
        }}
        currentFieldValue={currentProgramIDValue}
        label={"Program id"}
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
          label="Program id"
          isRequired={true}
          isReadOnly={false}
          placeholder="Search Program"
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
          defaultValue={programID}
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              poster,
              order,
              programID,
              Steps: values,
            };
            const result = onChange(modelFields);
            values = result?.Steps ?? values;
          }
          setSteps(values);
          setCurrentStepsValue(undefined);
          setCurrentStepsDisplayValue("");
        }}
        currentFieldValue={currentStepsValue}
        label={"Steps"}
        items={Steps}
        hasError={errors?.Steps?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Steps", currentStepsValue)
        }
        errorMessage={errors?.Steps?.errorMessage}
        getBadgeText={getDisplayValue.Steps}
        setFieldValue={(model) => {
          setCurrentStepsDisplayValue(
            model ? getDisplayValue.Steps(model) : ""
          );
          setCurrentStepsValue(model);
        }}
        inputFieldRef={StepsRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Steps"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Step"
          value={currentStepsDisplayValue}
          options={stepsRecords
            .filter((r) => !StepsIdSet.has(getIDValue.Steps?.(r)))
            .map((r) => ({
              id: getIDValue.Steps?.(r),
              label: getDisplayValue.Steps?.(r),
            }))}
          isLoading={StepsLoading}
          onSelect={({ id, label }) => {
            setCurrentStepsValue(
              stepsRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentStepsDisplayValue(label);
            runValidationTasks("Steps", label);
          }}
          onClear={() => {
            setCurrentStepsDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchStepsRecords(value);
            if (errors.Steps?.hasError) {
              runValidationTasks("Steps", value);
            }
            setCurrentStepsDisplayValue(value);
            setCurrentStepsValue(undefined);
          }}
          onBlur={() => runValidationTasks("Steps", currentStepsDisplayValue)}
          errorMessage={errors.Steps?.errorMessage}
          hasError={errors.Steps?.hasError}
          ref={StepsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Steps")}
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
          isDisabled={!(idProp || unitModelProp)}
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
              !(idProp || unitModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
