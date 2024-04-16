/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const messagesByMeetingID = /* GraphQL */ `
  query MessagesByMeetingID(
    $meetingID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByMeetingID(
      meetingID: $meetingID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const messagesByAttendeeID = /* GraphQL */ `
  query MessagesByAttendeeID(
    $attendeeID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByAttendeeID(
      attendeeID: $attendeeID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const meetingsByProgramID = /* GraphQL */ `
  query MeetingsByProgramID(
    $programID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    meetingsByProgramID(
      programID: $programID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAttendee = /* GraphQL */ `
  query GetAttendee($attendeeId: ID!) {
    getAttendee(attendeeId: $attendeeId) {
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
export const listAttendees = /* GraphQL */ `
  query ListAttendees(
    $attendeeId: ID
    $filter: ModelAttendeeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listAttendees(
      attendeeId: $attendeeId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        attendeeId
        name
        data
        raisedHand
        userArn
        meetingID
        createdAt
        updatedAt
        attendeeStudentId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const attendeesByMeetingID = /* GraphQL */ `
  query AttendeesByMeetingID(
    $meetingID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAttendeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    attendeesByMeetingID(
      meetingID: $meetingID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        attendeeId
        name
        data
        raisedHand
        userArn
        meetingID
        createdAt
        updatedAt
        attendeeStudentId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProgress = /* GraphQL */ `
  query GetProgress($id: ID!) {
    getProgress(id: $id) {
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
export const listProgresses = /* GraphQL */ `
  query ListProgresses(
    $filter: ModelProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProgresses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        progress
        studentID
        createdAt
        updatedAt
        progressStepId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const progressesByStudentID = /* GraphQL */ `
  query ProgressesByStudentID(
    $studentID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProgressFilterInput
    $limit: Int
    $nextToken: String
  ) {
    progressesByStudentID(
      studentID: $studentID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        progress
        studentID
        createdAt
        updatedAt
        progressStepId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
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
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getStep = /* GraphQL */ `
  query GetStep($id: ID!) {
    getStep(id: $id) {
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
export const listSteps = /* GraphQL */ `
  query ListSteps(
    $filter: ModelStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const stepsByUnitIDAndOrder = /* GraphQL */ `
  query StepsByUnitIDAndOrder(
    $unitID: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stepsByUnitIDAndOrder(
      unitID: $unitID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUnit = /* GraphQL */ `
  query GetUnit($id: ID!) {
    getUnit(id: $id) {
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
export const listUnits = /* GraphQL */ `
  query ListUnits(
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        poster
        order
        programID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const unitsByProgramIDAndOrder = /* GraphQL */ `
  query UnitsByProgramIDAndOrder(
    $programID: ID!
    $order: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUnitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    unitsByProgramIDAndOrder(
      programID: $programID
      order: $order
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        poster
        order
        programID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProgram = /* GraphQL */ `
  query GetProgram($id: ID!) {
    getProgram(id: $id) {
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
export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getInstructor = /* GraphQL */ `
  query GetInstructor($userId: ID!) {
    getInstructor(userId: $userId) {
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
export const listInstructors = /* GraphQL */ `
  query ListInstructors(
    $userId: ID
    $filter: ModelInstructorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listInstructors(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        email
        name
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentProgram = /* GraphQL */ `
  query GetStudentProgram($id: ID!) {
    getStudentProgram(id: $id) {
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
export const listStudentPrograms = /* GraphQL */ `
  query ListStudentPrograms(
    $filter: ModelStudentProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        programId
        studentId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentProgramsByProgramId = /* GraphQL */ `
  query StudentProgramsByProgramId(
    $programId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentProgramsByProgramId(
      programId: $programId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programId
        studentId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentProgramsByStudentId = /* GraphQL */ `
  query StudentProgramsByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentProgramsByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programId
        studentId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInstructorProgram = /* GraphQL */ `
  query GetInstructorProgram($id: ID!) {
    getInstructorProgram(id: $id) {
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
export const listInstructorPrograms = /* GraphQL */ `
  query ListInstructorPrograms(
    $filter: ModelInstructorProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstructorPrograms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programId
        instructorUserId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const instructorProgramsByProgramId = /* GraphQL */ `
  query InstructorProgramsByProgramId(
    $programId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInstructorProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    instructorProgramsByProgramId(
      programId: $programId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programId
        instructorUserId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const instructorProgramsByInstructorUserId = /* GraphQL */ `
  query InstructorProgramsByInstructorUserId(
    $instructorUserId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInstructorProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    instructorProgramsByInstructorUserId(
      instructorUserId: $instructorUserId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        programId
        instructorUserId
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const createChimeMeeting = /* GraphQL */ `
  query CreateChimeMeeting(
    $externalMeetingId: String
    $name: String
    $region: String
  ) {
    createChimeMeeting(
      externalMeetingId: $externalMeetingId
      name: $name
      region: $region
    ) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const joinChimeMeeting = /* GraphQL */ `
  query JoinChimeMeeting($meetingId: String, $name: String) {
    joinChimeMeeting(meetingId: $meetingId, name: $name) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const endChimeMeeting = /* GraphQL */ `
  query EndChimeMeeting($meetingId: String) {
    endChimeMeeting(meetingId: $meetingId) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const createAppInstance = /* GraphQL */ `
  query CreateAppInstance($name: String) {
    createAppInstance(name: $name) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const createAppInstanceUser = /* GraphQL */ `
  query CreateAppInstanceUser($userId: String, $name: String) {
    createAppInstanceUser(userId: $userId, name: $name) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const createChannel = /* GraphQL */ `
  query CreateChannel(
    $chimeBearer: String
    $name: String
    $mode: String
    $privacy: String
    $moderatorArn: String
  ) {
    createChannel(
      chimeBearer: $chimeBearer
      name: $name
      mode: $mode
      privacy: $privacy
      moderatorArn: $moderatorArn
    ) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const joinChannel = /* GraphQL */ `
  query JoinChannel(
    $channelArn: String
    $chimeBearer: String
    $memberArn: String
    $type: String
  ) {
    joinChannel(
      channelArn: $channelArn
      chimeBearer: $chimeBearer
      memberArn: $memberArn
      type: $type
    ) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const sendMessage = /* GraphQL */ `
  query SendMessage(
    $channelArn: String
    $chimeBearer: String
    $content: String
    $persistence: String
    $type: String
  ) {
    sendMessage(
      channelArn: $channelArn
      chimeBearer: $chimeBearer
      content: $content
      persistence: $persistence
      type: $type
    ) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const getMessagingEndpoint = /* GraphQL */ `
  query GetMessagingEndpoint {
    getMessagingEndpoint {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const recordMeeting = /* GraphQL */ `
  query RecordMeeting($meetingArn: String, $folderName: String) {
    recordMeeting(meetingArn: $meetingArn, folderName: $folderName) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const stopRecordMeeting = /* GraphQL */ `
  query StopRecordMeeting($mediaPipelineId: String) {
    stopRecordMeeting(mediaPipelineId: $mediaPipelineId) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
export const generateRecordFile = /* GraphQL */ `
  query GenerateRecordFile($mediaPipelineArn: String, $folderName: String) {
    generateRecordFile(
      mediaPipelineArn: $mediaPipelineArn
      folderName: $folderName
    ) {
      statusCode
      headers
      body
      isBase64Encoded
      __typename
    }
  }
`;
