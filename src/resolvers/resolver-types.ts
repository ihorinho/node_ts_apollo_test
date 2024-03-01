import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../app';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthData = {
  __typename?: 'AuthData';
  _id: Scalars['ID']['output'];
  token: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MagentoProduct = {
  __typename?: 'MagentoProduct';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  type_id: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateStatus: User;
};


export type MutationCreateUserArgs = {
  userInput?: InputMaybe<UserData>;
};


export type MutationUpdateStatusArgs = {
  status: Scalars['String']['input'];
};

export type Post = {
  __typename?: 'Post';
  _id?: Maybe<Scalars['ID']['output']>;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  creator: User;
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type PostData = {
  __typename?: 'PostData';
  posts: Array<Post>;
  totalItems: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  books?: Maybe<Array<Maybe<Book>>>;
  getPost?: Maybe<Post>;
  getPosts: PostData;
  getProduct: MagentoProduct;
  getUser: User;
  loginUser: AuthData;
};


export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetProductArgs = {
  sku: Scalars['String']['input'];
};


export type QueryLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  status?: Maybe<Scalars['String']['output']>;
};

export type UserData = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthData: ResolverTypeWrapper<AuthData>;
  Book: ResolverTypeWrapper<Book>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MagentoProduct: ResolverTypeWrapper<MagentoProduct>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostData: ResolverTypeWrapper<PostData>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserData: UserData;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthData: AuthData;
  Book: Book;
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MagentoProduct: MagentoProduct;
  Mutation: {};
  Post: Post;
  PostData: PostData;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserData: UserData;
}>;

export type AuthDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BookResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Book'] = ResolversParentTypes['Book']> = ResolversObject<{
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MagentoProductResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MagentoProduct'] = ResolversParentTypes['MagentoProduct']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  updateStatus?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateStatusArgs, 'status'>>;
}>;

export type PostResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PostData'] = ResolversParentTypes['PostData']> = ResolversObject<{
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  books?: Resolver<Maybe<Array<Maybe<ResolversTypes['Book']>>>, ParentType, ContextType>;
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryGetPostArgs, 'id'>>;
  getPosts?: Resolver<ResolversTypes['PostData'], ParentType, ContextType, Partial<QueryGetPostsArgs>>;
  getProduct?: Resolver<ResolversTypes['MagentoProduct'], ParentType, ContextType, RequireFields<QueryGetProductArgs, 'sku'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  loginUser?: Resolver<ResolversTypes['AuthData'], ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'email' | 'password'>>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AuthData?: AuthDataResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  MagentoProduct?: MagentoProductResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostData?: PostDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

