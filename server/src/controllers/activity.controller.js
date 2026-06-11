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

export async function deleteActivity(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const activity = await Activity.findOneAndDelete({ _id: id, user: userId });

        if (!activity) return res.status(404).json({ message: "Activity not found" });

        res.status(200).json({ message: "Activity deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting activity" });
    }
}