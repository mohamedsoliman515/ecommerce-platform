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

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Error in addAddress controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getAddress = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ addresses: user.addAddress });
  } catch (error) {
    console.error("Error in getAddress controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAddress = async (req, res) => {
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
    const { addressId } = req.params;
    const user = req.user;
    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }
    // if this is set as default, unset all other defaults
    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error("Error in updateAddress controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    if (!addressId) {
      return res.status(400).json({ error: "Address ID is required" });
    }
    const user = req.user;
    await user.addresses.pull(addressId);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });

  } catch (error) {
    console.error("Error in deleteAddress controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
