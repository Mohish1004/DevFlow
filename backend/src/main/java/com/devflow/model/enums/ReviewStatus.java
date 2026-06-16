package com.devflow.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ReviewStatus {
    WAITING_FOR_REVIEW("Waiting for Review"),
    REVIEWING("Reviewing"),
    CHANGES_REQUIRED("Changes Required"),
    APPROVED("Approved"),
    REJECTED("Rejected"),
    MERGED("Merged");

    private final String displayName;

    ReviewStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public static ReviewStatus fromDisplayName(String displayName) {
        for (ReviewStatus status : values()) {
            if (status.displayName.equals(displayName)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown ReviewStatus: " + displayName);
    }
}
