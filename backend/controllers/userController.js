import User from "../models/User.js";

export const onBoardUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      email,
      collegeEmail,
      branch,
      year,
      chessComUsername,
      lichessUsername,
      profilePictureUrl,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isOnboardingComplete) {
      return res.status(400).json({ error: "user already onboarded" });
    }

    if (email) user.email = email;
    if (collegeEmail) user.collegeEmail = collegeEmail;
    if (profilePictureUrl) user.profilePictureUrl = profilePictureUrl;
    if (branch) user.branch = branch;
    if (year) user.year = year;
    if (lichessUsername) user.chessAccounts.lichess.username = lichessUsername;
    if (chessComUsername)
      user.chessAccounts.chessCom.username = chessComUsername;

    user.isOnboardingComplete = true;

    await user.save();

    res.status(200).json({
      message: "Onboarding completed successfully",
      user,
    });
  } catch (err) {
    console.error("Onboarding Error:", err);
    res.status(500).json({ error: "Server error during onboarding" });
  }
};
