import { asyncHandler } from "../utils/asyncHandler.js";
export const loginController = asyncHandler(async (req, res) => {
    res.json({
        message: "Login Controller working fine!!!"
    });
});
//# sourceMappingURL=user.controllers.js.map