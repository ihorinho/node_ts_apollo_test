import {Resolvers, UserData} from './resolver-types'
import validator from "validator";
import bcrypt from 'bcrypt';
import  jwt from "jsonwebtoken";
import { GraphQLError } from 'graphql';
import { IUser, User } from './model/user.js';
import {IPost, Post} from "./model/post.js";
import { books } from './model/book_demo.js'

export const resolvers: Resolvers = {
    Query: {
        books: () => books,
        getPosts: async (parent, { page }, {isAuth, userId}) => {
            if (!isAuth) {
                throw new GraphQLError('Authorization failed', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: {
                            status: 401
                        }
                    },
                });
            }
            const PER_PAGE = 2;
            const curPage = page || 1;
            const totalItems = await Post.find({creator: userId}).countDocuments() as number;
            let posts: Array<any> = await Post
                .find({creator: userId})
                .skip((curPage - 1) * PER_PAGE)
                .limit(PER_PAGE)
                .sort({createdAt: -1})
                .populate('creator', 'name email') as [];
            if (!posts) {
                posts = [];
            }

            posts = posts.map(p => {
                return {...p._doc, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString(), imageUrl: p.image};
            });
            return { posts: posts, totalItems: totalItems };
        },

        getPost: async (parent, args, {isAuth, userId}) => {
            if (!isAuth) {
                throw new GraphQLError('Authorization failed', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: {
                            status: 401
                        }
                    },
                });
            }
            const id = args.id;
            const post = await Post.findById(id).populate('creator') as IPost;
            if (!post) {
                throw new GraphQLError('Post not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            return {...post.toObject(), createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString(), imageUrl: post.image};
        },

        getUser: async (parent, args, {isAuth, userEmail}, info) => {
            if (!isAuth) {
                throw new GraphQLError('Authorization failed', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: {
                            status: 401
                        }
                    },
                });
            }
            const user = await User.findOne({email: userEmail}) as IUser;
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        message: 'Invalid e-mail address',
                    },
                });
            }

            return user;
        },
        loginUser: async (parent, loginData, context) =>{
            const email = loginData.email;
            if (!validator.isEmail(email)) {
                throw new GraphQLError('Invalid input', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        message: 'Invalid e-mail address',
                    },
                });
            }

            let user: null|IUser = await User.findOne({email: email});
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        message: 'Invalid e-mail address',
                    },
                });
            }
            //
            let match = await bcrypt.compare(loginData.password, user.password);
            if (!match) {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        message: 'Invalid e-mail or password',
                    },
                });
            }
            //
            const token = await jwt.sign({userId: user._id, userEmail: user.email}, 'mysecretkey');

            return { _id: user._id, token: token };
        }
    },

    Mutation: {
        updateStatus: async (parent, args, {isAuth, userId}) => {
            if (!isAuth) {
                throw new GraphQLError('Authorization failed', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: {
                            status: 401
                        }
                    },
                });
            }

            let user = await User.findById(userId) as IUser;
            if (!user) {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            user.status = args.status;
            user = await user.save();

            return user.toObject();
        },
        createUser: async (parent, args, context) => {
            const userInput = args.userInput as UserData;
            const email = userInput.email;
            const name = userInput.name;
            const password = userInput.password;
            const validationErrors = [];
            if (!validator.isEmail(email)) {
                validationErrors.push({field: 'email', message: 'Invalid e-mail'});
            }
            if (validator.isEmpty(name) || !validator.isLength(name, {min: 3})) {
                validationErrors.push({field: 'name', message: 'Minimum length for name should be 3 characters'});
            }
            if (validator.isEmpty(password) || !validator.isLength(password, {min: 5})) {
                validationErrors.push({field: 'password', message: 'Minimum length for password should be 5 characters'});
            }
            //
            if (validationErrors.length > 0) {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        message: 'Invalid e-mail or password',
                        errors: validationErrors
                    },
                });

            }
            //
            let existingUser = await User.findOne({email: email});
            if (existingUser) {
                throw new GraphQLError('User with this email already exists', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

            let user = new User({
                email: email,
                name: userInput.name,
                password: await bcrypt.hash(userInput.password, 12),
            });

            return await user.save() as IUser;
        },
    }
};
