// import mongoose, { Document, Schema, Model } from 'mongoose';

// interface Comment {
//   countryId: mongoose.Types.ObjectId;
//   text: string;
//   createdAt: Date;
// }

// export interface IUserProfile extends Document {
//   user: mongoose.Types.ObjectId;
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: mongoose.Types.ObjectId[];
//   wishlist: mongoose.Types.ObjectId[];
//   comments: Comment[];
// }

// const CommentSchema = new Schema({
//   countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const UserProfileSchema: Schema = new Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   fullName: { type: String, required: true },
//   bio: String,
//   interests: [String],
//   visitedCountries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
//   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
//   comments: [CommentSchema]
// });

// export const UserProfile: Model<IUserProfile> = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);


// import mongoose, { Document, Schema, Model } from 'mongoose';

// interface Comment {
//   countryId: mongoose.Types.ObjectId;
//   text: string;
//   createdAt: Date;
// }

// interface CountryReference {
//   id: mongoose.Types.ObjectId;
//   name: string;
// }

// export interface IUserProfile extends Document {
//   user: mongoose.Types.ObjectId;
//   fullName: string;
//   bio: string;
//   interests: string[];
//   visitedCountries: CountryReference[];
//   wishlist: CountryReference[];
//   comments: Comment[];
// }

// const CountryReferenceSchema = new Schema({
//   id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
//   name: { type: String, required: true }
// });

// const CommentSchema = new Schema({
//   countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const UserProfileSchema: Schema = new Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   fullName: { type: String, required: true },
//   bio: String,
//   interests: [String],
//   visitedCountries: [CountryReferenceSchema],
//   wishlist: [CountryReferenceSchema],
//   comments: [CommentSchema]
// });

// export const UserProfile: Model<IUserProfile> = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);


import mongoose, { Document, Schema, Model } from 'mongoose';

interface Comment {
  countryId: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  fullName: string;
  bio: string;
  interests: string[];
  visitedCountries: mongoose.Types.ObjectId[];
  wishlist: mongoose.Types.ObjectId[];
  comments: Comment[];
}

const CommentSchema = new Schema({
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserProfileSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  bio: String,
  interests: [String],
  visitedCountries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Country' }],
  comments: [CommentSchema]
});

export const UserProfile: Model<IUserProfile> = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);