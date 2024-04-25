/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSubscriber = /* GraphQL */ `
  subscription OnCreateSubscriber(
    $filter: ModelSubscriptionSubscriberFilterInput
  ) {
    onCreateSubscriber(filter: $filter) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateSubscriber = /* GraphQL */ `
  subscription OnUpdateSubscriber(
    $filter: ModelSubscriptionSubscriberFilterInput
  ) {
    onUpdateSubscriber(filter: $filter) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteSubscriber = /* GraphQL */ `
  subscription OnDeleteSubscriber(
    $filter: ModelSubscriptionSubscriberFilterInput
  ) {
    onDeleteSubscriber(filter: $filter) {
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onCreateMeeting(filter: $filter) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onUpdateMeeting(filter: $filter) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($filter: ModelSubscriptionMeetingFilterInput) {
    onDeleteMeeting(filter: $filter) {
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
export const onCreateAttendee = /* GraphQL */ `
  subscription OnCreateAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onCreateAttendee(filter: $filter) {
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
export const onUpdateAttendee = /* GraphQL */ `
  subscription OnUpdateAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onUpdateAttendee(filter: $filter) {
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
export const onDeleteAttendee = /* GraphQL */ `
  subscription OnDeleteAttendee($filter: ModelSubscriptionAttendeeFilterInput) {
    onDeleteAttendee(filter: $filter) {
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
export const onCreateProgress = /* GraphQL */ `
  subscription OnCreateProgress(
    $filter: ModelSubscriptionProgressFilterInput
    $owner: String
  ) {
    onCreateProgress(filter: $filter, owner: $owner) {
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
export const onUpdateProgress = /* GraphQL */ `
  subscription OnUpdateProgress(
    $filter: ModelSubscriptionProgressFilterInput
    $owner: String
  ) {
    onUpdateProgress(filter: $filter, owner: $owner) {
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
export const onDeleteProgress = /* GraphQL */ `
  subscription OnDeleteProgress(
    $filter: ModelSubscriptionProgressFilterInput
    $owner: String
  ) {
    onDeleteProgress(filter: $filter, owner: $owner) {
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
export const onCreateVideo = /* GraphQL */ `
  subscription OnCreateVideo(
    $filter: ModelSubscriptionVideoFilterInput
    $owner: String
  ) {
    onCreateVideo(filter: $filter, owner: $owner) {
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
export const onUpdateVideo = /* GraphQL */ `
  subscription OnUpdateVideo(
    $filter: ModelSubscriptionVideoFilterInput
    $owner: String
  ) {
    onUpdateVideo(filter: $filter, owner: $owner) {
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
export const onDeleteVideo = /* GraphQL */ `
  subscription OnDeleteVideo(
    $filter: ModelSubscriptionVideoFilterInput
    $owner: String
  ) {
    onDeleteVideo(filter: $filter, owner: $owner) {
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
export const onCreateStep = /* GraphQL */ `
  subscription OnCreateStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onCreateStep(filter: $filter, owner: $owner) {
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
export const onUpdateStep = /* GraphQL */ `
  subscription OnUpdateStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onUpdateStep(filter: $filter, owner: $owner) {
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
export const onDeleteStep = /* GraphQL */ `
  subscription OnDeleteStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onDeleteStep(filter: $filter, owner: $owner) {
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
export const onCreateUnit = /* GraphQL */ `
  subscription OnCreateUnit(
    $filter: ModelSubscriptionUnitFilterInput
    $owner: String
  ) {
    onCreateUnit(filter: $filter, owner: $owner) {
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
export const onUpdateUnit = /* GraphQL */ `
  subscription OnUpdateUnit(
    $filter: ModelSubscriptionUnitFilterInput
    $owner: String
  ) {
    onUpdateUnit(filter: $filter, owner: $owner) {
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
export const onDeleteUnit = /* GraphQL */ `
  subscription OnDeleteUnit(
    $filter: ModelSubscriptionUnitFilterInput
    $owner: String
  ) {
    onDeleteUnit(filter: $filter, owner: $owner) {
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
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram(
    $filter: ModelSubscriptionProgramFilterInput
    $owner: String
  ) {
    onCreateProgram(filter: $filter, owner: $owner) {
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
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram(
    $filter: ModelSubscriptionProgramFilterInput
    $owner: String
  ) {
    onUpdateProgram(filter: $filter, owner: $owner) {
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
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram(
    $filter: ModelSubscriptionProgramFilterInput
    $owner: String
  ) {
    onDeleteProgram(filter: $filter, owner: $owner) {
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
export const onCreateInstructor = /* GraphQL */ `
  subscription OnCreateInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
    $owner: String
  ) {
    onCreateInstructor(filter: $filter, owner: $owner) {
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
export const onUpdateInstructor = /* GraphQL */ `
  subscription OnUpdateInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
    $owner: String
  ) {
    onUpdateInstructor(filter: $filter, owner: $owner) {
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
export const onDeleteInstructor = /* GraphQL */ `
  subscription OnDeleteInstructor(
    $filter: ModelSubscriptionInstructorFilterInput
    $owner: String
  ) {
    onDeleteInstructor(filter: $filter, owner: $owner) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onCreateStudent(filter: $filter, owner: $owner) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onUpdateStudent(filter: $filter, owner: $owner) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent(
    $filter: ModelSubscriptionStudentFilterInput
    $owner: String
  ) {
    onDeleteStudent(filter: $filter, owner: $owner) {
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
export const onCreateStudentProgram = /* GraphQL */ `
  subscription OnCreateStudentProgram(
    $filter: ModelSubscriptionStudentProgramFilterInput
    $owner: String
  ) {
    onCreateStudentProgram(filter: $filter, owner: $owner) {
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
export const onUpdateStudentProgram = /* GraphQL */ `
  subscription OnUpdateStudentProgram(
    $filter: ModelSubscriptionStudentProgramFilterInput
    $owner: String
  ) {
    onUpdateStudentProgram(filter: $filter, owner: $owner) {
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
export const onDeleteStudentProgram = /* GraphQL */ `
  subscription OnDeleteStudentProgram(
    $filter: ModelSubscriptionStudentProgramFilterInput
    $owner: String
  ) {
    onDeleteStudentProgram(filter: $filter, owner: $owner) {
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
export const onCreateInstructorProgram = /* GraphQL */ `
  subscription OnCreateInstructorProgram(
    $filter: ModelSubscriptionInstructorProgramFilterInput
    $owner: String
  ) {
    onCreateInstructorProgram(filter: $filter, owner: $owner) {
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
export const onUpdateInstructorProgram = /* GraphQL */ `
  subscription OnUpdateInstructorProgram(
    $filter: ModelSubscriptionInstructorProgramFilterInput
    $owner: String
  ) {
    onUpdateInstructorProgram(filter: $filter, owner: $owner) {
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
export const onDeleteInstructorProgram = /* GraphQL */ `
  subscription OnDeleteInstructorProgram(
    $filter: ModelSubscriptionInstructorProgramFilterInput
    $owner: String
  ) {
    onDeleteInstructorProgram(filter: $filter, owner: $owner) {
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
