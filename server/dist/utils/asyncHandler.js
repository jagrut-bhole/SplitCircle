export const asyncHandler = (asyncRequest) => {
    return (req, res, next) => {
        Promise.resolve(asyncRequest(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=asyncHandler.js.map