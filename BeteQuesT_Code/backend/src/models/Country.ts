import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry extends Document {
  name: string;
  capital: string;
  population: number;
  languages: string[];
  currency: string;
  regions: {
    name: string;
    description: string;
  }[];
  landmarks: {
    name: string;
    description: string;
    location: string;
  }[];
  culturalInfo: {
    greetings: string;
    customs: string;
    etiquette: string;
    religion: {
      mainReligions: string[];
      practices: string;
    };
    family: {
      dynamics: string;
      genderRoles: string;
      marriageCustoms: string;
    };
    naming: {
      conventions: string;
      addressingOthers: string;
    };
    datesOfSignificance: {
      national: string[];
      religious: string[];
    };
    communication: {
      verbalPatterns: string;
      nonVerbalCustoms: string;
    };
  };
  businessCulture: {
    norms: string;
    etiquette: string;
  };
  imageUrl: string;
}

const CountrySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  capital: { type: String, required: true },
  population: { type: Number, required: true },
  languages: [{ type: String }],
  currency: { type: String, required: true },
  regions: [{
    name: String,
    description: String
  }],
  landmarks: [{
    name: String,
    description: String,
    location: String
  }],
  culturalInfo: {
    greetings: String,
    customs: String,
    etiquette: String,
    religion: {
      mainReligions: [String],
      practices: String
    },
    family: {
      dynamics: String,
      genderRoles: String,
      marriageCustoms: String
    },
    naming: {
      conventions: String,
      addressingOthers: String
    },
    datesOfSignificance: {
      national: [String],
      religious: [String]
    },
    communication: {
      verbalPatterns: String,
      nonVerbalCustoms: String
    }
  },
  businessCulture: {
    norms: String,
    etiquette: String
  },
  imageUrl: String
});


export const Country = mongoose.model<ICountry>('Country', CountrySchema);

