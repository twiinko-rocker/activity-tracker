import Activity from "../models/activity.model.js";

export async function createActivity(req, res) {
    try {
        const userId = req.user.id;

        const activity = await Activity.create({
            ...req.body,
            user: userId
        })

        res.status(201).json(activity);
    } catch (error) {
        res.status(500).json({ message: "Error creating activity" });
    }
}

export async function getActivities(req, res) {
    try {
        const userId = req.user.id;

        const activities = await Activity.find({ user: userId }).sort({ date: -1 }); // Sort by date descending

        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities" });
    }


}