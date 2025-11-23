// import Admin from "../models/admin.models.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export async function generateAccessAndRefereshTokens(userId) {
//   try {
//     const user = await Admin.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     console.log(
//       "Something went wrong while generating referesh and access token",
//       error.message
//     );
//   }
// }

// export async function registerAdmin(req, res) {
//   try {
//     const { name, email, password } = req.body;

//     const exists = await Admin.findOne({ email });
//     if (exists) return res.status(400).json({ msg: "Admin already exists" });

//     const hash = await bcrypt.hash(password, 10);

//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     //const coverImageLocalPath = req.files?.coverImage[0]?.path;

//     let coverImageLocalPath;
//     if (
//       req.files &&
//       Array.isArray(req.files.coverImage) &&
//       req.files.coverImage.length > 0
//     ) {
//       coverImageLocalPath = req.files.coverImage[0].path;
//     }

//     if (!avatarLocalPath) {
//       throw new ApiError(400, "Avatar file is required");
//     }

//     const avatar = await uploadOnCloudinary(avatarLocalPath);
//     const coverImage = await uploadOnCloudinary(coverImageLocalPath);

//     if (!avatar) {
//       throw new ApiError(400, "Avatar file is required");
//     }

//     const admin = await Admin.create({
//       name,
//       email,
//       password: hash,
//       profilepic: coverImage?.url || "",
//     });

//     const createdUser = await Admin.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     if (!createdUser) {
//       console.log("Something went wrong while registering the user");
//     }

//     res.json({ msg: "Admin registered", admin });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// export async function loginAdmin(req, res) {
//   try {
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });

//     if (!admin) return res.status(400).json({ msg: "Admin not found" });

//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(400).json({ msg: "Invalid password" });

//     const token = jwt.sign({ id: admin._id }, "SECRET123", { expiresIn: "1d" });

//     const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
//       admin._id
//     );

//     const loggedInUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     // .status(200)
//     //     .cookie("accessToken", accessToken, options)
//     //     .cookie("refreshToken", refreshToken, options)
//     //     .json(
//     //       new ApiResponse(
//     //         200,
//     //         {
//     //           user: loggedInUser,
//     //           accessToken,
//     //           refreshToken,
//     //         },
//     //         "User logged In Successfully"
//     //       )
//     //     );

//     res
//       .status(200)
//       .cookie("accessToken", accessToken)
//       .cookie("refreshToken", refreshToken)
//       .json(
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "Login successful",
//         token
//       );
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// export async function dashboard(req, res) {
//   const admin = await Admin.find({});
//   return res.status(200).json({
//     success: true,
//     message: "Welcome to Admin Dashboard",
//     admin,
//   });
// }

// export async function logoutUser(req, res) {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $unset: {
//         refreshToken: 1, // this removes the field from document
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User logged Out"));
// }

// export async function refreshAccessToken(req, res) {
//   const incomingRefreshToken =
//     req.cookies.refreshToken || req.body.refreshToken;

//   if (!incomingRefreshToken) {
//     console.log("unauthorized request");
//   }

//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await Admin.findById(decodedToken?._id);

//     if (!user) {
//       console.log("Invalid refresh token");
//     }

//     if (incomingRefreshToken !== user?.refreshToken) {
//       console.log("Refresh token is expired or used");
//     }

//     const { accessToken, newRefreshToken } =
//       await generateAccessAndRefereshTokens(user._id);

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         { accessToken, refreshToken: newRefreshToken },
//         "Access token refreshed"
//       );
//   } catch (error) {
//     console.log(error?.message || "Invalid refresh token");
//   }
// }

// ==================Verify============

import Admin from "../models/admin.models.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

// ==================================================
// Generate Access + Refresh token
// ==================================================
export async function generateAccessAndRefereshTokens(adminId) {
  try {
    const admin = await Admin.findById(adminId);

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Token generation error:", error.message);
  }
}

// ==================================================
// REGISTER ADMIN
// ==================================================
export async function registerAdmin(req, res) {
  try {
    const { name, email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Admin already exists" });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({ msg: "Avatar is required" });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    const admin = await Admin.create({
      name,
      email,
      password: hash,
      profilepic: avatar?.url || "",
    });

    const createdAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );

    return res.json({ msg: "Admin registered", admin: createdAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      admin._id
    );

    const loggedInAdmin = await Admin.findById(admin._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken)
      .json({
        msg: "Login successful",
        admin: loggedInAdmin,
        accessToken,
        refreshToken,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// ==================================================
// DASHBOARD
// ==================================================
export async function dashboard(req, res) {
  const admin = await Admin.find({});
  return res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
    admin,
  });
}

export async function logoutAdmin(req, res) {
  try {
    // Remove refreshToken from DB if exists
    if (req.admin) {
      await Admin.findByIdAndUpdate(req.admin._id, {
        $unset: { refreshToken: 1 },
      });
    }

    // Clear cookies
    const options = {
      httpOnly: true,
      secure: false, // set true if using HTTPS
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({ msg: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
