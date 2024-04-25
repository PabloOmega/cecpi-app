/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSubscriber = /* GraphQL */ `
  mutation CreateSubscriber(
    $input: CreateSubscriberInput!
    $condition: ModelSubscriberConditionInput
  ) {
    createSubscriber(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSubscriber = /* GraphQL */ `
  mutation UpdateSubscriber(
    $input: UpdateSubscriberInput!
    $condition: ModelSubscriberConditionInput
  ) {
    updateSubscriber(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSubscriber = /* GraphQL */ `
  mutation DeleteSubscriber(
    $input: DeleteSubscriberInput!
    $condition: ModelSubscriberConditionInput
  ) {
    deleteSubscriber(input: $input, condition: $condition) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      senderName
      type
      receiverID
      meetingID
      attendeeID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      senderName
      type
      receiverID
      meetingID
      attendeeID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      senderName
      type
      receiverID
      meetingID
      attendeeID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
      id
      title
      data
      date
      time
      description
      channelArn
      endpointMessaging
      mediaCaptureData
      programID
      Attendees {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeeting(input: $input, condition: $condition) {
      id
      title
      data
      date
      time
      description
      channelArn
      endpointMessaging
      mediaCaptureData
      programID
      Attendees {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeeting(input: $input, condition: $condition) {
      id
      title
      data
      date
      time
      description
      channelArn
      endpointMessaging
      mediaCaptureData
      programID
      Attendees {
        nextToken
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAttendee = /* GraphQL */ `
  mutation CreateAttendee(
    $input: CreateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    createAttendee(input: $input, condition: $condition) {
      attendeeId
      name
      data
      raisedHand
      userArn
      meetingID
      Student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      attendeeStudentId
      __typename
    }
  }
`;
export const updateAttendee = /* GraphQL */ `
  mutation UpdateAttendee(
    $input: UpdateAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    updateAttendee(input: $input, condition: $condition) {
      attendeeId
      name
      data
      raisedHand
      userArn
      meetingID
      Student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      attendeeStudentId
      __typename
    }
  }
`;
export const deleteAttendee = /* GraphQL */ `
  mutation DeleteAttendee(
    $input: DeleteAttendeeInput!
    $condition: ModelAttendeeConditionInput
  ) {
    deleteAttendee(input: $input, condition: $condition) {
      attendeeId
      name
      data
      raisedHand
      userArn
      meetingID
      Student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      Messages {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      attendeeStudentId
      __typename
    }
  }
`;
export const createProgress = /* GraphQL */ `
  mutation CreateProgress(
    $input: CreateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    createProgress(input: $input, condition: $condition) {
      id
      progress
      studentID
      Step {
        id
        title
        description
        poster
        order
        unitID
        createdAt
        updatedAt
        stepVideoId
        owner
        __typename
      }
      createdAt
      updatedAt
      progressStepId
      owner
      __typename
    }
  }
`;
export const updateProgress = /* GraphQL */ `
  mutation UpdateProgress(
    $input: UpdateProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    updateProgress(input: $input, condition: $condition) {
      id
      progress
      studentID
      Step {
        id
        title
        description
        poster
        order
        unitID
        createdAt
        updatedAt
        stepVideoId
        owner
        __typename
      }
      createdAt
      updatedAt
      progressStepId
      owner
      __typename
    }
  }
`;
export const deleteProgress = /* GraphQL */ `
  mutation DeleteProgress(
    $input: DeleteProgressInput!
    $condition: ModelProgressConditionInput
  ) {
    deleteProgress(input: $input, condition: $condition) {
      id
      progress
      studentID
      Step {
        id
        title
        description
        poster
        order
        unitID
        createdAt
        updatedAt
        stepVideoId
        owner
        __typename
      }
      createdAt
      updatedAt
      progressStepId
      owner
      __typename
    }
  }
`;
export const createVideo = /* GraphQL */ `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
      id
      title
      path
      description
      poster
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
      id
      title
      path
      description
      poster
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
      id
      title
      path
      description
      poster
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createStep = /* GraphQL */ `
  mutation CreateStep(
    $input: CreateStepInput!
    $condition: ModelStepConditionInput
  ) {
    createStep(input: $input, condition: $condition) {
      id
      title
      description
      poster
      order
      Video {
        id
        title
        path
        description
        poster
        createdAt
        updatedAt
        owner
        __typename
      }
      unitID
      createdAt
      updatedAt
      stepVideoId
      owner
      __typename
    }
  }
`;
export const updateStep = /* GraphQL */ `
  mutation UpdateStep(
    $input: UpdateStepInput!
    $condition: ModelStepConditionInput
  ) {
    updateStep(input: $input, condition: $condition) {
      id
      title
      description
      poster
      order
      Video {
        id
        title
        path
        description
        poster
        createdAt
        updatedAt
        owner
        __typename
      }
      unitID
      createdAt
      updatedAt
      stepVideoId
      owner
      __typename
    }
  }
`;
export const deleteStep = /* GraphQL */ `
  mutation DeleteStep(
    $input: DeleteStepInput!
    $condition: ModelStepConditionInput
  ) {
    deleteStep(input: $input, condition: $condition) {
      id
      title
      description
      poster
      order
      Video {
        id
        title
        path
        description
        poster
        createdAt
        updatedAt
        owner
        __typename
      }
      unitID
      createdAt
      updatedAt
      stepVideoId
      owner
      __typename
    }
  }
`;
export const createUnit = /* GraphQL */ `
  mutation CreateUnit(
    $input: CreateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    createUnit(input: $input, condition: $condition) {
      id
      title
      poster
      order
      programID
      Steps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUnit = /* GraphQL */ `
  mutation UpdateUnit(
    $input: UpdateUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    updateUnit(input: $input, condition: $condition) {
      id
      title
      poster
      order
      programID
      Steps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUnit = /* GraphQL */ `
  mutation DeleteUnit(
    $input: DeleteUnitInput!
    $condition: ModelUnitConditionInput
  ) {
    deleteUnit(input: $input, condition: $condition) {
      id
      title
      poster
      order
      programID
      Steps {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createProgram = /* GraphQL */ `
  mutation CreateProgram(
    $input: CreateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    createProgram(input: $input, condition: $condition) {
      id
      name
      type
      price
      discount
      isLive
      image
      shortDescription
      students {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      Units {
        nextToken
        __typename
      }
      Meetings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateProgram = /* GraphQL */ `
  mutation UpdateProgram(
    $input: UpdateProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    updateProgram(input: $input, condition: $condition) {
      id
      name
      type
      price
      discount
      isLive
      image
      shortDescription
      students {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      Units {
        nextToken
        __typename
      }
      Meetings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteProgram = /* GraphQL */ `
  mutation DeleteProgram(
    $input: DeleteProgramInput!
    $condition: ModelProgramConditionInput
  ) {
    deleteProgram(input: $input, condition: $condition) {
      id
      name
      type
      price
      discount
      isLive
      image
      shortDescription
      students {
        nextToken
        __typename
      }
      instructors {
        nextToken
        __typename
      }
      Units {
        nextToken
        __typename
      }
      Meetings {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createInstructor = /* GraphQL */ `
  mutation CreateInstructor(
    $input: CreateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    createInstructor(input: $input, condition: $condition) {
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateInstructor = /* GraphQL */ `
  mutation UpdateInstructor(
    $input: UpdateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    updateInstructor(input: $input, condition: $condition) {
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteInstructor = /* GraphQL */ `
  mutation DeleteInstructor(
    $input: DeleteInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    deleteInstructor(input: $input, condition: $condition) {
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      id
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      Progresses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      id
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      Progresses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      id
      userId
      email
      Programs {
        nextToken
        __typename
      }
      name
      Progresses {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createStudentProgram = /* GraphQL */ `
  mutation CreateStudentProgram(
    $input: CreateStudentProgramInput!
    $condition: ModelStudentProgramConditionInput
  ) {
    createStudentProgram(input: $input, condition: $condition) {
      id
      programId
      studentId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateStudentProgram = /* GraphQL */ `
  mutation UpdateStudentProgram(
    $input: UpdateStudentProgramInput!
    $condition: ModelStudentProgramConditionInput
  ) {
    updateStudentProgram(input: $input, condition: $condition) {
      id
      programId
      studentId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteStudentProgram = /* GraphQL */ `
  mutation DeleteStudentProgram(
    $input: DeleteStudentProgramInput!
    $condition: ModelStudentProgramConditionInput
  ) {
    deleteStudentProgram(input: $input, condition: $condition) {
      id
      programId
      studentId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      student {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createInstructorProgram = /* GraphQL */ `
  mutation CreateInstructorProgram(
    $input: CreateInstructorProgramInput!
    $condition: ModelInstructorProgramConditionInput
  ) {
    createInstructorProgram(input: $input, condition: $condition) {
      id
      programId
      instructorUserId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      instructor {
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateInstructorProgram = /* GraphQL */ `
  mutation UpdateInstructorProgram(
    $input: UpdateInstructorProgramInput!
    $condition: ModelInstructorProgramConditionInput
  ) {
    updateInstructorProgram(input: $input, condition: $condition) {
      id
      programId
      instructorUserId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      instructor {
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteInstructorProgram = /* GraphQL */ `
  mutation DeleteInstructorProgram(
    $input: DeleteInstructorProgramInput!
    $condition: ModelInstructorProgramConditionInput
  ) {
    deleteInstructorProgram(input: $input, condition: $condition) {
      id
      programId
      instructorUserId
      program {
        id
        name
        type
        price
        discount
        isLive
        image
        shortDescription
        createdAt
        updatedAt
        owner
        __typename
      }
      instructor {
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
