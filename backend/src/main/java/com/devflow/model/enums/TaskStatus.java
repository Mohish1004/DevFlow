package com.devflow.model.enums;

public enum TaskStatus {
    NOT_STARTED("Not Started"),
    PENDING("Pending"),
    STARTED("Started"),
    IN_PROGRESS("In Progress"),
    YET_TO_COMPLETE("Yet To Complete"),
    SUBMITTED("Submitted"),
    UNDER_REVIEW("Under Review"),
    CHANGES_REQUIRED("Changes Required"),
    COMPLETED("Completed"),
    APPROVED("Approved");

    private final String displayName;

    TaskStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
