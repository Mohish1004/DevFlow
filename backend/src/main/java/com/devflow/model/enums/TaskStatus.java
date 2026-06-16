package com.devflow.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

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

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static TaskStatus fromDisplayName(String displayName) {
        for (TaskStatus status : values()) {
            if (status.displayName.equals(displayName)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown TaskStatus: " + displayName);
    }
}
