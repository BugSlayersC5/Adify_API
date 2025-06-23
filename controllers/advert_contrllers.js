import { Advert } from "../models/advert_models.js";


export const postAdvert = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const vendorId = req.user.id; 

    const imagePaths = req.files?.map(file => file.path) || [];

    const advert = await Advert.create({
      title,
      description,
      price,
      category,
      vendor: vendorId,
      images: imagePaths,
    });

    res.status(201).json(advert);
  } catch (err) {
    res.status(500).json({ message: "Server error while posting advert" });
  }
};


export const getAllAdverts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const query = {};

    
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const adverts = await Advert.find(query).populate("vendor", "firstName lastName");

    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching adverts" });
  }
};


export const getAdvertById = async (req, res) => {
  try {
    const { id } = req.params;

    const advert = await Advert.findById(id).populate("vendor", "firstName lastName");

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ message: "Error getting advert" });
  }
};


export const updateAdvert = async (req, res) => {
  try {
    const { id } = req.params;
    const advert = await Advert.findById(id);

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    if (advert.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedData = req.body;
    advert.set(updatedData);

    await advert.save();
    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ message: "Error updating advert" });
  }
};


export const deleteAdvert = async (req, res) => {
  try {
    const { id } = req.params;
    const advert = await Advert.findById(id);

    if (!advert) {
      return res.status(404).json({ message: "Advert not found" });
    }

    if (advert.vendor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await advert.deleteOne();
    res.status(200).json({ message: "Advert deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting advert" });
  }
};

export const getMyAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find({ vendor: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Vendor adverts fetched successfully",
      count: adverts.length,
      adverts,
    });
  } catch (error) {
    console.error("Get vendor adverts error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};