import {userModel} from "../model/userInfo.js"

export const setUserAddress = async (req, res) => 
{
    try 
    {
        const user = req.user;
        const userFound = await userModel.findOne({ name: user.name });

        if (!userFound) return res.status(400).json({ success: false, message: "User not found!" });

        const { firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;
        if (!firstName || !lastName || !email || !street || !city || !state || !zipcode || !country || !phone)  return res.status(400).json({ success: false, message: "Missing Data" });

        const newAddress = { firstName, lastName, email, street, city, state, zipcode, country, phone };

        if (!userFound.addresses) 
        {
            userFound.addresses = [];
        }

        userFound.addresses.push(newAddress);
        await userFound.save();

        res.status(200).json({ success: true, message: "Address added", addresses: userFound.addresses });

    } 
    catch (error) 
    {
        console.error("Error setting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const getUserAddress = async (req, res) => 
{
    try 
    {
        const user = req.user;
        const userFound = await userModel.findOne({ name: user.name });
        if (!userFound) return res.status(400).json({ success: false, message: "User not found!" });
        const addresses = userFound.addresses;
        res.status(200).json({ success: true, addresses });
    } 
    catch (error) 
    {
        console.error("Error getting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const removeAddress = async (req, res) =>
{
    try
    {
        const user = req.user;
        const {addressId} = req.body;
        const userFound = await userModel.findOne({ name: user.name });
        if (!userFound) return res.status(400).json({ success: false, message: "User not found!" });

        userFound.addresses = userFound.addresses.filter(
            (address) => address._id.toString() !== addressId
        );
        await userFound.save();
        res.status(200).json({ success: true, message: "Address removed successfully", addresses: userFound.addresses });
    }
    catch (error) 
    {
        console.error("Error getting address:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
