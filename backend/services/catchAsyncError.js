// Wrap async controller functions to catch errors automatically
const catchAsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsyncError;
