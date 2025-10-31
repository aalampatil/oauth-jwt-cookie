
export const checkAuth = async (req, res) => {
    return res.status(200).json({user: req.user, success: true, message: "authenticated user"})
}