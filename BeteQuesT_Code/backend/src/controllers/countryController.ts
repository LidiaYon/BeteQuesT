import { Request, Response } from 'express';
import { Country } from '../models/Country';

export const getCountries = async (req: Request, res: Response) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching countries', error });
  }
};

export const getCountry = async (req: Request, res: Response) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching country', error });
  }
};

export const createCountry = async (req: Request, res: Response) => {
  try {
    console.log('Creating country with data:', req.body);
    const country = new Country(req.body);
    await country.save();
    console.log('Country created successfully:', country);
    res.status(201).json(country);
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ message: 'Error creating country', error: (error as Error).message });
  }
};

// export const updateCountry = async (req: Request, res: Response) => {
//   try {
//     const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!country) {
//       return res.status(404).json({ message: 'Country not found' });
//     }
//     res.json(country);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating country', error });
//   }
// };



export const updateCountry = async (req: Request, res: Response) => {
  try {
    const updates: { [key: string]: any } = {};
    
    // Flatten the update object
    const flattenObject = (obj: any, prefix = '') => {
      Object.keys(obj).forEach(key => {
        const propName = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          flattenObject(obj[key], propName);
        } else {
          updates[propName] = obj[key];
        }
      });
    };

    flattenObject(req.body);

    const country = await Country.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: 'Error updating country', error: (error as Error).message });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting country', error });
  }
};


// export const searchCountries = async (req: Request, res: Response) => {
//   try {
//     const { language, minPopulation, maxPopulation } = req.query;
//     let query: any = {};

//     if (language) {
//       query.languages = { $regex: new RegExp(language as string, 'i') };
//     }

//     if (minPopulation || maxPopulation) {
//       query.population = {};
//       if (minPopulation) query.population.$gte = Number(minPopulation);
//       if (maxPopulation) query.population.$lte = Number(maxPopulation);
//     }

//     console.log('Search query:', query);
//     const countries = await Country.find(query);
//     console.log('Search results:', countries);
//     res.json(countries);
//   } catch (error) {
//     console.error('Error searching countries:', error);
//     res.status(500).json({ message: 'Error searching countries', error: (error as Error).message });
//   }
// };

export const searchCountries = async (req: Request, res: Response) => {
  try {
    console.log('Received search query:', req.query);
    const { language, minPopulation, maxPopulation } = req.query;
    let query: any = {};

    if (language) {
      query.languages = { $regex: new RegExp(String(language), 'i') };
    }

    if (minPopulation || maxPopulation) {
      query.population = {};
      if (minPopulation) query.population.$gte = Number(minPopulation);
      if (maxPopulation) query.population.$lte = Number(maxPopulation);
    }

    console.log('Constructed MongoDB query:', JSON.stringify(query));
    
    const countries = await Country.find(query).lean().exec();
    
    console.log('Search results:', JSON.stringify(countries));

    if (countries.length === 0) {
      return res.status(404).json({ message: 'No countries found matching the search criteria' });
    }

    res.json(countries);
  } catch (error) {
    console.error('Error in searchCountries:', error);
    res.status(500).json({ message: 'Error searching countries', error: (error as Error).message });
  }
};




export const getCountryByLandmark = async (req: Request, res: Response) => {
  try {
    const { landmark } = req.params;
    console.log('Searching for landmark:', landmark);
    const country = await Country.findOne({ 'landmarks.name': landmark });
    console.log('Country found:', country);
    if (!country) {
      return res.status(404).json({ message: 'Country not found for this landmark' });
    }
    res.json(country);
  } catch (error) {
    console.error('Error finding country by landmark:', error);
    res.status(500).json({ message: 'Error finding country by landmark', error: (error as Error).message });
  }
};

