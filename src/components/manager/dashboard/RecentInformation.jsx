export default function RecentInformation() {
  const recentActivities = [
    "January 5, 2024: Approved 5 leave requests",
    "January 10, 2024: Rejected 2 leave requests.",
    "January 15, 2024: Generated monthly leave report",
    "January 7, 2024: Room A booked for a team meeting (approved).",
    "January 12, 2024: Room B booking request rejected due to a scheduling conflict.",

    "January 20, 2024: Updated room booking policies.",

    "January 3, 2024: 50 lunch orders received for the week.",
    "January 8, 2024: Introduced new menu items based on employee feedback.",
    "January 18, 2024: Resolved an issue with a vendor; updated lunch delivery schedule.",
    "January 2, 2024: Added three new employees to the system.",
    "January 14, 2024: Updated roles and permissions for the HR manager.",
    "January 25, 2024: Removed an inactive employee from the system.",

    "January 9, 2024: Analyzed leave trends for Q4 2023.",
    "January 16, 2024: Reviewed room occupancy rates for the past month.",
    "January 22, 2024: Generated a report on popular lunch choices among departments.",
  ];

  return (
    <div className="p-4 space-y-2">
      <p className="text-lg">Recent activities</p>
      <div className="space-y-1">
        {recentActivities.map((activity, i) => (
          <p key={i} className="p-2 bg-gray-100">
            {activity}
          </p>
        ))}
      </div>
    </div>
  );
}
