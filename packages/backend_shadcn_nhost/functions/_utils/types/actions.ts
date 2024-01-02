type Maybe<T> = T | null;

type uuid = string;

type NoticeAttendanceInput = {
  id: uuid;
};

export type NoticeAttendanceOutput = {
  noticedWebPush?: Maybe<number>;
  noticedEmail?: Maybe<number>;
};

export type noticeAttendaceArgs = {
  event: NoticeAttendanceInput;
};

type UserIdHashInput = {
  typehash: string;
};

export type CreateUserIdOutput = {
  affected_rows: number;
};

type Mutation = {
  createUserIdHash?: Maybe<CreateUserIdOutput>;
  noticeAttendace?: Maybe<NoticeAttendanceOutput>;
};

export type createUserIdHashArgs = {
  users: UserIdHashInput;
};
