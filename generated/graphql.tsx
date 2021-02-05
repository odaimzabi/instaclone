import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Follower = {
  __typename?: 'Follower';
  id: Scalars['Float'];
  username: Scalars['String'];
};

export type FollowRequest = {
  __typename?: 'FollowRequest';
  id: Scalars['Float'];
  from: Scalars['String'];
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  Followers?: Maybe<Array<Follower>>;
  Requests: Array<FollowRequest>;
};

export type PostEntity = {
  __typename?: 'PostEntity';
  id: Scalars['String'];
  creator: Scalars['String'];
  details: Scalars['String'];
  imgSrc: Scalars['String'];
  createdAt: Scalars['DateTime'];
};


export type PostsResponse = {
  __typename?: 'PostsResponse';
  posts: Array<PostEntity>;
  nextPage: Scalars['Float'];
};

export type SearchProfileResponse = {
  __typename?: 'SearchProfileResponse';
  user: User;
  isFollowing?: Maybe<Scalars['Boolean']>;
  isRequested?: Maybe<Scalars['Boolean']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<User>>;
  getUsersByTerm: Array<User>;
  me?: Maybe<User>;
  searchProfile: SearchProfileResponse;
  fetchPosts?: Maybe<Array<PostEntity>>;
  paginatePosts?: Maybe<PostsResponse>;
};


export type QueryGetUsersByTermArgs = {
  term: Scalars['String'];
};


export type QuerySearchProfileArgs = {
  username: Scalars['String'];
};


export type QueryPaginatePostsArgs = {
  page: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  clearUsers: Scalars['Boolean'];
  login: LoginResponse;
  sendFollowRequest?: Maybe<FollowRequest>;
  deleteRequest: Scalars['Boolean'];
  acceptRequest: Scalars['Boolean'];
  signUp: User;
  editPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  createPost?: Maybe<PostEntity>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSendFollowRequestArgs = {
  to: Scalars['String'];
};


export type MutationDeleteRequestArgs = {
  id: Scalars['Float'];
};


export type MutationAcceptRequestArgs = {
  id: Scalars['Float'];
};


export type MutationSignUpArgs = {
  userDetails: UserData;
};


export type MutationEditPostArgs = {
  details: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationCreatePostArgs = {
  imgSrc: Scalars['String'];
  details: Scalars['String'];
  creator: Scalars['String'];
};

export type UserData = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  followRequestSent: FollowRequest;
};

export type AcceptRequestMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type AcceptRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptRequest'>
);

export type CreatePostMutationVariables = Exact<{
  creator: Scalars['String'];
  details: Scalars['String'];
  imgSrc: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'PostEntity' }
    & Pick<PostEntity, 'id' | 'details' | 'imgSrc' | 'creator'>
  )> }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteRequestMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteRequestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteRequest'>
);

export type EditPostMutationVariables = Exact<{
  id: Scalars['String'];
  details: Scalars['String'];
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editPost'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { Followers?: Maybe<Array<(
        { __typename?: 'Follower' }
        & Pick<Follower, 'username' | 'id'>
      )>>, Requests: Array<(
        { __typename?: 'FollowRequest' }
        & Pick<FollowRequest, 'userId'>
      )> }
    ) }
  ) }
);

export type SendRequestMutationVariables = Exact<{
  to: Scalars['String'];
}>;


export type SendRequestMutation = (
  { __typename?: 'Mutation' }
  & { sendFollowRequest?: Maybe<(
    { __typename?: 'FollowRequest' }
    & Pick<FollowRequest, 'id' | 'userId' | 'from'>
  )> }
);

export type SignUpMutationVariables = Exact<{
  userDetails: UserData;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
    & { Followers?: Maybe<Array<(
      { __typename?: 'Follower' }
      & Pick<Follower, 'username' | 'id'>
    )>>, Requests: Array<(
      { __typename?: 'FollowRequest' }
      & Pick<FollowRequest, 'id' | 'userId' | 'from'>
    )> }
  )> }
);

export type PaginatePostsQueryVariables = Exact<{
  page: Scalars['Float'];
}>;


export type PaginatePostsQuery = (
  { __typename?: 'Query' }
  & { paginatePosts?: Maybe<(
    { __typename?: 'PostsResponse' }
    & Pick<PostsResponse, 'nextPage'>
    & { posts: Array<(
      { __typename?: 'PostEntity' }
      & Pick<PostEntity, 'id' | 'creator' | 'details' | 'imgSrc'>
    )> }
  )> }
);

export type SearchProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchProfileQuery = (
  { __typename?: 'Query' }
  & { searchProfile: (
    { __typename?: 'SearchProfileResponse' }
    & Pick<SearchProfileResponse, 'isFollowing' | 'isRequested'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { Followers?: Maybe<Array<(
        { __typename?: 'Follower' }
        & Pick<Follower, 'username' | 'id'>
      )>> }
    ) }
  ) }
);

export type UserResultsQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type UserResultsQuery = (
  { __typename?: 'Query' }
  & { getUsersByTerm: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type FollowRequestSentSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FollowRequestSentSubscription = (
  { __typename?: 'Subscription' }
  & { followRequestSent: (
    { __typename?: 'FollowRequest' }
    & Pick<FollowRequest, 'userId' | 'from'>
  ) }
);


export const AcceptRequestDocument = gql`
    mutation AcceptRequest($id: Float!) {
  acceptRequest(id: $id)
}
    `;

export function useAcceptRequestMutation() {
  return Urql.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($creator: String!, $details: String!, $imgSrc: String!) {
  createPost(creator: $creator, details: $details, imgSrc: $imgSrc) {
    id
    details
    imgSrc
    creator
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation deletePost($id: String!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const DeleteRequestDocument = gql`
    mutation deleteRequest($id: Float!) {
  deleteRequest(id: $id)
}
    `;

export function useDeleteRequestMutation() {
  return Urql.useMutation<DeleteRequestMutation, DeleteRequestMutationVariables>(DeleteRequestDocument);
};
export const EditPostDocument = gql`
    mutation EditPost($id: String!, $details: String!) {
  editPost(id: $id, details: $details)
}
    `;

export function useEditPostMutation() {
  return Urql.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      username
      id
      Followers {
        username
        id
      }
      Requests {
        userId
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SendRequestDocument = gql`
    mutation sendRequest($to: String!) {
  sendFollowRequest(to: $to) {
    id
    userId
    from
  }
}
    `;

export function useSendRequestMutation() {
  return Urql.useMutation<SendRequestMutation, SendRequestMutationVariables>(SendRequestDocument);
};
export const SignUpDocument = gql`
    mutation signUp($userDetails: UserData!) {
  signUp(userDetails: $userDetails) {
    username
    id
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    username
    id
    Followers {
      username
      id
    }
    Requests {
      id
      userId
      from
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PaginatePostsDocument = gql`
    query paginatePosts($page: Float!) {
  paginatePosts(page: $page) {
    posts {
      id
      creator
      details
      imgSrc
    }
    nextPage
  }
}
    `;

export function usePaginatePostsQuery(options: Omit<Urql.UseQueryArgs<PaginatePostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PaginatePostsQuery>({ query: PaginatePostsDocument, ...options });
};
export const SearchProfileDocument = gql`
    query SearchProfile($username: String!) {
  searchProfile(username: $username) {
    user {
      username
      id
      Followers {
        username
        id
      }
    }
    isFollowing
    isRequested
  }
}
    `;

export function useSearchProfileQuery(options: Omit<Urql.UseQueryArgs<SearchProfileQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchProfileQuery>({ query: SearchProfileDocument, ...options });
};
export const UserResultsDocument = gql`
    query userResults($term: String!) {
  getUsersByTerm(term: $term) {
    username
    id
  }
}
    `;

export function useUserResultsQuery(options: Omit<Urql.UseQueryArgs<UserResultsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserResultsQuery>({ query: UserResultsDocument, ...options });
};
export const FollowRequestSentDocument = gql`
    subscription FollowRequestSent {
  followRequestSent {
    userId
    from
  }
}
    `;

export function useFollowRequestSentSubscription<TData = FollowRequestSentSubscription>(options: Omit<Urql.UseSubscriptionArgs<FollowRequestSentSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<FollowRequestSentSubscription, TData>) {
  return Urql.useSubscription<FollowRequestSentSubscription, TData, FollowRequestSentSubscriptionVariables>({ query: FollowRequestSentDocument, ...options }, handler);
};