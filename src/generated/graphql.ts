import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigFloat: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  UUID: any;
};

export type Booking = Node & {
  __typename?: 'Booking';
  checkInDate: Scalars['Date'];
  checkOutDate: Scalars['Date'];
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Room` that is related to this `Booking`. */
  roomByRoomId?: Maybe<Room>;
  roomId: Scalars['UUID'];
  status: BookingStatus;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `Booking`. */
  userByUserId?: Maybe<User>;
  userId: Scalars['UUID'];
};

/** A condition to be used against `Booking` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BookingCondition = {
  /** Checks for equality with the object’s `checkInDate` field. */
  checkInDate?: InputMaybe<Scalars['Date']>;
  /** Checks for equality with the object’s `checkOutDate` field. */
  checkOutDate?: InputMaybe<Scalars['Date']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `roomId` field. */
  roomId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<BookingStatus>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Booking` */
export type BookingInput = {
  checkInDate: Scalars['Date'];
  checkOutDate: Scalars['Date'];
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  roomId: Scalars['UUID'];
  status?: InputMaybe<BookingStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId: Scalars['UUID'];
};

/** Represents an update to a `Booking`. Fields that are set will be updated. */
export type BookingPatch = {
  checkInDate?: InputMaybe<Scalars['Date']>;
  checkOutDate?: InputMaybe<Scalars['Date']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  roomId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<BookingStatus>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

export enum BookingStatus {
  Booked = 'BOOKED',
  Cancelled = 'CANCELLED',
  CheckedIn = 'CHECKED_IN',
  CheckedOut = 'CHECKED_OUT'
}

/** A connection to a list of `Booking` values. */
export type BookingsConnection = {
  __typename?: 'BookingsConnection';
  /** A list of edges which contains the `Booking` and cursor to aid in pagination. */
  edges: Array<BookingsEdge>;
  /** A list of `Booking` objects. */
  nodes: Array<Maybe<Booking>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Booking` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Booking` edge in the connection. */
export type BookingsEdge = {
  __typename?: 'BookingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Booking` at the end of the edge. */
  node?: Maybe<Booking>;
};

/** Methods to use when ordering `Booking`. */
export enum BookingsOrderBy {
  CheckInDateAsc = 'CHECK_IN_DATE_ASC',
  CheckInDateDesc = 'CHECK_IN_DATE_DESC',
  CheckOutDateAsc = 'CHECK_OUT_DATE_ASC',
  CheckOutDateDesc = 'CHECK_OUT_DATE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoomIdAsc = 'ROOM_ID_ASC',
  RoomIdDesc = 'ROOM_ID_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** All input for the create `Booking` mutation. */
export type CreateBookingInput = {
  /** The `Booking` to be created by this mutation. */
  booking: BookingInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `Booking` mutation. */
export type CreateBookingPayload = {
  __typename?: 'CreateBookingPayload';
  /** The `Booking` that was created by this mutation. */
  booking?: Maybe<Booking>;
  /** An edge for our `Booking`. May be used by Relay 1. */
  bookingEdge?: Maybe<BookingsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Room` that is related to this `Booking`. */
  roomByRoomId?: Maybe<Room>;
  /** Reads a single `User` that is related to this `Booking`. */
  userByUserId?: Maybe<User>;
};


/** The output of our create `Booking` mutation. */
export type CreateBookingPayloadBookingEdgeArgs = {
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};

/** All input for the create `Room` mutation. */
export type CreateRoomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Room` to be created by this mutation. */
  room: RoomInput;
};

/** The output of our create `Room` mutation. */
export type CreateRoomPayload = {
  __typename?: 'CreateRoomPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Room` that was created by this mutation. */
  room?: Maybe<Room>;
  /** An edge for our `Room`. May be used by Relay 1. */
  roomEdge?: Maybe<RoomsEdge>;
};


/** The output of our create `Room` mutation. */
export type CreateRoomPayloadRoomEdgeArgs = {
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteBookingById` mutation. */
export type DeleteBookingByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteBooking` mutation. */
export type DeleteBookingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Booking` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Booking` mutation. */
export type DeleteBookingPayload = {
  __typename?: 'DeleteBookingPayload';
  /** The `Booking` that was deleted by this mutation. */
  booking?: Maybe<Booking>;
  /** An edge for our `Booking`. May be used by Relay 1. */
  bookingEdge?: Maybe<BookingsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedBookingId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Room` that is related to this `Booking`. */
  roomByRoomId?: Maybe<Room>;
  /** Reads a single `User` that is related to this `Booking`. */
  userByUserId?: Maybe<User>;
};


/** The output of our delete `Booking` mutation. */
export type DeleteBookingPayloadBookingEdgeArgs = {
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};

/** All input for the `deleteRoomById` mutation. */
export type DeleteRoomByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteRoomByRoomNumber` mutation. */
export type DeleteRoomByRoomNumberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  roomNumber: Scalars['Int'];
};

/** All input for the `deleteRoom` mutation. */
export type DeleteRoomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Room` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Room` mutation. */
export type DeleteRoomPayload = {
  __typename?: 'DeleteRoomPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedRoomId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Room` that was deleted by this mutation. */
  room?: Maybe<Room>;
  /** An edge for our `Room`. May be used by Relay 1. */
  roomEdge?: Maybe<RoomsEdge>;
};


/** The output of our delete `Room` mutation. */
export type DeleteRoomPayloadRoomEdgeArgs = {
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Booking`. */
  createBooking?: Maybe<CreateBookingPayload>;
  /** Creates a single `Room`. */
  createRoom?: Maybe<CreateRoomPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Deletes a single `Booking` using its globally unique id. */
  deleteBooking?: Maybe<DeleteBookingPayload>;
  /** Deletes a single `Booking` using a unique key. */
  deleteBookingById?: Maybe<DeleteBookingPayload>;
  /** Deletes a single `Room` using its globally unique id. */
  deleteRoom?: Maybe<DeleteRoomPayload>;
  /** Deletes a single `Room` using a unique key. */
  deleteRoomById?: Maybe<DeleteRoomPayload>;
  /** Deletes a single `Room` using a unique key. */
  deleteRoomByRoomNumber?: Maybe<DeleteRoomPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserById?: Maybe<DeleteUserPayload>;
  loginUser?: Maybe<Scalars['String']>;
  registerUser?: Maybe<User>;
  /** Updates a single `Booking` using its globally unique id and a patch. */
  updateBooking?: Maybe<UpdateBookingPayload>;
  /** Updates a single `Booking` using a unique key and a patch. */
  updateBookingById?: Maybe<UpdateBookingPayload>;
  /** Updates a single `Room` using its globally unique id and a patch. */
  updateRoom?: Maybe<UpdateRoomPayload>;
  /** Updates a single `Room` using a unique key and a patch. */
  updateRoomById?: Maybe<UpdateRoomPayload>;
  /** Updates a single `Room` using a unique key and a patch. */
  updateRoomByRoomNumber?: Maybe<UpdateRoomPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookingArgs = {
  input: DeleteBookingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookingByIdArgs = {
  input: DeleteBookingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoomArgs = {
  input: DeleteRoomInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoomByIdArgs = {
  input: DeleteRoomByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRoomByRoomNumberArgs = {
  input: DeleteRoomByRoomNumberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookingArgs = {
  input: UpdateBookingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookingByIdArgs = {
  input: UpdateBookingByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoomArgs = {
  input: UpdateRoomInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoomByIdArgs = {
  input: UpdateRoomByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRoomByRoomNumberArgs = {
  input: UpdateRoomByRoomNumberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `Booking`. */
  allBookings?: Maybe<BookingsConnection>;
  /** Reads and enables pagination through a set of `Room`. */
  allRooms?: Maybe<RoomsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  allUsers?: Maybe<UsersConnection>;
  /** Reads a single `Booking` using its globally unique `ID`. */
  booking?: Maybe<Booking>;
  bookingById?: Maybe<Booking>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `Room` using its globally unique `ID`. */
  room?: Maybe<Room>;
  roomById?: Maybe<Room>;
  roomByRoomNumber?: Maybe<Room>;
  /** Reads a single `User` using its globally unique `ID`. */
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userById?: Maybe<User>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBookingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BookingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllRoomsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<RoomCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBookingArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookingByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoomArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoomByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRoomByRoomNumberArgs = {
  roomNumber: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['UUID'];
};

export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Room = Node & {
  __typename?: 'Room';
  /** Reads and enables pagination through a set of `Booking`. */
  bookingsByRoomId: BookingsConnection;
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  pricePerNight: Scalars['BigFloat'];
  roomNumber: Scalars['Int'];
  status: RoomStatus;
  type: RoomType;
  updatedAt: Scalars['Datetime'];
};


export type RoomBookingsByRoomIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BookingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};

/** A condition to be used against `Room` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type RoomCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `pricePerNight` field. */
  pricePerNight?: InputMaybe<Scalars['BigFloat']>;
  /** Checks for equality with the object’s `roomNumber` field. */
  roomNumber?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<RoomStatus>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<RoomType>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `Room` */
export type RoomInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  pricePerNight: Scalars['BigFloat'];
  roomNumber: Scalars['Int'];
  status?: InputMaybe<RoomStatus>;
  type: RoomType;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Room`. Fields that are set will be updated. */
export type RoomPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  pricePerNight?: InputMaybe<Scalars['BigFloat']>;
  roomNumber?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<RoomStatus>;
  type?: InputMaybe<RoomType>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export enum RoomStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Maintenance = 'MAINTENANCE'
}

export enum RoomType {
  Deluxe = 'DELUXE',
  Double = 'DOUBLE',
  Single = 'SINGLE'
}

/** A connection to a list of `Room` values. */
export type RoomsConnection = {
  __typename?: 'RoomsConnection';
  /** A list of edges which contains the `Room` and cursor to aid in pagination. */
  edges: Array<RoomsEdge>;
  /** A list of `Room` objects. */
  nodes: Array<Maybe<Room>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Room` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Room` edge in the connection. */
export type RoomsEdge = {
  __typename?: 'RoomsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Room` at the end of the edge. */
  node?: Maybe<Room>;
};

/** Methods to use when ordering `Room`. */
export enum RoomsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PricePerNightAsc = 'PRICE_PER_NIGHT_ASC',
  PricePerNightDesc = 'PRICE_PER_NIGHT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoomNumberAsc = 'ROOM_NUMBER_ASC',
  RoomNumberDesc = 'ROOM_NUMBER_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** All input for the `updateBookingById` mutation. */
export type UpdateBookingByIdInput = {
  /** An object where the defined keys will be set on the `Booking` being updated. */
  bookingPatch: BookingPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `updateBooking` mutation. */
export type UpdateBookingInput = {
  /** An object where the defined keys will be set on the `Booking` being updated. */
  bookingPatch: BookingPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Booking` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Booking` mutation. */
export type UpdateBookingPayload = {
  __typename?: 'UpdateBookingPayload';
  /** The `Booking` that was updated by this mutation. */
  booking?: Maybe<Booking>;
  /** An edge for our `Booking`. May be used by Relay 1. */
  bookingEdge?: Maybe<BookingsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Room` that is related to this `Booking`. */
  roomByRoomId?: Maybe<Room>;
  /** Reads a single `User` that is related to this `Booking`. */
  userByUserId?: Maybe<User>;
};


/** The output of our update `Booking` mutation. */
export type UpdateBookingPayloadBookingEdgeArgs = {
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};

/** All input for the `updateRoomById` mutation. */
export type UpdateRoomByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Room` being updated. */
  roomPatch: RoomPatch;
};

/** All input for the `updateRoomByRoomNumber` mutation. */
export type UpdateRoomByRoomNumberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  roomNumber: Scalars['Int'];
  /** An object where the defined keys will be set on the `Room` being updated. */
  roomPatch: RoomPatch;
};

/** All input for the `updateRoom` mutation. */
export type UpdateRoomInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Room` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Room` being updated. */
  roomPatch: RoomPatch;
};

/** The output of our update `Room` mutation. */
export type UpdateRoomPayload = {
  __typename?: 'UpdateRoomPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Room` that was updated by this mutation. */
  room?: Maybe<Room>;
  /** An edge for our `Room`. May be used by Relay 1. */
  roomEdge?: Maybe<RoomsEdge>;
};


/** The output of our update `Room` mutation. */
export type UpdateRoomPayloadRoomEdgeArgs = {
  orderBy?: InputMaybe<Array<RoomsOrderBy>>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  userPatch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Booking`. */
  bookingsByUserId: BookingsConnection;
  createdAt?: Maybe<Scalars['Datetime']>;
  email: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: RoleType;
};


export type UserBookingsByUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<BookingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookingsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `password` field. */
  password?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `phoneNumber` field. */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<RoleType>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleType>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<RoleType>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PasswordAsc = 'PASSWORD_ASC',
  PasswordDesc = 'PASSWORD_DESC',
  PhoneNumberAsc = 'PHONE_NUMBER_ASC',
  PhoneNumberDesc = 'PHONE_NUMBER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC'
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser?: string | null };

export type RegisterUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'User', id: any, name: string, email: string } | null };

export type BookingQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingQuery = { __typename?: 'Query', allBookings?: { __typename?: 'BookingsConnection', nodes: Array<{ __typename?: 'Booking', checkOutDate: any, createdAt: any, status: BookingStatus, roomId: any, userId: any, checkInDate: any, id: any, updatedAt: any, roomByRoomId?: { __typename?: 'Room', id: any, roomNumber: number } | null, userByUserId?: { __typename?: 'User', name: string, id: any } | null } | null> } | null };

export type CancelBookingMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', updateBookingById?: { __typename?: 'UpdateBookingPayload', booking?: { __typename?: 'Booking', id: any, status: BookingStatus } | null } | null };

export type UpdateBookingStatusMutationVariables = Exact<{
  id: Scalars['UUID'];
  status: BookingStatus;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingById?: { __typename?: 'UpdateBookingPayload', booking?: { __typename?: 'Booking', id: any, status: BookingStatus } | null } | null };

export type DashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardStatsQuery = { __typename?: 'Query', totalRooms?: { __typename?: 'RoomsConnection', totalCount: number } | null, availableRooms?: { __typename?: 'RoomsConnection', totalCount: number } | null, bookedBookings?: { __typename?: 'BookingsConnection', totalCount: number } | null, checkedInBookings?: { __typename?: 'BookingsConnection', totalCount: number } | null };

export type AllGuestsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGuestsQuery = { __typename?: 'Query', allUsers?: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UsersEdge', node?: { __typename?: 'User', id: any, name: string, email: string, phoneNumber?: string | null } | null }> } | null };

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom?: { __typename?: 'CreateRoomPayload', room?: { __typename?: 'Room', id: any, roomNumber: number, pricePerNight: any, status: RoomStatus, type: RoomType } | null } | null };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoomById?: { __typename?: 'DeleteRoomPayload', clientMutationId?: string | null, deletedRoomId?: string | null } | null };

export type UpdateRoomMutationVariables = Exact<{
  roomNumber: Scalars['Int'];
  roomPatch: RoomPatch;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoomByRoomNumber?: { __typename?: 'UpdateRoomPayload', room?: { __typename?: 'Room', id: any, roomNumber: number, status: RoomStatus, type: RoomType, pricePerNight: any, updatedAt: any } | null } | null };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', allRooms?: { __typename?: 'RoomsConnection', nodes: Array<{ __typename?: 'Room', pricePerNight: any, roomNumber: number, status: RoomStatus, type: RoomType, id: any, updatedAt: any, createdAt: any } | null> } | null };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  loginUser(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
  registerUser(name: $name, email: $email, password: $password) {
    id
    name
    email
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const BookingDocument = gql`
    query booking {
  allBookings {
    nodes {
      checkOutDate
      createdAt
      status
      roomId
      userId
      checkInDate
      id
      updatedAt
      roomByRoomId {
        id
        roomNumber
      }
      userByUserId {
        name
        id
      }
    }
  }
}
    `;

/**
 * __useBookingQuery__
 *
 * To run a query within a React component, call `useBookingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingQuery(baseOptions?: Apollo.QueryHookOptions<BookingQuery, BookingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingQuery, BookingQueryVariables>(BookingDocument, options);
      }
export function useBookingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingQuery, BookingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingQuery, BookingQueryVariables>(BookingDocument, options);
        }
// @ts-ignore
export function useBookingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookingQuery, BookingQueryVariables>): Apollo.UseSuspenseQueryResult<BookingQuery, BookingQueryVariables>;
export function useBookingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookingQuery, BookingQueryVariables>): Apollo.UseSuspenseQueryResult<BookingQuery | undefined, BookingQueryVariables>;
export function useBookingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BookingQuery, BookingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookingQuery, BookingQueryVariables>(BookingDocument, options);
        }
export type BookingQueryHookResult = ReturnType<typeof useBookingQuery>;
export type BookingLazyQueryHookResult = ReturnType<typeof useBookingLazyQuery>;
export type BookingSuspenseQueryHookResult = ReturnType<typeof useBookingSuspenseQuery>;
export type BookingQueryResult = Apollo.QueryResult<BookingQuery, BookingQueryVariables>;
export const CancelBookingDocument = gql`
    mutation CancelBooking($id: UUID!) {
  updateBookingById(input: {id: $id, bookingPatch: {status: CANCELLED}}) {
    booking {
      id
      status
    }
  }
}
    `;
export type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;

/**
 * __useCancelBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingMutation, { data, loading, error }] = useCancelBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument, options);
      }
export type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export const UpdateBookingStatusDocument = gql`
    mutation UpdateBookingStatus($id: UUID!, $status: BookingStatus!) {
  updateBookingById(input: {id: $id, bookingPatch: {status: $status}}) {
    booking {
      id
      status
    }
  }
}
    `;
export type UpdateBookingStatusMutationFn = Apollo.MutationFunction<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;

/**
 * __useUpdateBookingStatusMutation__
 *
 * To run a mutation, you first call `useUpdateBookingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingStatusMutation, { data, loading, error }] = useUpdateBookingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateBookingStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>(UpdateBookingStatusDocument, options);
      }
export type UpdateBookingStatusMutationHookResult = ReturnType<typeof useUpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationResult = Apollo.MutationResult<UpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;
export const DashboardStatsDocument = gql`
    query DashboardStats {
  totalRooms: allRooms {
    totalCount
  }
  availableRooms: allRooms(condition: {status: AVAILABLE}) {
    totalCount
  }
  bookedBookings: allBookings(condition: {status: BOOKED}) {
    totalCount
  }
  checkedInBookings: allBookings(condition: {status: CHECKED_IN}) {
    totalCount
  }
}
    `;

/**
 * __useDashboardStatsQuery__
 *
 * To run a query within a React component, call `useDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardStatsQuery(baseOptions?: Apollo.QueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
      }
export function useDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
        }
// @ts-ignore
export function useDashboardStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>): Apollo.UseSuspenseQueryResult<DashboardStatsQuery, DashboardStatsQueryVariables>;
export function useDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>): Apollo.UseSuspenseQueryResult<DashboardStatsQuery | undefined, DashboardStatsQueryVariables>;
export function useDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
        }
export type DashboardStatsQueryHookResult = ReturnType<typeof useDashboardStatsQuery>;
export type DashboardStatsLazyQueryHookResult = ReturnType<typeof useDashboardStatsLazyQuery>;
export type DashboardStatsSuspenseQueryHookResult = ReturnType<typeof useDashboardStatsSuspenseQuery>;
export type DashboardStatsQueryResult = Apollo.QueryResult<DashboardStatsQuery, DashboardStatsQueryVariables>;
export const AllGuestsDocument = gql`
    query AllGuests {
  allUsers(condition: {role: USER}) {
    edges {
      node {
        id
        name
        email
        phoneNumber
      }
    }
  }
}
    `;

/**
 * __useAllGuestsQuery__
 *
 * To run a query within a React component, call `useAllGuestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllGuestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllGuestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllGuestsQuery(baseOptions?: Apollo.QueryHookOptions<AllGuestsQuery, AllGuestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllGuestsQuery, AllGuestsQueryVariables>(AllGuestsDocument, options);
      }
export function useAllGuestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllGuestsQuery, AllGuestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllGuestsQuery, AllGuestsQueryVariables>(AllGuestsDocument, options);
        }
// @ts-ignore
export function useAllGuestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllGuestsQuery, AllGuestsQueryVariables>): Apollo.UseSuspenseQueryResult<AllGuestsQuery, AllGuestsQueryVariables>;
export function useAllGuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllGuestsQuery, AllGuestsQueryVariables>): Apollo.UseSuspenseQueryResult<AllGuestsQuery | undefined, AllGuestsQueryVariables>;
export function useAllGuestsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllGuestsQuery, AllGuestsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllGuestsQuery, AllGuestsQueryVariables>(AllGuestsDocument, options);
        }
export type AllGuestsQueryHookResult = ReturnType<typeof useAllGuestsQuery>;
export type AllGuestsLazyQueryHookResult = ReturnType<typeof useAllGuestsLazyQuery>;
export type AllGuestsSuspenseQueryHookResult = ReturnType<typeof useAllGuestsSuspenseQuery>;
export type AllGuestsQueryResult = Apollo.QueryResult<AllGuestsQuery, AllGuestsQueryVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    room {
      id
      roomNumber
      pricePerNight
      status
      type
    }
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($id: UUID!) {
  deleteRoomById(input: {id: $id}) {
    clientMutationId
    deletedRoomId
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const UpdateRoomDocument = gql`
    mutation UpdateRoom($roomNumber: Int!, $roomPatch: RoomPatch!) {
  updateRoomByRoomNumber(input: {roomPatch: $roomPatch, roomNumber: $roomNumber}) {
    room {
      id
      roomNumber
      status
      type
      pricePerNight
      updatedAt
    }
  }
}
    `;
export type UpdateRoomMutationFn = Apollo.MutationFunction<UpdateRoomMutation, UpdateRoomMutationVariables>;

/**
 * __useUpdateRoomMutation__
 *
 * To run a mutation, you first call `useUpdateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoomMutation, { data, loading, error }] = useUpdateRoomMutation({
 *   variables: {
 *      roomNumber: // value for 'roomNumber'
 *      roomPatch: // value for 'roomPatch'
 *   },
 * });
 */
export function useUpdateRoomMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoomMutation, UpdateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoomMutation, UpdateRoomMutationVariables>(UpdateRoomDocument, options);
      }
export type UpdateRoomMutationHookResult = ReturnType<typeof useUpdateRoomMutation>;
export type UpdateRoomMutationResult = Apollo.MutationResult<UpdateRoomMutation>;
export type UpdateRoomMutationOptions = Apollo.BaseMutationOptions<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const RoomsDocument = gql`
    query rooms {
  allRooms {
    nodes {
      pricePerNight
      roomNumber
      status
      type
      id
      updatedAt
      createdAt
    }
  }
}
    `;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
// @ts-ignore
export function useRoomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RoomsQuery, RoomsQueryVariables>): Apollo.UseSuspenseQueryResult<RoomsQuery, RoomsQueryVariables>;
export function useRoomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoomsQuery, RoomsQueryVariables>): Apollo.UseSuspenseQueryResult<RoomsQuery | undefined, RoomsQueryVariables>;
export function useRoomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsSuspenseQueryHookResult = ReturnType<typeof useRoomsSuspenseQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;