export async function addAddress(req, res) {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;

    if (!fullName || !streetAddress || !city || !state || !zipCode) {
      return res.status(400).json({ error: "Missing required address fields" });
    }

    // if this is set as default, unset all other defaults
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });

    await user.save();

    res
      .status(201)
      .json({
        message: "Address added successfully",
        addresses: user.addresses,
      });
  } catch (error) {
    console.error("Error in addAddress controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



export const updateAddress = (req, res) => {
  res.status(200).json({ message: "Success" });
};

export const deleteAddress = (req, res) => {
  res.status(200).json({ message: "Success" });
};

export const addToWishlist = (req, res) => {
  res.status(200).json({ message: "Success" });
};

export const getTotalWishlist = (req, res) => {
  res.status(200).json({ message: "Success" });
};

export const removeFromWishlist = (req, res) => {
  res.status(200).json({ message: "Success" });
};
